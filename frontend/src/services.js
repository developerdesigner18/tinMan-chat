import axiosClient from "./utils/axiosClient";
import { errorResponse, successResponse } from "./utils/responseWrapper";


export const onGetMyProfile = async () => {
   try {
      const get_my_profile_api_url = `/users/getMyProfile`;
      const result = await axiosClient.get(get_my_profile_api_url);
      return successResponse(result.data);
   } catch (error) {
      const errorMessage = "error occurred while fetching profile details";
      console.log(errorMessage, error);
      return errorResponse(error?.response?.data?.message || errorMessage);
   }
}