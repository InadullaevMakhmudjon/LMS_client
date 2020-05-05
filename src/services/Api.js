import axios from 'axios'
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
                            router.push('/pages/login')
                        }
                        if (err.response.status == 403) {

                            const type = err.response.data.errors[0]
                            alert(`${type.param} : ${type.msg}`)
                        }
                        reject((error.response));
                    }
                    reject((err));

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
        }
    })
}