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

Vue.use(Router)

const router = new Router({
    // mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior() {
        return { x: 0, y: 0 }
    },
    routes: [

        {
            // =============================================================================
            // MAIN LAYOUT ROUTES
            // =============================================================================
            path: '',
            component: () =>
                import ('./layouts/main/Main.vue'),
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
                        pageTitle: 'Home'
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
                        pageTitle: 'Books'

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
                        pageTitle: 'Book Info'

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
                        pageTitle: 'Create Book'
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
                        pageTitle: 'Update Book'
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
                        pageTitle: 'Users'

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
                        pageTitle: 'User Info'

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
                        pageTitle: 'Users'

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
                        pageTitle: 'User create'

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
                        pageTitle: 'Settings'

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
//     if (to.path === "/pages/login" || to.path === "/pages/error-404") return next();
//     router.push({ path: '/pages/login', query: { to: to.path } })
// })
export default router