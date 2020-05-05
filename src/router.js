/*=========================================================================================
  File Name: router.js
  Description: Routes for vue-router. Lazy loading is enabled.
  Object Strucutre:
                    path => router path
                    name => router name
                    component(lazy loading) => component to load
                    meta : {
                      rule => which user can have access (ACL)
                      breadcrumb => Add breadcrumb to specific page
                      pageTitle => Display title besides breadcrumb
                    }
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import Router from 'vue-router'
import store from './store/store'
import AuthGuard from './utils/router-guard'
Vue.use(Router)

const router = new Router({
    // mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior (to, from, savedPosition) {
        console.log(savedPosition)
        let scrollTo = 0
        console.log(to)
    if (to.hash) {
      scrollTo = to.hash
    } else if (savedPosition) {
      scrollTo = savedPosition.y
    }
    },
    routes: [

        {
            // =============================================================================
            // MAIN LAYOUT ROUTES
            // =============================================================================
            path: '',
            component: () =>
                import ('./layouts/main/Main.vue'),
            // beforeEnter: AuthGuard,
            children: [
                // =============================================================================
                // Theme Routes
                // =============================================================================
                {
                    path: '/',
                    name: 'home',
                    component: () =>
                        import ('./views/Home.vue'),

                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/books' },
                            { title: 'book item', active: true },
                        ],
                        rule: 'editor',
                        pageTitle: 'Home',
                        requiresAuth: true
                    }
                },
                {
                    path: '/books',
                    name: 'books',
                    component: () =>
                        import ('./views/book/Books.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Books', url: '/books' },
                            { title: 'Books', url: '/books' },
                            { title: 'book item', active: true },
                        ],
                        parent: 'books',
                        pageTitle: 'Books',
                        requiresAuth: true

                    }
                },
                {
                    path: '/books/:id',
                    name: 'book',
                    props: true,
                    component: () =>
                        import ('./views/book/BookInfo.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/' },
                            { title: 'Books', url: '/books' },
                            { title: 'Book Info', active: true },
                        ],
                        parent: 'books',
                        pageTitle: 'Book Info',
                        requiresAuth: true

                    }
                },
                {
                    path: '/book/create-book',
                    name: 'create_book',
                    component: () =>
                        import ('./views/book/Create.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/' },
                            { title: 'All books', url: '/books' },
                            { title: 'Create New Book', active: true },
                        ],
                        parent: 'books',
                        pageTitle: 'Create Book',
                        requiresAuth: true
                    }
                },
                {
                    path: '/book/update-book/:id',
                    props: true,
                    name: 'update_book',
                    component: () =>
                        import ('./components/LMS/Books/update-book-steps/UpdateBook.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Update', url: '/' },
                            { title: 'All books', url: '/books' },
                            { title: 'Create New Book', active: true },
                        ],
                        parent: 'books',
                        pageTitle: 'Update Book',
                        requiresAuth: true
                    }
                },

                {
                    path: '/users',
                    name: 'Users',
                    component: () =>
                        import ('./views/Users.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/' },
                            { title: 'Users List', active: false },
                            { title: 'book item', active: false },
                        ],
                        pageTitle: 'Users',
                        requiresAuth: true

                    }

                },
                {
                    path: '/user-view/:id',
                    props: true,
                    name: 'Userinfo',
                    component: () =>
                        import ('./views/User/View.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/' },
                            { title: 'Users List', url: '/users' },
                            { title: 'book item', active: false },
                        ],
                        pageTitle: 'User Info',
                        parent: 'users',
                        requiresAuth: true

                    }

                },
                {
                    path: '/user-edit/:id',
                    props: true,
                    name: 'UserUpdate',
                    component: () =>
                        import ('./views/User/Update.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/' },
                            { title: 'Users List', active: false },
                            { title: 'User Edit', active: false },
                            { title: 'book item', active: false },
                        ],
                        pageTitle: 'Users',
                        parent: 'users',
                        requiresAuth: true


                    }

                },
                {
                    path: '/user-create/',
                    name: 'UserCreate',
                    component: () =>
                        import ('./views/User/Create.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/' },
                            { title: 'Users', url: '/users' },
                            { title: 'User Create', url: '/users' },
                            { title: '', active: false },

                        ],
                        pageTitle: 'User create',
                        parent: 'users',
                        requiresAuth: true


                    }

                },
                {
                    path: '/settings',
                    name: 'Settings',
                    component: () =>
                        import ('./views/Settings.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/' },
                            { title: 'book item', active: true },
                        ],
                        pageTitle: 'Settings',
                        requiresAuth: true

                    }
                },
                {
                    path: '/profile',
                    name: 'Profile',
                    component: () =>
                        import ('./components/LMS/Profile/Profile.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/books' },
                            { title: 'book item', active: true },
                        ],
                        rule: '',
                        pageTitle: 'Profile info',
                        requiresAuth: true
                    }
                },
            ],
        },
        // =============================================================================
        // FULL PAGE LAYOUTS
        // =============================================================================
        {
            path: '',
            component: () =>
                import ('@/layouts/full-page/FullPage.vue'),
            children: [
                // =============================================================================
                // PAGES
                // =============================================================================
                {
                    path: '/pages/login',
                    name: 'page-login',
                    component: () =>
                        import ('@/views/pages/Login.vue')
                },
                {
                    path: '/pages/error-404',
                    name: 'page-error-404',
                    component: () =>
                        import ('@/views/pages/Error404.vue')
                },
            ]
        },
        // Redirect to 404 page, if no match found
        {
            path: '*',
            redirect: '/pages/error-404'
        }
    ],
})

router.afterEach(() => {
    // Remove initial loading
    const appLoading = document.getElementById('loading-bg')
    if (appLoading) {
        appLoading.style.display = "none";
    }
})

// router.beforeEach((to, from, next) => {
//     if (store.getters.hasToken) next('/pages/login')
//     else {
//         next()
//     }
// })
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        //console.log(store.state.tokenExpiration)
        if (!(store.state.token.length > 0)) {
            next('/pages/login')
        } else {
            next();
        }
    } else {
        next() // make sure to always call next()!
    }
})



export default router