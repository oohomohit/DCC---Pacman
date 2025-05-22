import { asyncHandler } from "./utils/asyncHandler.js";
import { ApiError } from "./utils/ApiError.js"
import { User } from "./user.model.js"
import { ApiResponse } from "./utils/ApiResponse.js";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";

export const registerUser = asyncHandler(async (req, res) => {
    const { userName, email, password, enroll, phone } = req.body
    
    if (
        [userName, email, password, enroll, phone].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUserByEmail = await User.findOne({ email })
    if (existedUserByEmail) {
        throw new ApiError(409, "User with this email already exists")
    }

    const existedUserByEnroll = await User.findOne({ enroll })
    if (existedUserByEnroll) {
        throw new ApiError(409, "User with this enrollment number already exists")
    }

    const user = await User.create({
        userName,
        email,
        password,
        enroll,
        phone,
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )
})

export const loginUser = asyncHandler(async (req, res) => {
    // req body: {email, password}
    const { email, password } = req.body

    if (!email || !password) {
        throw new ApiError(400, "Email and password are required")
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid credentials")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'None'
    }
    
    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser, 
                    accessToken, 
                    refreshToken
                },
                "User logged in successfully"
            )
        )
})

export const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'None'
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out"))
})

export const generateAccessAndRefereshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        
        if (!user) {
            throw new ApiError(404, "User not found")
        }

        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false })
        
        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating tokens")
    }
}

export const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies?.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET || "dksdjdj333442234nfhf850ewndsnodsnd"
        )

        const user = await User.findById(decodedToken?._id)

        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")
        }

        const options = {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        }

        const { accessToken, refreshToken: newRefreshToken } = await generateAccessAndRefereshTokens(user._id)

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    { accessToken, refreshToken: newRefreshToken },
                    "Access token refreshed"
                )
            )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }
})

export const getCurrentUser = asyncHandler(async (req, res) => {
    // Extract token from request headers, query params, or cookies
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "") || req.body.token;

    if (!token) {
        throw new ApiError(401, "No token provided")
    }

    try {
        // Verify the token
        const decodedToken = jwt.verify(
            token, 
            process.env.ACCESS_TOKEN_SECRET || "dhnncncdhde9ied3udnnsllsjdkjdnc"
        );
        
        // Fetch user (excluding password and refresh token)
        const user = await User.findById(decodedToken._id).select("-password -refreshToken");
        
        if (!user) {
            throw new ApiError(404, "User not found")
        }

        res.status(200).json(
            new ApiResponse(200, { user }, "User details fetched successfully")
        );
    } catch (error) {
        throw new ApiError(401, 'Token invalid or expired')
    }
});

export const updateData = asyncHandler(async(req, res) => {
    const { userId, difficulty, points } = req.body;
    
    if (!userId || !difficulty || points === undefined) {
        throw new ApiError(400, "User ID, difficulty, and points are required")
    }
    
    let field = "easy";
    if (difficulty === 7) field = "medium";
    if (difficulty === 9) field = "hard";
    
    try {
        const updateQuery = {};
        updateQuery[field] = points;
        
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updateQuery },
            { new: true }
        ).select("-password -refreshToken");
        
        if (!updatedUser) {
            throw new ApiError(404, "User not found")
        }
        
        return res.status(200).json(
            new ApiResponse(200, updatedUser, `${field} score updated successfully`)
        );
    } catch (error) {
        throw new ApiError(500, error?.message || "Error updating score")
    }
});

export const leaderboard = asyncHandler(async (req, res) => {
    try {
        const easyUsers = await User.find({ easy: { $ne: null } })
            .sort({ easy: -1 })
            .limit(10)
            .select("userName easy enroll phone");
            
        const mediumUsers = await User.find({ medium: { $ne: null } })
            .sort({ medium: -1 })
            .limit(10)
            .select("userName medium enroll phone");
            
        const hardUsers = await User.find({ hard: { $ne: null } })
            .sort({ hard: -1 })
            .limit(10)
            .select("userName hard enroll phone");
            
        const leaderboardData = {
            easyScore: easyUsers.map(user => ({
                username: user.userName,
                points: user.easy,
                enroll: user.enroll,
                phone: user.phone
            })),
            mediumScore: mediumUsers.map(user => ({
                username: user.userName,
                points: user.medium,
                enroll: user.enroll,
                phone: user.phone
            })),
            hardScore: hardUsers.map(user => ({
                username: user.userName,
                points: user.hard,
                enroll: user.enroll,
                phone: user.phone
            }))
        };
        
        return res.status(200).json(
            new ApiResponse(200, leaderboardData, "Leaderboard fetched successfully")
        );
    } catch (error) {
        throw new ApiError(500, error?.message || "Error fetching leaderboard")
    }
});

