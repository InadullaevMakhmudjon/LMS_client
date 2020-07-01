import API, { execute } from './Api';
export default {
    getOne: () => execute(API().get('profile')),
    resetPassword: (data) => execute(API().post('auth/resetPassword', data)),
    updatePassword: (token, pwd) => execute (API().post(`auth/resetPassword/${token}`,pwd))
}