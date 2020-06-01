import API, { execute } from './Api';

export default {
    getAll: ()=> execute(API().get('doorLogs?page=1&size=5'))
}