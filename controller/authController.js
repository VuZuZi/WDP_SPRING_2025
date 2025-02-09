const User = require('../model/User');
const brcypt = require("bcrypt");


const authController = {
    registerUser : async(req, res)=>{
        try{
            const salt = await brcypt.genSalt(10);
            const hased = await brcypt.hash(req.body.password, salt);
            
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: hased,
            })
            
            const user = await newUser.save();
            res.status(200).json(user);
            
}catch(err){
    return res.status(500).json({msg: err.message});
}
    },

    loginUser : async(req, res)=>{
        try {
            const user = await User.findOne({username: req.body.username});
            if(!user){
                 res.status(404).json("Wrong username");
            }
            const validPassword = await brcypt.compare(req.body.password, user.password);
            if(!validPassword){
                res.status(404).json("Wrong password");
            }
            if(user && validPassword){
                res.status(200).json(user);
            }
        } catch (error) {
            res.status(500).json(err);  
        }

}
}
module.exports = authController;