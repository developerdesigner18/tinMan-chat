import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { onGetAllUsers } from "../services";
import { setChatList } from "../../../redux/slices/chatSlice";
import toast from "react-hot-toast";

const useChats = () => {

   const [loading, setLoading] = useState(true);

   const dispatch = useDispatch();

   const fetchChats = async () => {
      setLoading(true);

      const response = await onGetAllUsers();

      if (response.success) {
         dispatch(setChatList(response.data.data.users))
      }
      else {
         toast.error(response.message);
      }

      setLoading(false);
   }

   useEffect(() => {
      fetchChats();
   }, [])

   return { loading }
};

export default useChats;
