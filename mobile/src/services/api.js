import axios from 'axios';


const api = axios.create({
    /**
     * Via Expo
     */
    // baseURL: 'http://192.168.1.101:3333'

    /**
     * Via React Native
     */
    baseURL: 'http://10.0.2.2:3333'
});

export default api;