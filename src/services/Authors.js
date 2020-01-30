import { execute, API } from './Api';

export default {
    getAll: () => execute(API.get('authors')),
    get: id => execute(API.get(`authors/${id}`))
}