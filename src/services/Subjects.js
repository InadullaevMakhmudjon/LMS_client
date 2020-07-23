import API, { execute } from './Api';

export default {
    getAll: () => execute(API().get('subjects?books=true')),
    get: id => execute(API().get(`subjects/${id}`)),
    create: subject => execute(API().post('subjects', { subject })),
    delete: id => execute(API().delete(`subjects/${id}`)),
    update: (id, name) => execute(API().post(`subjects/${id}`, { subject: name }))
}