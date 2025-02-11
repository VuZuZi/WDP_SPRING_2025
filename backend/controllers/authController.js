import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email})
        if(!user) {
            res.status(404).json({success: false, error: "User Not Found"})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            res.status(404).json({success: false, error:"Wrong password"})
        }

        const token = jwt.sign({_id: user._id, role: user.role},
            process.env.JWT_KEY, {expiresIn: "10d"}
            )
        res.status(200).json({
            success: true, 
            token, 
            user: {_id: user._id, name: user.name, role : user.role}});

    } catch (error) {
        res.status(500).json({success: false, error: error.message})
    }
}

    const verify = (req, res) =>{
        return res.status(200).json({success: true, user: req.user})
    }

    const register = async (req, res) => {
        try {
            const { name, email, password, role } = req.body;
    
            // Kiểm tra nếu email đã tồn tại
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ success: false, error: "Email already exists" });
            }
    
            // Mã hóa mật khẩu
            const hashedPassword = await bcrypt.hash(password, 10);
    
            // Xác định role (mặc định là "employee")
            const userRole = role === "admin" ? "admin" : "employee";
    
            // Tạo người dùng mới
            const newUser = new User({
                name,
                email,
                password: hashedPassword,
                role: userRole
            });
    
            // Lưu vào database
            await newUser.save();
    
            // Kiểm tra biến môi trường JWT_KEY
            if (!process.env.JWT_KEY) {
                return res.status(500).json({ success: false, error: "Missing JWT_KEY in server configuration" });
            }
    
            // Tạo token
            const token = jwt.sign(
                { _id: newUser._id, role: newUser.role }, 
                process.env.JWT_KEY, 
                { expiresIn: "10d" }
            );
    
            res.status(201).json({
                success: true,
                token,
                user: { _id: newUser._id, name: newUser.name, role: newUser.role }
            });
    
        } catch (error) {
            console.error("Register Error:", error.message);
            res.status(500).json({ success: false, error: error.message });
        }
    };
export { login, register, verify };

