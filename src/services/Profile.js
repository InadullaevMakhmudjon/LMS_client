import API, { execute } from './Api';
export default {
    getOne: () => execute(API().get('profile')),

}