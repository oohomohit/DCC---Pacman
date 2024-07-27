import { asyncHandler } from "./utils/asyncHandler.js";
import { ApiError } from "./utils/ApiError.js"
import { User } from "./user.model.js"
import { ApiResponse } from "./utils/ApiResponse.js";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";




// get user details from frontend
// validation - not empty
// check if user already exists: username, email
// check for images, check for avatar
// upload them to cloudinary, avatar
// create user object - create entry in db
// remove password and refresh token field from response
// check for user creation
// return res

export const registerUser = asyncHandler(async (req, res) => {
    const { } = req.body
    //console.log("email: ", email);

    if (
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }
    //console.log(req.files);

    const avatarLocalPath = req.files?.avatar[0]?.path;
    //const coverImageLocalPath = req.files?.coverImage[0]?.path;

    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }


    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }


    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
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
    // req body -> data
    // userName or enroll
    //find the user
    //password check
    //access and referesh token
    //send cookie

    const { userName, phone, enroll } = req.body
    console.log("userData at login ", userName, phone, enroll);

    if (phone && !enroll) {
        throw new ApiError(400, "phone or enroll is required")
    }

    // Here is an alternative of above code based on logic discussed in video:
    // if (!(userName || enroll)) {
    //     throw new ApiError(400, "userName or enroll is required")

    // }

    let user = await User.findOne({
        $or: [ { enroll }, { phone }]
    })

    if (!user) {
        const newUser = await User.create({
            userName,
            phone,
            enroll
        })

        console.log("User created: ", newUser);
        const createdUser = await User.findById(newUser._id).exec();


        // const createdUser = await User.findById(user._id).select(
        //     "-refreshToken"
        // )

        if (!createdUser) {
            throw new ApiError(500, "Something went wrong while registering the user")
        }
        user = newUser;

        // return res.status(201).json(
        //     new ApiResponse(200, createdUser, "User registered Successfully")
        // )

        console.log("User found: ", user);

        const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id)

        // const loggedInUser = await User.findById(user._id).select("-refreshToken")

        const options = {
            httpOnly: true,
            secure: true,
            Withcredentials: true
        }

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    {
                        user: user, accessToken, refreshToken
                    },
                    "User logged In Successfully"
                )
            )


    }
    else {
        throw new ApiError(500, "You have already Played this game .");
    }



})

export const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        { _id: req.body.id},

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
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged Out"))
})

export const generateAccessAndRefereshTokens = async (userId) => {
    try {
        // console.log("userId: ", userId);
        const user = await User.findById(userId);
        // console.log("yha ka user ",user);

        // userSchema.methods.generateAccessToken = function () {
        const accessToken = jwt.sign(
            {
                _id: user._id,
                userName: user.userName,
                phone: user.phone,
                enroll: user.enroll

            },

            // process.env.ACCESS_TOKEN_SECRET,
            "dhnncncdhde9ied3udnnsllsjdkjdnc",
            {
                expiresIn: "1d"
            }
        )


        // const accessToken =await user.generateAccessToken();
        // console.log("yha bhi aa gya");
        // const refreshToken = await user.generateRefreshToken();
        const refreshToken = jwt.sign(
            {
                _id: user._id,

            },
            "dksdjdj333442234nfhf850ewndsnodsnd",
            {
                expiresIn:'1d'
            }
        )



        // console.log("yha bhi aa gya 2 ");
        user.refreshToken = refreshToken;
        // console.log("refresh : ", refreshToken);
        await user.save({ validateBeforeSave: false })
        // console.log("yha bhi aa gya 3");
        return { accessToken, refreshToken }


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

export const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
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
            secure: true
        }

        const { accessToken, newRefreshToken } = await generateAccessAndRefereshTokens(user._id)

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
    const token = req.body.token;
    // console.log("req 000 : ", req);

    try {
        // Verify the token
        console.log("token at backend ",token);
        const decodedToken = jwt.verify(token, "dhnncncdhde9ied3udnnsllsjdkjdnc");
        console.log("decodedToken: ", decodedToken);
        res.status(200).json({ user: decodedToken });

    } catch (error) {
        throw new ApiError(500, 'Token invalid or expired')
        // res.status(401).json({  });

    }
});


export const updateData=asyncHandler(async(req,res)=>{
    console.log("data from frontend ", req.body);
    const difficulty=req.body.difficulty;
    let type="easy";
    if(difficulty===7)type="medium";
    if(difficulty===9)type="hard";
    
    const points=req.body.points;
    const id=(req.body.id);
    console.log("type",type);
    // console.log("data from fronted to update  ",difficulty,points,id);
    const user=await User.findOneAndUpdate(
        {_id:id},
        {
            $set:{
                [type]:points,
            }
        },
        {
            new:true
        }
    )
    if(!user){
        throw new ApiError(500,"Something went wrong while updating the user data")
    }
    return res.status(200).json(new ApiResponse(200,user,"User data updated successfully"))
});

export const leaderboard=asyncHandler(async(req,res)=>{
    const users=await User.find().exec();
    if(!users){
        throw new ApiError(500,"Something went wrong while fetching the leaderboard")
    }
    console.log("users at leaderboard ", users);
    let easyScore=[],mediumScore=[],hardScore=[];
    users.forEach((user)=>{
        easyScore.push({points:user.easy,username:user.userName,phone:user.phone,enroll:user.enroll});
        mediumScore.push({points:user.medium,username:user.userName,phone:user.phone,enroll:user.enroll});
        hardScore.push({points:user.hard,username:user.userName,phone:user.phone,enroll:user.enroll});
    });
    // easyScore.sort((a,b)=>a.points<=b.points);
    // mediumScore.sort((a,b)=>a.points<=b.points);
    // hardScore.sort((a,b)=>a.points<=b.points);
    return res.status(200).json(new ApiResponse(200,{easyScore,mediumScore,hardScore},"Leaderboard fetched successfully"))
});

