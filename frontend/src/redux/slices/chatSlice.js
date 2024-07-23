import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   userId: null,
   chatList: null,
   selectedChat: null,
   messages: null,
   messagesLoading: false,

   messageText: "",
   sendMessageLoading: false,
   scrollToLastMessage: false,
}

const chatSlice = createSlice({
   name: 'chatSlice',
   initialState,
   reducers: {
      setUserId: (state, action) => {
         state.userId = action.payload;
      },
      setChatList: (state, action) => {
         state.chatList = action.payload;
      },
      setSelectedChat: (state, action) => {
         state.selectedChat = action.payload;
         state.page = 1;
         state.noMessageRemaining = false;
      },
      addNewChat: (state, action) => {
         const newChat = action.payload;

         if (!state.chatList) {
            state.chatList = [newChat];
         }
         else {
            state.chatList = [...state.chatList, newChat];
         }
      },
      setMessages: (state, action) => {
         state.messages = action.payload;
      },
      setMessagesLoading: (state, action) => {
         state.messagesLoading = action.payload;
      },
      addNewMessage: (state, action) => {
         const { message, chat } = action.payload;

         if (state.selectedChat?._id && message?.reciever && chat?.members?.length) {
            const op1 = chat.members.includes(state.selectedChat._id);
            const op2 = chat.members.includes(message.reciever);
            if (op1 && op2) {
               state.messages = [...state.messages, message];
            }
         }
      },
      addNewMessagesAtTop: (state, action) => {
         const newMessages = action.payload;

         state.messages = [...newMessages, ...state.messages];

      },
      setMessageText: (state, action) => {
         state.messageText = action.payload;
      },
      setSendMessageLoading: (state, action) => {
         state.sendMessageLoading = action.payload;
      },
      setScrollToLastMessage: (state, action) => {
         state.scrollToLastMessage = action.payload;
      },
   }
})

export default chatSlice.reducer;

export const {
   setUserId,
   setChatList,
   setSelectedChat,
   addNewChat,
   setMessages,
   setMessagesLoading,
   addNewMessage,
   addNewMessagesAtTop,
   setMessageText,
   setSendMessageLoading,
   setScrollToLastMessage,
} = chatSlice.actions;