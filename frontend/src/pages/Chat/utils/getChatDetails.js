import getAvatarFormUsername from "../../../utils/getAvatarFormUsername";

const getChatDetails = (chat) => {

   const chatName = chat?.nickname || "";
   const chatAvatar = getAvatarFormUsername(chatName);

   return { chatName, chatAvatar };

}

export default getChatDetails;