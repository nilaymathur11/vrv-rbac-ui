"use client"
import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './slices/usersSlice'
import rolesReducer from './slices/rolesSlice'

export const store = configureStore({
  reducer: {
    users: usersReducer,
    roles: rolesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

