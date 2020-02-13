/*=========================================================================================
  File Name: getters.js
  Description: Vuex Store - getters
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


const getters = {
    isLogIn(state) {
        return state.token !== null && state.token !== undefined
    },
    arrtoken(state) {
        return state.token
    },
    // COMPONENT
    // vx-autosuggest
    // starredPages: state => state.navbarSearchAndPinList.data.filter((page) => page.highlightAction),
}

export default getters