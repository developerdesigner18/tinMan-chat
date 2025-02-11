import Avatar from "../../../components/Avatar";
import getChatDetails from "../utils/getChatDetails";

const ChatMessageHeader = ({ chat }) => {
  const { chatName, chatAvatar } = getChatDetails(chat);

  return (
    <div className="bg-light-secondary dark:bg-secondary px-4 py-2 flex justify-between items-center">
      <div className="flex justify-center items-center gap-2">
        <Avatar src={chatAvatar} />
        <span className="text-dark-primary dark:text-light-primary">
          {chatName}
        </span>
      </div>
    </div>
  );
};

export default ChatMessageHeader;
