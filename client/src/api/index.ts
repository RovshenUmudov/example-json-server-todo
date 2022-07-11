import axios from "axios";
import {ItoDo} from "../store/dacks/toDoReducer";

const instance = () => {
    return axios.create({
        baseURL: "http://localhost:3001/"
    })
}

export const api = {
    fetchTodos: (count: number) => instance().get<ItoDo[]>(`todos?_limit=${count}`).then(res => res.data),
    addTodo: (data: ItoDo) => instance().post<ItoDo>('todos', data).then(res => res.data),
    removeTodo: (id: number) => instance().delete(`todos/${id}`).then(res => res.data)
}