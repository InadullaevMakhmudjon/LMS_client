import Vue from 'vue';
import permissions from '@/utils/permissions'
import store from '../store/store'
// console.log(store.state.userInfo)
Vue.prototype.$hasPermission = (roleId) => {

    return permissions.map(({ id }) => id).includes(roleId);
}