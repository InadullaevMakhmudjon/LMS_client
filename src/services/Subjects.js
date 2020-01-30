import { execute, API } from './Api';

export default {
    getAll: () => execute(API.get('subjects', { attributes: ['id', 'name'] })),
    get: id => execute(API.get(`subjects/${id}`)),
    create: subject => execute(API.post('subjects', subject)),
    delete: id => execute(API.delete(`subjects/${id}`)),
}