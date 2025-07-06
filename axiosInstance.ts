import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Platform } from 'react-native';

// const baseURL = 'http://localhost:8000/api/'
// const baseURL = 'http://192.168.178.101:8000/api/'
// const baseURL = process.env.EXPO_PUBLIC_API_URL;
const baseURL = Platform.OS === "web" || Platform.OS === "ios" ? "http://localhost:8000/api/" : "http://192.168.178.101:8000/api/";

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
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