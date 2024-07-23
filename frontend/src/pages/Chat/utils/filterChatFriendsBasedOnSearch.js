const filterChatFriendsBasedOnSearch = (chatList = null, search = "") => {
   if (!search?.trim()) return chatList;
   if (!chatList?.length) return chatList;

   const searchedChat = [];

   for (let i = 0; i < chatList.length; i++) {
      const chat = chatList[i];

      if (chat?.nickname?.toLowerCase()?.includes(search.toLowerCase())) {
         searchedChat.push(chat);
      }
   }

   return searchedChat;
}

export default filterChatFriendsBasedOnSearch;