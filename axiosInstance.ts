import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const baseURL = 'http://localhost:8000/api/'

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
  });

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token')
        if (token) {
            const parsedToken = JSON.parse(token)
            config.headers.Authorization = `Token ${parsedToken}`
        }
        return config;
    },
    (err) => Promise.reject(err)
)

export default axiosInstance;