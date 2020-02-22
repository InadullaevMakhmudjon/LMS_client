import API, { execute } from './Api';

export default {
    getAll: () => execute(API().get('courses')),
    get: id => execute(API().get(`courses/${id}`))
}