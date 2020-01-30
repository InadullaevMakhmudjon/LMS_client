import { execute, API } from './Api';

export default {
    getAll: () => execute(API.get('courses')),
    get: id => execute(API.get(`courses/${id}`))
}