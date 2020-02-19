import API, { execute } from './Api';

export default {
    getAll: () => execute(API().get('users')),
    get: id => execute(API().get(`users/${id}`)),
    create1: (obj) => execute(API().post('users', obj)),
    create2: (id, per) => execute(API().post(`users/${id}`, per))


}