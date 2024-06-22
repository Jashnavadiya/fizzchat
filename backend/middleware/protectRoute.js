import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoutes = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ error: "Unauthorized - No Token Provided" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized - Invalid Token" });
        }
        const user = await User.findById(decoded.userId).select("-password")
        if (!decoded) {
            return res.status(404).json({ error: "User Not Found" });
        }
        req.user = user;

        next()

    } catch (error) {
        console.log("Erroor in PRotect Route Middle Ware Controller", error.message);
        res.status(500).json({ error: "Internal server Error" })
    }
}

export default protectRoutes