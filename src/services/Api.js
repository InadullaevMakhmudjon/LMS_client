import axios from 'axios';

export function execute(promise) {
    return new Promise((resolve, reject) => {
        promise.then(res => resolve(res.data))
            .catch(err => {
                if (err) {
                    if (err.response) {
                        reject(new Error(error.response.status));
                    }
                    reject(new Error(err));

                }
                reject(new Error('Check your request, and server'));
            });
    });
}

const API = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
});

export default () => {
    return API;
}