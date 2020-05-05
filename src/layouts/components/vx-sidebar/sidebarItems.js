/* eslint-disable */
// eslint-disable-next-line
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
        access: true
    },
    {
        url: "/users",
        name: "Users",
        slug: "users",
        icon: "UsersIcon",
        access: false
    },
    {
        url: "/settings",
        name: "Settings",
        slug: "settings",
        icon: "SettingsIcon",
        access: true
    },
]

export default routing.filter(el => el.access == true)

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