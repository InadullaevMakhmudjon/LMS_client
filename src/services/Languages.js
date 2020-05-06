import API, { execute } from './Api';

export default {
    getAll: () => execute(API().get('languages')),
    get: id => execute(API().get(`languages/${id}`)),
    create: til => execute(API().post('languages', { name: til})),
    delete: id => execute(API().delete(`languages/${id}`)),
    update: (id, lang) => execute(API().post(`languages/${id}`, { name: lang }))
}