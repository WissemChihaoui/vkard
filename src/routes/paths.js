export const paths = {
    root: '/',
    user: '/user',
    productDetails: '/product',
    panier: {
        root: '/panier',
        checkout: '/checkout'
    },
    auth: {
        root: '/auth'
    },
    profile: {
        root: '/my-account',
        orders: '/my-account/orders',
        editAccount: '/my-account/edit-account',
        cards: '/my-account/cards'
    },

    admin: {
        root: "/admin",
        orders: {
            root: "/admin/orders",
            view: (id) => `/admin/orders/${id}`
        },
        clients: {
            root: "/admin/clients",
            view: (id) => `/admin/clients/${id}`
        },
        cards: "/admin/cards",
        auth: "/admin/auth",
    }
}