import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType} from "./App";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


type TodoListPropsType = {
    title: string,
    tasks: Array<TaskType>,
    filter: FilterValuesType,
    addTask: (title: string) => void,
    removeTask: (taskID: string) => void,
    changeFilter: (filter: FilterValuesType) => void,
    changeTaskStatus: (taskID: string, isDOne: boolean) => void
}


const TodoList = (props: TodoListPropsType) => {

    const [error, setError] = useState<string | null>(null)

    const [title, setTitle] = useState("")

    const tasksListItems = props.tasks.length
        ? props.tasks.map(task => {

            const removeTask = () => props.removeTask(task.id)

            const changeStatus = (e: ChangeEvent<HTMLInputElement>) =>
                props.changeTaskStatus(task.id, e.currentTarget.checked)
            return (
                <li>
                    <input
                        onChange={changeStatus}
                        type="checkbox" checked={task.isDone}
                    />
                    <span className={task.isDone ? "isDone" : ""}>{task.title}</span>
                    <button onClick={removeTask}>x</button>
                </li>
            )

        })
        : <span>Your taskList is empty</span>

    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(title.trim())
            setTitle("")
        } else {
            setError("Title is required")
        }
    }

    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === "Enter" && e.ctrlKey === true) {
            addTask()
        }
    }

    const onChangeAddTask = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const getChangeFilterHandler = (filter: FilterValuesType): () => void => {
        return () => props.changeFilter(filter)
    }


    return (
        <div className="App">
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input value={title}
                           onChange={onChangeAddTask}
                           onKeyDown={onKeyDownAddTask}
                           className={error ? "error" : ""}
                    />
                    <button onClick={addTask}>+</button>
                    {error && <div className="error-message">{error}</div>}
                </div>
                <ul>
                    <li>
                        {tasksListItems}
                    </li>

                </ul>
                <div>
                    <button
                        className={props.filter === "all" ? "active" : ""}
                        onClick={getChangeFilterHandler("all")}>All
                    </button>
                    <button
                        className={props.filter === "active" ? "active" : ""}
                        onClick={getChangeFilterHandler("active")}>Active
                    </button>
                    <button
                        className={props.filter === "completed" ? "active" : ""}
                        onClick={getChangeFilterHandler("completed")}>Completed
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TodoList;