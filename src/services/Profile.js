import API, { execute, ax } from './Api';
export default {
    getOne: () => execute(API().get('profile')),
}