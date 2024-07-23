import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/apiError.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { User } from "./user.model.js";
import { io } from "../../main.js";

const generateAccessToken = async (userId) => {
   try {

      const user = await User.findById(userId);
      const accessToken = user.generateAccessToken();

      return { accessToken };

   } catch (error) {
      throw new ApiError(500, "Something went wrong while generating access and refresh token")
   }
}

const loginUser = asyncHandler(async (req, res) => {

   const { nickname } = req.body;

   if (!nickname || !nickname?.trim()) {
      throw new ApiError(400, "Nickname is required");
   }

   let user = await User.findOne({ nickname: nickname?.toLowerCase() })

   if (!user) {
      user = await User.create({ nickname });
      io.emit("new-user", { user });
   }

   const { accessToken } = await generateAccessToken(user._id);

   const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: 'None',
      secure: true
   }

   return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .json(
         new ApiResponse(200, { user, accessToken }, "User logged in successfully")
      )
})

const getLoggedInUserDetail = asyncHandler(async (req, res) => {
   return res
      .status(200)
      .json(
         new ApiResponse(200, { user: req.user }, "User Details fetched successfully")
      )
})

const getAllUsers = asyncHandler(async (req, res) => {
   const userId = req.user._id;
   const users = await User.find({ _id: { $ne: userId } });
   return res
      .status(200)
      .json(
         new ApiResponse(200, { users }, "Users fetched successfully")
      );
});


export {
   loginUser,
   getLoggedInUserDetail,
   getAllUsers,
}