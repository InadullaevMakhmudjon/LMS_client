/*=========================================================================================
  File Name: actions.js
  Description: Vuex Store - actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
import axios from 'axios'
import Profile from '../services/Profile'
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
        localStorage.setItem('access_token', payload)
        context.commit('recieveToken', payload)
        axios.defaults.headers.common['Authorization'] = payload
        console.log(axios.defaults.headers.common['Authorization'])

    },
    logout({ commit }) {
            localStorage.removeItem('access_token')
            delete axios.defaults.headers.common["Authorization"]
            commit('logout')
    },
    storeData(context, payload) {
        localStorage.setItem('profileInfo',payload)
        context.commit('setUserInfo', payload)
    }
    // getUserInfo(context, payload) {
    //     console.log('hello')
    //     Profile.getAll().then((el) => {
    //         console.log(el)
    //         context.commit('setUserData', el)
    //     }).catch(error => console.log(error))
    // }
}



export default actions