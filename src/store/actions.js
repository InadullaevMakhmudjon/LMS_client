/*=========================================================================================
  File Name: actions.js
  Description: Vuex Store - actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
import axios from 'axios'
const actions = {

    // ////////////////////////////////////////////
    // SIDEBAR & UI UX
    // ////////////////////////////////////////////

    updateSidebarWidth({ commit }, width) {
        commit('UPDATE_SIDEBAR_WIDTH', width);
    },
    toggleContentOverlay({ commit }) {
        commit('TOGGLE_CONTENT_OVERLAY');
    },
    updateTheme({ commit }, val) {
        commit('UPDATE_THEME', val);
    },
    updateWindowWidth({ commit }, width) {
        commit('UPDATE_WINDOW_WIDTH', width);
    },


    // ////////////////////////////////////////////
    // COMPONENT
    // ////////////////////////////////////////////

    // VxAutoSuggest
    updateStarredPage({ commit }, payload) {
        commit('UPDATE_STARRED_PAGE', payload)
    },

    //  The Navbar
    arrangeStarredPagesLimited({ commit }, list) {
        commit('ARRANGE_STARRED_PAGES_LIMITED', list)
    },
    arrangeStarredPagesMore({ commit }, list) {
        commit('ARRANGE_STARRED_PAGES_MORE', list)
    },



    recieveToken(context, payload) {
        return new Promise((resolve, reject) => {
            axios.post(`${process.env.VUE_APP_BASE_URL}auth/login`, {
                username: payload.username,
                password: payload.password

            }).then(res => {
                const token = res.data.token
                localStorage.setItem('access_token', token)
                axios.defaults.headers.common['Authorization'] = token
                context.commit('recieveToken', token)

                resolve(context)
            }).catch(error => {
                console.log(error)
                alert('Access denied, Please try it again')
                localStorage.removeItem('access_token')
                reject(error)
            })
        })
    },
    logout({ commit }) {
        return new Promise((resolve, reject) => {
            commit('logout')
            localStorage.removeItem('access_token')
            delete axios.defaults.headers.common['Authorization']
            resolve()
        })
    }

}

export default actions