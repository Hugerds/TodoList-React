import React from 'react';
import './Task.css';
import { CgClose, CgInfo } from 'react-icons/cg'
import {useHistory} from 'react-router-dom';

const Task = ({task, handleTaskClick, handleRemoveTaskClick}) => {

    return ( 
    <div className='task-container'  style={task.completed? {borderLeft: '6px solid chartreuse'} : {} }>
        <div className='task-title' onClick={() => handleTaskClick(task)}>
            {task.title}
        </div>

        <div className='buttons-container'>
            <button className='remove-task-button' onClick={() => handleRemoveTaskClick(task.id)}>
                <CgClose />
            </button>
        </div>
    </div>
    );
}
 
export default Task;