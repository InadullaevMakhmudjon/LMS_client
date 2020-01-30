import { execute, API } from './Api';

export default {
    getAll: () => execute(API.get('languages')),
    get: id => execute(API.get(`languages/${id}`))
}