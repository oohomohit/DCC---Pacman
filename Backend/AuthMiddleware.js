import { ApiError } from "./utils/ApiError.js";
import { asyncHandler } from "./utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "./user.model.js";

export const verifyJWT = asyncHandler(async(req, res, next) => {
    try {
        const token = req.cookies?.accessToken || 
                     req.header("Authorization")?.replace("Bearer ", "") ||
                     req.body.token;
        
        if (!token) {
            throw new ApiError(401, "Unauthorized request. No token provided.");
        }
    
        const decodedToken = jwt.verify(
            token, 
            process.env.ACCESS_TOKEN_SECRET || "dhnncncdhde9ied3udnnsllsjdkjdnc"
        );
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
    
        if (!user) {
            throw new ApiError(401, "Invalid Access Token. User not found.");
        }
    
        req.user = user;
        next();
    } catch (error) {
        if (error.name === "JsonWebTokenError") {
            throw new ApiError(401, "Invalid token format");
        } else if (error.name === "TokenExpiredError") {
            throw new ApiError(401, "Token has expired");
        } else {
            throw new ApiError(401, error?.message || "Invalid access token");
        }
    }
});

// Middleware to check if user is authenticated but continue even if not
export const optionalAuth = asyncHandler(async(req, res, next) => {
    try {
        const token = req.cookies?.accessToken || 
                     req.header("Authorization")?.replace("Bearer ", "") ||
                     req.body.token;
        
        if (!token) {
            return next(); // Continue without authentication
        }
    
        const decodedToken = jwt.verify(
            token, 
            process.env.ACCESS_TOKEN_SECRET || "dhnncncdhde9ied3udnnsllsjdkjdnc"
        );
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
    
        if (user) {
            req.user = user; // Attach user if found
        }
        
        next();
    } catch (error) {
        // Continue without authentication if token validation fails
        next();
    }
});