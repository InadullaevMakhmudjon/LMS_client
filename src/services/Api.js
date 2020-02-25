import axios from 'axios';
import store from '../store/store'
import router from '../router'
export function execute(promise) {
    return new Promise((resolve, reject) => {
        promise.then(res => resolve(res.data))
            .catch(err => {
                if (err) {
                    if (err.response) {
                        if (err.response.status == 404) {
                            alert('Invalid user inputs, try it again')
                        }
                        if (err.response.status == 401) {
                            //store.commit('setTokenExpired', true)
                            router.push('/pages/login')
                        }
                        if (err.response.status == 403) {
                            //store.commit('setTokenExpired', true)
                            const type = err.response.data.errors[0]
                            alert(`${type.param} : ${type.msg}`)
                        }
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
    return axios.create({
        baseURL: process.env.VUE_APP_BASE_URL,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
                //Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInJvbGVJZCI6MiwicGVybWlzc2lvbnMiOlt7ImlkIjo1fSx7ImlkIjo2fSx7ImlkIjo3fSx7ImlkIjo4fSx7ImlkIjo5fSx7ImlkIjoxMH0seyJpZCI6MTF9LHsiaWQiOjEyfSx7ImlkIjoxM31dLCJpYXQiOjE1ODE3NjcwMDQsImV4cCI6MTU4MTc2ODgwNH0.624qNh25QK3u7iPYJtAeiVXYZrbKvfylqKIUJQW6Ank`
        }
    })
}