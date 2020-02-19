import API, { execute } from './Api';
export default {
    getAll: () => execute(API().get('permissions')),
}