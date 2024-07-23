import axiosClient from "../../utils/axiosClient";
import { errorResponse, successResponse } from "../../utils/responseWrapper";


export const onGetAllUsers = async () => {
   try {
      const get_all_users_api_url = `/users`;
      const result = await axiosClient.get(get_all_users_api_url);
      return successResponse(result.data);
   } catch (error) {
      const errorMessage = "error occurred while fetching all users"
      console.log(errorMessage, error);
      return errorResponse(error?.response?.data?.message || errorMessage);
   }
}

export const onGetMessages = async (chatId) => {
   try {
      const get_messages_api_url = `/messages/${chatId}`;
      const result = await axiosClient.get(get_messages_api_url);
      return successResponse(result.data);
   } catch (error) {
      const errorMessage = "error occurred while fetching messages"
      console.log(errorMessage, error);
      return errorResponse(error?.response?.data?.message || errorMessage);
   }
}

export const onSendMessage = async (chatId, body) => {
   try {
      const send_message_api_url = `/messages/${chatId}`;
      const result = await axiosClient.post(send_message_api_url, body);
      return successResponse(result.data);
   } catch (error) {
      const errorMessage = "error occurred while sending message"
      console.log(errorMessage, error);
      return errorResponse(error?.response?.data?.message || errorMessage);
   }
}