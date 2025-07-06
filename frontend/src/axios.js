import axios from 'axios';


const instance = axios.create({
    baseURL:"https://modern-notes-app-zeiy.onrender.com/api",
    withCredentials:true
})

export default instance;