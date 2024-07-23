import { useEffect, useRef } from "react";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import { setScrollToLastMessage } from "../../../redux/slices/chatSlice";

const MessagesWrapper = ({ messages, userId }) => {

   const { scrollToLastMessage } = useSelector(state => state.chatReducer);

   const dispatch = useDispatch();

   const containerRef = useRef(null);
   const messageEndRef = useRef(null);

   useEffect(() => {
      if (scrollToLastMessage) {
         messageEndRef.current?.scrollIntoView({
            behavior: "smooth",
         })

         dispatch(setScrollToLastMessage(false))
      }
   }, [scrollToLastMessage])

   return (
      <div className="flex-1 overflow-auto py-4 px-2 bg-primary" id="container" ref={containerRef}>

         {
            (!messages || !messages?.length) &&
            <div className="w-full h-full grid place-items-center text-light-primary text-sm sm:text-xl">
               No messages
            </div>
         }

         {
            messages && messages?.length > 0 &&
            messages?.map((message, i) => {
               return (
                  <Message key={i} message={message} userId={userId} />
               )
            })
         }

         <div ref={messageEndRef}></div>

      </div>
   )
};

export default MessagesWrapper;
