import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Role {
  id: number
  name: string
  permissions: string[]
}

const initialState: Role[] = [
  { id: 1, name: 'Admin', permissions: ['read', 'write', 'delete'] },
  { id: 2, name: 'Editor', permissions: ['read', 'write'] },
  { id: 3, name: 'Viewer', permissions: ['read'] },
]

const rolesSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    addRole: (state, action: PayloadAction<Role>) => {
      state.push(action.payload)
    },
    updateRole: (state, action: PayloadAction<Role>) => {
      const index = state.findIndex(role => role.id === action.payload.id)
      if (index !== -1) {
        state[index] = action.payload
      }
    },
    deleteRole: (state, action: PayloadAction<number>) => {
      return state.filter(role => role.id !== action.payload)
    },
  },
})

export const { addRole, updateRole, deleteRole } = rolesSlice.actions
export default rolesSlice.reducer

