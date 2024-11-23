import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface User {
  id: number
  name: string
  email: string
  role: string
  status: 'Active' | 'Inactive'
}

const initialState: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer', status: 'Inactive' },
]

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.push(action.payload)
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.findIndex(user => user.id === action.payload.id)
      if (index !== -1) {
        state[index] = action.payload
      }
    },
    deleteUser: (state, action: PayloadAction<number>) => {
      return state.filter(user => user.id !== action.payload)
    },
  },
})

export const { addUser, updateUser, deleteUser } = usersSlice.actions
export default usersSlice.reducer

