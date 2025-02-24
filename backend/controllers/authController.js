import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        // Check if user exists
        if (!user) {
            return res.status(401).json({ success: false, error: "User not found" });
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, error: "Wrong password" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { _id: user._id, role: user.role },
            process.env.JWT_KEY, 
            { expiresIn: "10d" }
        );

        // Send the response with the token and user details
        return res.status(200).json({
            success: true, 
            token, 
            user: { _id: user._id, name: user.name, role: user.role }
        });
        
    } catch (error) {
        console.error("Login Error:", error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
}

const verify = (req, res) => {
    if (!req.user) {
        return res.status(401).json({ success: false, error: "Unauthorized: User not found" });
    }

    return res.status(200).json({ success: true, user: req.user });
};

const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, error: "Email already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Determine role (default to "employee")
        const userRole = role === "admin" ? "admin" : "employee";

        // Create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role: userRole
        });

        // Save to database
        await newUser.save();

        // Check if JWT_KEY is configured
        if (!process.env.JWT_KEY) {
            return res.status(500).json({ success: false, error: "Missing JWT_KEY in server configuration" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { _id: newUser._id, role: newUser.role },
            process.env.JWT_KEY, 
            { expiresIn: "10d" }
        );

        return res.status(201).json({
            success: true,
            token,
            user: { _id: newUser._id, name: newUser.name, role: newUser.role }
        });

    } catch (error) {
        console.error("Register Error:", error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
};

export { login, register, verify };

