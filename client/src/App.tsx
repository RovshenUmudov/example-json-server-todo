import React, {FC, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "./hooks/redux";
import {addToDo, fetchTodos, ItoDo, removeToDo} from "./store/dacks/toDoReducer";

const App: FC = () => {

    const dispatch = useAppDispatch()
    const {items, isLoading, error} = useAppSelector(state => state.todoReducer)

    const [newToDo, setNewToDo] = useState<ItoDo>({title: "", completed: false})

    useEffect(() => {
        dispatch(fetchTodos(10))
    }, [dispatch])

    const handleAdd = () => {
        dispatch(addToDo(newToDo))
        setNewToDo({title: "", completed: false})
    }

    const handleRemove = (id?: number) => {
        id && dispatch(removeToDo(id))
    }

    if (isLoading) {
        return <h3>Loading...</h3>
    }

    if (error) {
        return <h3>{error}</h3>
    }

    return (
        <div>
            <ul>
                {
                    items && items.map(el => (
                        <li key={el.id} className={`${el.completed ? "completed" : ""}`}>
                            {el.title}
                            <button onClick={() => handleRemove(el.id)}>Remove</button>
                        </li>
                    ))
                }
            </ul>
            <input type="text" value={newToDo.title} onChange={(e) => setNewToDo({...newToDo, title: e.target.value})}/>
            <button onClick={handleAdd}>Add ToDo</button>
        </div>
    );
};

export default App;