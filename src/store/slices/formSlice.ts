import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type ContactForm = {
  name: string
  email: string
  message: string
}

export type DonateForm = {
  donor: string
  amount: number
  projectId?: string
}

type FormState = {
  contact: ContactForm[]
  donations: DonateForm[]
}

const initialState: FormState = {
  contact: [],
  donations: []
}

const slice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    submitContact(state, action: PayloadAction<ContactForm>) {
      state.contact.push(action.payload)
    },
    submitDonation(state, action: PayloadAction<DonateForm>) {
      state.donations.push(action.payload)
    },
    clearContact(state) { state.contact = [] },
    clearDonations(state) { state.donations = [] }
  }
})

export const { submitContact, submitDonation, clearContact, clearDonations } = slice.actions
export default slice.reducer
