import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '..'

export interface AuthState {
  value: null | string
  status: 'idle' | 'loading' | 'failed'
}

const initialState: AuthState = {
  value: null,
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
export const getAuth = (state: RootState) => state.auth.value

export default authReducer.reducer
