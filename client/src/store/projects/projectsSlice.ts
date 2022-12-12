import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '..'

export interface ProjectsState {
  projects: {
    id: string
    name: string
    createdAt: string
    updatedAt: string
  }[]
  status: 'idle' | 'loading' | 'failed'
}

const initialState: ProjectsState = {
  projects: [],
  status: 'idle',
}

export const projectsReducer = createSlice({
  name: 'projects',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setProjects: (state, action) => {
      state.projects = action.payload
    },
  },
})

export const { setProjects } = projectsReducer.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const getProjects = (state: RootState) => state.projects.projects

export default projectsReducer.reducer
