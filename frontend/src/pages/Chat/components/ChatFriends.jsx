import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessagesLoading, setSelectedChat } from "../../../redux/slices/chatSlice";
import { SearchOutlined } from "@ant-design/icons";
import Friend from "./Friend";
import useChats from "../hooks/useChats";
import { closeChatFriendDrawer } from "../../../redux/slices/appConfigSlice";
import filterChatFriendsBasedOnSearch from "../utils/filterChatFriendsBasedOnSearch";
import Loader from "../../../components/Loader";

const ChatFriends = ({ className }) => {

   const { loading } = useChats();

   const { chatList, selectedChat } = useSelector(state => state.chatReducer);

   const dispatch = useDispatch();

   const [search, setSearch] = useState("");
   const [filteredChat, setFilteredChat] = useState(null);

   const onChatClick = (chat) => {
      dispatch(setMessagesLoading(true));
      dispatch(closeChatFriendDrawer());
      dispatch(setSelectedChat(chat));
   }

   useEffect(() => {
      let timeout;

      if (chatList && search) {
         timeout = setTimeout(() => {
            const searchedChat = filterChatFriendsBasedOnSearch(chatList, search);
            setFilteredChat(searchedChat);
         }, 800)
      }
      else {
         setFilteredChat(chatList);
      }

      return () => {
         if (timeout) {
            clearTimeout(timeout);
         }
      }
   }, [chatList, search])

   return (
      <div className={`flex flex-col w-full h-full divide-y divide-secondary-200 ${className}`}>

         <div className="px-4 py-[9px] dark:py-[10px]">
            <div className="transition-none p-2 rounded-md border border-light-secondary dark:border-0 dark:bg-dark-secondary flex justify-center items-center gap-2">
               <SearchOutlined className="leading-[0] text-xl text-light-primary" />
               <input
                  type="text"
                  className="transition-none w-full text-sm sm:text-[1rem] border-none outline-none bg-inherit text-light-primary placeholder-light-primary"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
               />
            </div>
         </div>

         <div className="flex-1 overflow-auto divide-y divide-light-secondary dark:divide-dark-primary">

            {
               loading &&
               <Loader />
            }

            {
               (!filteredChat?.length && !loading) &&
               <div className="w-full h-full grid place-items-center text-light-primary text-sm sm:text-xl">
                  No Chat
               </div>
            }

            {
               filteredChat?.map((chat) => {
                  return (
                     <Friend key={chat._id} chat={chat} selectedChat={selectedChat} onChatClick={onChatClick} />
                  )
               })
            }
         </div>
      </div>
   )
};

export default ChatFriends;
