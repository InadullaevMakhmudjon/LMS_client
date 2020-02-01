import axios from 'axios';

export function execute(promise) {
    return new Promise((resolve, reject)=>{
        promise.then(res => resolve(res.data))
        .catch(err => {
          alert('ISBN validation error, please try it again')
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
    baseURL: process.env.VUE_APP_BASE_URL
});