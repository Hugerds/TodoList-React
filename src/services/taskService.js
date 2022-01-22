import axios from "axios";

class TaskService {
    username = process.env.REACT_APP_USERNAME;
    password = process.env.REACT_APP_PASSWORD;
    async fetchTasks() {
        console.log(process.env);
        const dataLogin = await axios.post(`${process.env.REACT_APP_URLAPI}/user/login`, {
            login:this.username,
            password:this.password
        }); 
        console.log(dataLogin.data.token);
        const data = await axios.get(`${process.env.REACT_APP_URLAPI}/task`,
        {headers: {'Access-Control-Allow-Origin': "true", Authorization: `Bearer ${dataLogin.data.token}`}});
        if(data.data == null || data.data.isEmpty) return null;
        const retorno = data.data;
        return retorno;
    }
    
    async deleteTask(taskId) {
        const dataLogin = await axios.post(`${process.env.REACT_APP_URLAPI}/user/login`, {
            login:this.username,
            password:this.password
        }); 
        console.log(dataLogin.data.token);
        const data = await axios.delete(`http://localhost:3001/task/${taskId}`,
        {headers: {'Access-Control-Allow-Origin': "true", Authorization: `Bearer ${dataLogin.data.token}`}},);
        if(data.data == null || data.data.isEmpty) return null;
        const retorno = data.data;
        return retorno;
    }

    async createTask(taskTitle) {
        const dataLogin = await axios.post(`${process.env.REACT_APP_URLAPI}/user/login`, {
            login:this.username,
            password:this.password
        }); 
        const data = await axios.post(`${process.env.REACT_APP_URLAPI}/task`, {
            title: taskTitle,
            completed: false,
            userId: dataLogin.data.id
        },
        {headers: {'Access-Control-Allow-Origin': "true", Authorization: `Bearer ${dataLogin.data.token}`}},);
        if(data.data == null || data.data.isEmpty) return null;
        const retorno = data.data;
        return retorno;
    }

    async completeTask(task) {
        const dataLogin = await axios.post(`${process.env.REACT_APP_URLAPI}/user/login`, {
            login:this.username,
            password:this.password
        });
        const data = await axios.put(`${process.env.REACT_APP_URLAPI}/task`, 
        {
            id: task.id,
            title: task.title,
            completed: task.completed
        },
        {headers: {'Access-Control-Allow-Origin': "true", Authorization: `Bearer ${dataLogin.data.token}`}},);
        if(data.data == null || data.data.isEmpty) return null;
        const retorno = data.data;
        return retorno;
    }
}

export default TaskService;