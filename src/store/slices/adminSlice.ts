import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Project = {
  id: string
  title: string
  description: string
  status: 'active' | 'completed' | 'paused'
}

export type Donation = {
  id: string
  donor: string
  amount: number
  date: string
  projectId?: string
}

export type Subscriber = {
  id: string
  email: string
  joinedAt: string
}

type AdminState = {
  projects: Project[]
  donations: Donation[]
  subscribers: Subscriber[]
}

const initialState: AdminState = {
  projects: [
    { id: 'p1', title: 'Clean Water', description: 'Provide wells', status: 'active' },
    { id: 'p2', title: 'School Build', description: 'Build primary school', status: 'paused' }
  ],
  donations: [
    { id: 'd1', donor: 'Alice', amount: 100, date: '2025-11-01', projectId: 'p1' },
    { id: 'd2', donor: 'Bob', amount: 50, date: '2025-11-03', projectId: 'p2' }
  ],
  subscribers: [
    { id: 's1', email: 'user1@example.com', joinedAt: '2025-10-01' },
    { id: 's2', email: 'user2@example.com', joinedAt: '2025-10-12' }
  ]
}

const slice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    addProject(state, action: PayloadAction<Project>) {
      state.projects.push(action.payload)
    },
    editProject(state, action: PayloadAction<Project>) {
      const idx = state.projects.findIndex(p => p.id === action.payload.id)
      if (idx >= 0) state.projects[idx] = action.payload
    },
    deleteProject(state, action: PayloadAction<string>) {
      state.projects = state.projects.filter(p => p.id !== action.payload)
    },
    addDonation(state, action: PayloadAction<Donation>) {
      state.donations.push(action.payload)
    },
    deleteDonation(state, action: PayloadAction<string>) {
      state.donations = state.donations.filter(d => d.id !== action.payload)
    },
    addSubscriber(state, action: PayloadAction<Subscriber>) {
      state.subscribers.push(action.payload)
    },
    deleteSubscriber(state, action: PayloadAction<string>) {
      state.subscribers = state.subscribers.filter(s => s.id !== action.payload)
    }
  }
})

export const {
  addProject,
  editProject,
  deleteProject,
  addDonation,
  deleteDonation,
  addSubscriber,
  deleteSubscriber
} = slice.actions

export default slice.reducer
