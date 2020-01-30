import { execute, API } from './Api';

export default {
    getAll: () => execute(API.get('categories', { attributes: ['id', 'name'] })),
    get: id => execute(API.get(`categories/${id}`))
}