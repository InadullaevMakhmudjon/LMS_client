import API, { execute } from './Api';

export default {
    getAll: () => execute(API().get('types')),
    get: id => execute(API().get(`types/${id}`)),
}