import API, { execute } from './Api';

export default {
    getAll: () => execute(API().get('languages')),
    get: id => execute(API().get(`languages/${id}`)),
    create: language => execute(API().post('languages', { language })),
    delete: id => execute(API().delete(`languages/${id}`)),
    update: (id, name) => execute(API().post(`languages/${id}`, { language: name }))
}