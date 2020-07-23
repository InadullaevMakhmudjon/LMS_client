import API, { execute } from './Api';

export default {
    getAll: () => execute(API().get('courses?books=true')),
    get: id => execute(API().get(`courses/${id}`))
}