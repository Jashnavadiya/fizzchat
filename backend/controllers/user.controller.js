import User from "../models/user.model.js";

export const getUsersForSidebar=async(req,res)=>{
    try {
        
        const LoggedInUserId= req.user._id;

        const filteredUsers=await User.find({_id:{$ne:LoggedInUserId}}).select("-password")

        res.status(200).json(filteredUsers)

    } catch (error) {
        console.log("Erroor in GET USER FRO SIDEBAR Controller", error.message);
    res.status(500).json({ error: "Internal server Error" })
    }
}