import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  { content: 'reducer defines how redux store works', important: true, id: 1 },
  { content: 'state of store can contain any data', important: false, id: 2 },
]

let nextId = 3

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    createNote(state, action) {
      state.push({ content: action.payload, important: false, id: nextId++ })
    },
    toggleImportanceOf(state, action) {
      const id = action.payload
      const note = state.find(n => n.id === id)
      note.important = !note.important
    }
  }
})

export const { createNote, toggleImportanceOf } = noteSlice.actions
export default noteSlice.reducer
