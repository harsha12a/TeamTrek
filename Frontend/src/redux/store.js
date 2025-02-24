import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./userSlice.js"
import groupReducer from "./groupSlice.js"
import taskReducer from "./taskSlice.js"

const store = configureStore({
  reducer: {
    user: userReducer,
    groups: groupReducer,
    tasks: taskReducer
  },
})

export default store
