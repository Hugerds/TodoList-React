import React from "react";
import Task from "./Task";

const Tasks = ({tasks, handleTaskClick, handleRemoveTaskClick}) => {
    return (
        <>
        {tasks.map(task => <Task key={task.id} task={task} handleTaskClick={handleTaskClick} handleRemoveTaskClick={handleRemoveTaskClick}/>)}
        </>
    )
}

export default Tasks;