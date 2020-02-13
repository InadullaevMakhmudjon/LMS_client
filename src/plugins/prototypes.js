import Vue from 'vue';
import permissions from '@/utils/permissions'

Vue.prototype.$hasPermission = (roleId) => {
    return permissions.map(({ id }) => id).includes(roleId);
}