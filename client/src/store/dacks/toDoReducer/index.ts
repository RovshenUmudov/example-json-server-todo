import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {api} from "../../../api";

export type ItoDo = {
    id?: number,
    title: string,
    completed: false
}

type InitialState = {
    items: ItoDo[],
    isLoading: boolean,
    error: string | undefined
}

const initialState: InitialState = {
    items: [],
    isLoading: false,
    error: ''
}

export const todoReducer = createSlice({
    name: 'todo',
    initialState,
    reducers: {},
    extraReducers: builder => {

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //Get items
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        builder.addCase(fetchTodos.pending, state => {
            state.isLoading = true
        })
        builder.addCase(fetchTodos.fulfilled, (state, action: PayloadAction<ItoDo[]>) => {
            state.isLoading = false
            state.error = ""
            state.items = action.payload
        })
        builder.addCase(fetchTodos.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message
        })

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //Add item
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        builder.addCase(addToDo.pending, state => {
            state.isLoading = true
        })
        builder.addCase(addToDo.fulfilled, (state, action: PayloadAction<ItoDo>) => {
            state.isLoading = false
            state.items = state.items.concat(action.payload)
            state.error = ""
        })
        builder.addCase(addToDo.rejected, (state, {error}) => {
            state.isLoading = false
            state.error = error.message
        })

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //Remove item
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        builder.addCase(removeToDo.pending, state => {
            state.isLoading = true
        })
        builder.addCase(removeToDo.fulfilled, state => {
            state.isLoading = false
            state.error = ""
        })
        builder.addCase(removeToDo.rejected, (state, {error}) => {
            state.isLoading = false
            state.error = error.message
        })
    }
})

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async (count: number) => {
        return await api.fetchTodos(count)
    }
)

export const addToDo = createAsyncThunk(
    'todos/addToDo',
    async (data: ItoDo) => {
        return await api.addTodo(data)
    }
)

export const removeToDo = createAsyncThunk(
    'todos/removeTodo',
    async (id: number, {dispatch}) => {
        await api.removeTodo(id)
        dispatch(fetchTodos(10))
    }
)

export default todoReducer.reducer