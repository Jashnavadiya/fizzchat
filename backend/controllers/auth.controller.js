import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from "../utils/generatetoken.js";


export const signup = async (req, res) => {
    console.log(req.body);
    try {
        const { fullname, username, password, confirmPassword, gender } = req.body;
        console.log(req.body);
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords Are Not Matching" })
        }

        const user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({ error: "Username Already Exists" });

        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const boyProfilePicture = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePicture = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullname,
            username,
            password: hashedPassword,
            gender,
            profilepic: gender === "male" ? boyProfilePicture : girlProfilePicture
        })
        if (newUser) {

            generateTokenAndSetCookie(newUser._id,res)
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                username: newUser.username,
                profilepic: newUser.profilepic
            })
        } else {
            res.status(400).json({ error: 'Invaild user Data' });
        }

    } catch (error) {
        console.log("Erroor in Signup Controller", error.message);
        res.status(500).json({ error: "Internal server Error" })
    }
}
export const login = async (req, res) => {
   try {
    const {username,password}=req.body;

    const user = await User.findOne({username});
    const isPasswordCorrect = await bcrypt.compare(password, user?.password||"");

    if(!user){
        return res.status(400).json({error:"Username Is Not Correct"})
    }
    
    else if(!isPasswordCorrect){
        return res.status(400).json({error:"PassWord Is Not Correct"})
    }
    
    generateTokenAndSetCookie(user._id,res)
    res.status(200).json({
        _id:user._id,
        fullname:user.fullname,
        usename:user.username,
        profilepic:user.profilepic
    })

   } catch (error) {
    console.log("Erroor in Login Controller", error.message);
    res.status(500).json({ error: "Internal server Error" })
   }
}
export const logout = (req, res) => {
   try {
    res.cookie("jwt","",{maxAge:0})
    res.status(200).json({message:"Logout Successfully"})
   } catch (error) {
    console.log("Erroor in LOGOUT Controller", error.message);
    res.status(500).json({ error: "Internal server Error" })
   }
}