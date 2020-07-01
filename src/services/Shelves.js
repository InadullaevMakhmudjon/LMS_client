import API, { execute } from './Api';

export default {
    getAll: () => execute(API().get('shelves')),
    create: subject => execute(API().post('shelves', { shelf: subject })),
    delete: id => execute(API().delete(`shelves/${id}`)),
    update: (id, name) => execute(API().post(`shelves/${id}`, { shelf: name }))
}