import React, { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header';
import AddTask from './components/AddTask';
import Tasks from './components/Tasks';
import {v4 as uuidv4} from 'uuid';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Axios from 'axios';
import TaskService from './services/taskService';

const App = () => {
  const taskService = new TaskService();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const dadoRetorno = await taskService.fetchTasks();

      setTasks(dadoRetorno);
    }

    fetchTasks();
  }, []);

  const handleTaskAddition = async (taskTitle) => {
    const dadoRetorno = await taskService.createTask(taskTitle);
    if(dadoRetorno != null) {

      const newTask = [...tasks, {
        title: taskTitle,
        id: dadoRetorno.id,
        completed: dadoRetorno.completed,
      },
    ];
      setTasks(newTask);
    }
  }

  const handleTaskClick = async (_task) => {
    console.log(_task);
    const dadoRetorno = await taskService.completeTask(_task);
    if(dadoRetorno) {
      const newTasks = tasks.map(task => {
          if(task.id === _task.id) return {...task, completed: !task.completed};
          return task;
      });

      setTasks(newTasks);
    }
  }

  const handleRemoveTaskClick = async (taskId) => {
    const dadoRetorno = await taskService.deleteTask(taskId);
    if(dadoRetorno) {
      const newTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(newTasks);
    }
}

  return (
    <Router>
      <div className='container'>
        <Header/>
        <Route 
          path="/" 
          exact 
          render={() => (
              <>
                <AddTask handleTaskAddition={handleTaskAddition}/>
                <Tasks tasks={tasks} handleTaskClick={handleTaskClick} handleRemoveTaskClick={handleRemoveTaskClick}/>
              </>
            )}
          />
      </div>
    </Router>
  );
}

export default App; 