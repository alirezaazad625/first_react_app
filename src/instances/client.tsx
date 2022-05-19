import axios from "axios";

const baseURL = 'http://192.168.138.1:8080';

const client = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
})


export default client


