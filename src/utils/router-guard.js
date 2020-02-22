import store from '../store/store'

export default (to, from, next) => {
    console.log(store.state.token)
    if (store.state.hasToken) {
        next()
    } else {
        next('/pages/login')
    }
}