import Vue from 'vue';
import store from '../store/store'
// console.log(store.state.userInfo.permissions)


// console.log(store.state.userInfo)
Vue.prototype.$hasPermission = (roleId) => {
    const profileInfo = store.state.userInfo
    return profileInfo.permissions.filter(el => el.has == true).map(({ id }) => id).includes(roleId)
}

// export function hello ( roleId) {
//     const profileInfo = store.state.userInfo
//     setTimeout(() => {
//         console.log(profileInfo)
//         return profileInfo.permissions.filter(el => el.has == true).map(({ id }) => id).includes(roleId)
//     }, 2000);
// }
