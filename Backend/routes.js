import { Router } from "express";
import {
    loginUser,
    registerUser,
    refreshAccessToken,
    getCurrentUser,
    updateData,
    leaderboard,
} from "./login.controller.js";
import { logoutUser } from "./logout.controllers.js";
import { verifyJWT, optionalAuth } from "./AuthMiddleware.js";

const router = Router();

// Public routes
router.route("/").get((req, res) => {
    res.send("Backend is working");
});

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/leaderboard").get(optionalAuth, leaderboard);

// Protected routes (require authentication)
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/me").post(verifyJWT, getCurrentUser);
router.route("/update").post(verifyJWT, updateData);

// Protected route to check authentication status
router.route("/check-auth").get(verifyJWT, (req, res) => {
    res.status(200).json({
        success: true,
        message: "User is authenticated",
        user: {
            _id: req.user._id,
            userName: req.user.userName,
            email: req.user.email,
            enroll: req.user.enroll,
            phone: req.user.phone,
            scores: {
                easy: req.user.easy,
                medium: req.user.medium,
                hard: req.user.hard
            }
        }
    });
});

export default router;