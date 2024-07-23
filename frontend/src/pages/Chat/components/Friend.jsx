import Avatar from "../../../components/Avatar";
import getChatDetails from "../utils/getChatDetails";

const Friend = ({ chat, selectedChat, onChatClick = () => { } }) => {

   const { chatName, chatAvatar } = getChatDetails(chat)

   return (
      <div
         className={`w-full p-2 grid grid-cols-12 gap-2 bg-secondary hover:bg-secondary-200 cursor-pointer ${chat?._id == selectedChat?._id && "bg-secondary-300"}`}
         onClick={() => onChatClick(chat)}
      >
         <div className="col-span-2 m-auto">
            <Avatar src={chatAvatar} />
         </div>
         <div className="col-span-8 flex flex-col justify-center">
            <p className="text-light-primary capitalize">{chatName}</p>
         </div>
      </div>
   )
};

export default Friend;
