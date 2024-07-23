import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   myProfile: null,
   showChatFriendDrawer: false,
}

const appConfigSlice = createSlice({
   name: 'appConfigSlice',
   initialState,
   reducers: {
      setMyProfile: (state, action) => {
         state.myProfile = action.payload;
      },
      openChatFriendDrawer: (state) => {
         state.showChatFriendDrawer = true;
      },
      closeChatFriendDrawer: (state) => {
         state.showChatFriendDrawer = false;
      },
   }
})

export default appConfigSlice.reducer;

export const {
   setMyProfile,
   openChatFriendDrawer,
   closeChatFriendDrawer,
} = appConfigSlice.actions;