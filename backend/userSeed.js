import bcrypt from 'bcrypt';
import connectToDatabase from "./db/db.js";
import User from './models/User.js';
const userRegister = async () =>{
    await connectToDatabase();
    try {
        const hashPawssord = await bcrypt.hash("admin",10);
        const newUser = new User ({
            name:"admin",
            email:"admin@gmail.com",
            password: hashPawssord,
            role: "admin",
        })
        await newUser.save()
    } catch (error) {
        console.log(error)
    }
}

userRegister();