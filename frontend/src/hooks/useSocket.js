import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { connectSocket, socket } from "../utils/socketManager";
import { ACCESS_TOKEN, USER_DATA, getLocalStorageItem, removeLocalStorageItem } from "../utils/localStroageManager";
import { addNewChat, addNewMessage } from "../redux/slices/chatSlice";

const useSocket = () => {

   const dispatch = useDispatch();

   const navigate = useNavigate();

   const socketConnector = async (token) => {
      await connectSocket(token);
   }

   useEffect(() => {

      const token = getLocalStorageItem(ACCESS_TOKEN);

      if (!token) return;

      socketConnector(token);

      const handleSocketErrors = (e) => {
         console.log('socket error', e);
         toast.error('Socket connection failed, try again later.');
      }

      socket?.on('connect_error', (err) => handleSocketErrors(err));
      socket?.on('connect_failed', (err) => handleSocketErrors(err));

      socket?.on("unauthorized", () => {
         removeLocalStorageItem(ACCESS_TOKEN, USER_DATA);
         navigate("/login");
      })

      socket?.on("new-user", ({ user }) => {
         dispatch(addNewChat(user));
      })

      socket?.on("new-message", ({ message, chat }) => {
         dispatch(addNewMessage({ message, chat }));
      })

      return () => {
         socket?.off("unauthorized");
         socket?.off("new-user");
         socket?.off("new-message");
         socket?.disconnect();
      }
   }, [])
};

export default useSocket;
