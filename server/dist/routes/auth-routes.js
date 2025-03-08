import { Router } from "express";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        // Check if the user exists in the database
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        // Compare provided password with hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const secretKey = process.env.JWT_SECRET_KEY || 'secret secret'; // Ensure this is set in your .env file
        // Generate a JWT token
        const token = jwt.sign({ username }, secretKey, { expiresIn: "1h" } // Token expires in 1 hour
        );
        // Send token to client
        return res.json({ token });
    }
    catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
const router = Router();
// POST /login - Authenticate user and return JWT
router.post("/login", login);
export default router;
