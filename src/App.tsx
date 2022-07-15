import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
// CRUD => CRUD
//GUT & GLI

export type FilterValuesType = "all" | "active" | "completed"

function App() {
    //BLL:
    const title: string = "What to learn"
    const [tasks, setTasks] = useState<Array<TaskType>>([  //[newState, setter(fn)]
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS/ES6", isDone: false},
    ])
    const [filter, setFilter] = useState<FilterValuesType>("all")

    const removeTask = (taskID: string): void => {
        setTasks(tasks.filter((task: TaskType) => task.id !== taskID))
    }

    const addTask = (title: string) => {
        const id = v1()
        const isDone = false
        setTasks([{id, title, isDone}, ...tasks])
    }

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    const changeTaskStatus = (taskID: string, isDone: boolean) => { //3, false
        setTasks(tasks.map(t => t.id === taskID ? {...t, isDone: isDone} : t))
    }

    let tasksForRender;
    switch (filter) {
        case "completed":
            tasksForRender = tasks.filter(t => t.isDone === true)
            break
        case "active":
            tasksForRender = tasks.filter(t => t.isDone === false)
            break
        default:
            tasksForRender = tasks
    }


    //UI:
    return (
        <div className="App">
            <TodoList title={title}
                      filter={filter}
                      tasks={tasksForRender}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      changeTaskStatus={changeTaskStatus}
                      addTask={addTask}
            />
        </div>
    );
}

export default App;
