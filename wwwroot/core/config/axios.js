import axios from "axios";
import { localStorage } from '../helper';
import {
    REFRESH_TOKEN_URL
} from '../services/apiURL.service';


let isRefreshing = false;
let subscribers = [];

function onRefreshed({ authorisationToken }) {
    subscribers.map(cb => cb(authorisationToken));
}

function subscribeTokenRefresh(cb) {
    subscribers.push(cb);
}

const getAxiosInstance = () => {
    const defaultOptions = {
        baseURL: process.env.NEXT_PUBLIC_API_URL
    };

    let axiosApiInstance = axios.create(defaultOptions);

    // Request interceptor for API calls
    axiosApiInstance.interceptors.request.use(
        async (config) => {
            const token = localStorage.getAuthToken();
            config.headers.Authorization = token ? `Bearer ${token}` : '';
            return config
        },
        (error) => {
            Promise.reject(error)
        });

    // Response interceptor for API calls
    axiosApiInstance.interceptors.response.use((response) => {
        return response
    }, async function (error) {
        const {
            config,
            response: { status }
        } = error;
        const originalRequest = config;

        if (status === 400 && error.response.data.meta.code === 1005 && !originalRequest._retry) {
            if (!isRefreshing) {
                isRefreshing = true;
                const refreshToken = localStorage.getAuthRefreshToken();
                getAxiosInstance().post(REFRESH_TOKEN_URL, { refreshToken })
                    .then((resp) => {

                        const { data: userData } = resp.data;
                        isRefreshing = false;
                        onRefreshed({ authorisationToken: userData.token });
                        subscribers = [];
                        localStorage.setAuthToken(userData.token)
                        return resp.data;
                    })
                    .catch(err => {
                        return err
                    });
            }
            return new Promise(resolve => {
                subscribeTokenRefresh(token => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    resolve(axios(originalRequest));
                });
            });
        }
        return Promise.reject(error);
    });

    axiosApiInstance.interceptors.request.use(function (config) {
        const token = localStorage.getAuthToken();
        config.headers.Authorization = token ? `Bearer ${token}` : '';
        return config
    });
    return axiosApiInstance
};

export default getAxiosInstance();