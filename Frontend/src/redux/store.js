import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./userSlice.js"
import groupReducer from "./groupSlice.js"

const store = configureStore({
  reducer: {
    user: userReducer,
    groups: groupReducer
  },
})

export default store
