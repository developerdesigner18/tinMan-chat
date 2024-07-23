import { configureStore } from '@reduxjs/toolkit'
import appConfigReducer from './slices/appConfigSlice'
import chatReducer from './slices/chatSlice'

export default configureStore({
   reducer: {
      appConfigReducer,
      chatReducer,
   }
})