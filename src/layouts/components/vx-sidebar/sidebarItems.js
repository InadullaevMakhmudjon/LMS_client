// /*=========================================================================================
//   File Name: sidebarItems.js
//   Description: Sidebar Items list. Add / Remove menu items from here.
//   Strucutre:
//           url     => router path
//           name    => name to display in sidebar
//           slug    => router path name
//           icon    => Feather Icon component/icon name
//           tag     => text to display on badge
//           tagColor  => class to apply on badge element
//           i18n    => Internationalization
//           submenu   => submenu of current item (current item will become dropdown )
//                 NOTE: Submenu don't have any icon(you can add icon if u want to display)
//           isDisabled  => disable sidebar item/group
//   ----------------------------------------------------------------------------------------
//   Item Name: Vuesax Admin - VueJS Dashboard Admin Template
//   Author: Pixinvent
//   Author URL: http://www.themeforest.net/user/pixinvent
// ==========================================================================================*/
import Vue from 'vue'

const routing = [{
        url: "/",
        name: "Home",
        slug: "home",
        icon: "HomeIcon",
        access: true

    },
    {
        url: "/books",
        name: "Books",
        slug: "books",
        icon: "BookIcon",
        access: true,
    },
    {
        url: "/users",
        name: "Users",
        slug: "users",
        icon: "UsersIcon",
        access: Vue.prototype.$hasPermission(3)
    },
    {
        url: "/settings",
        name: "Settings",
        slug: "settings",
        icon: "SettingsIcon",
        access: Vue.prototype.$hasPermission(10)
    },
]

export default routing.filter(el => el.access == true)

/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  Strucutre:
          url     => router path
          name    => name to display in sidebar
          slug    => router path name
          icon    => Feather Icon component/icon name
          tag     => text to display on badge
          tagColor  => class to apply on badge element
          i18n    => Internationalization
          submenu   => submenu of current item (current item will become dropdown )
                NOTE: Submenu don't have any icon(you can add icon if u want to display)
          isDisabled  => disable sidebar item/group
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
// export default store => {
//     const routing = [{
//             url: "/",
//             name: "Home",
//             slug: "home",
//             icon: "HomeIcon",
//             access: true

//         },
//         {
//             url: "/books",
//             name: "Books",
//             slug: "books",
//             icon: "BookIcon",
//             access: true,
//         },
//         {
//             url: "/users",
//             name: "Users",
//             slug: "users",
//             icon: "UsersIcon",
//             access: checkPermission(3)
//         },
//         {
//             url: "/settings",
//             name: "Settings",
//             slug: "settings",
//             icon: "SettingsIcon",
//             access: checkPermission(10)
//         },
//     ]

// return routing.filter(el => el.access === true)
// }