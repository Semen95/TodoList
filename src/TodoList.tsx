import React from 'react';

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
}

const TodoList = (props: TodoListPropsType) => {
    return (
        <div className="App">
            <div>
        //TodoListHeader
            //Title
                <h3>{props.title}</h3>
                // Input form
                <div>
                    // Input
                    <input/>
                    // Button
                    <button>+</button>
                </div>
            // TasksList
                <ul>
                    //Task
                    <li>
                        <input type="checkbox" checked={props.tasks[0].isDone}/>
                        <span>{props.tasks[0].title}</span>
                    </li>
                    <li>
                        <input type="checkbox" checked={props.tasks[1].isDone}/>
                        <span>{props.tasks[1].title}</span>
                    </li>
                    <li><
                        input type="checkbox" checked={props.tasks[2].isDone}/>
                        <span>{props.tasks[2].title}</span>
                    </li>
                </ul>
                // ButtonsBlock
                <div>
                    // Button
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>
            </div>
        </div>
    );
};

export default TodoList;