import axios from 'axios';

export function execute(promise) {
    return new Promise((resolve, reject)=>{
        promise.then(res => resolve(res.data))
        .catch(err => {
          if(err){
            if (err.response) {
              reject(new Error(error.response.status));   
            }
            reject(new Error(err));
          }
            reject(new Error('Check your request, and server'));
        });
    });
}

export const API = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASE_URL : 'http://localhost:3030/api/'
});