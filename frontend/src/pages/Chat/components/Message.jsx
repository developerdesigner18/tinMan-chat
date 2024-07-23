import { useMemo } from "react";
import Avatar from "../../../components/Avatar";
import getUserAvatar from "../../../utils/getUserAvatar";
import getTime from "../../../utils/getTime";

const Message = ({ message, userId }) => {

   const { text, sender, createdAt } = message;

   const myMessage = useMemo(() => {
      return sender?._id == userId
   }, [message, userId])

   return (
      <div className={`relative flex ${myMessage && "flex-row-reverse"} items-start gap-2.5`}>
         <Avatar className="!w-[30px]" src={getUserAvatar(sender)} />
         <div className={`mt-3 flex flex-col gap-2 w-fit max-w-[220px] sm:max-w-[320px] leading-1.5 py-2 px-4 border-gray-200 ${myMessage ? "rounded-s-xl rounded-ee-xl" : "rounded-e-xl rounded-es-xl"} bg-message`}>

            <span className="text-sm font-normal text-white whitespace-pre-wrap break-all">
               {text}
            </span>

            <span className="text-sm font-normal text-gray-400">
               {getTime(createdAt)}
            </span>
         </div>
      </div>
   )
};

export default Message;
