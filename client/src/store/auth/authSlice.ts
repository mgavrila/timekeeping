import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '..'
import { UserRoles } from '../../constants/enums'

export interface AuthState {
  value: {
    createdAt: string | null
    email: string | null
    id: string | null
    name: string | null
    role: UserRoles
    updatedAt: string | null
  }
  status: 'idle' | 'loading' | 'failed'
}

const initialState: AuthState = {
  value: {
    createdAt: null,
    email: null,
    id: null,
    name: null,
    role: UserRoles.MEMBER,
    updatedAt: null,
  },
  status: 'idle',
}

export const authReducer = createSlice({
  name: 'auth',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { setUser } = authReducer.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const getUser = (state: RootState) => state.auth.value

export default authReducer.reducer
