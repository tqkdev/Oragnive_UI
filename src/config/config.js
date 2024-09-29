const routes = {
    home: '/',
    admin: '/admin',
    main: 'admin/main',
    product: 'admin/product',
    create: 'admin/product/create',
    update: 'admin/product/update/:slug',
    read: 'admin/product/read/:slug',
    order: 'admin/order',

    //////
    about: '/about',
    shop: '/shop',
    contact: '/contact',
    detail: '/detail/:slug',
    cart: '/cart',
    login: '/login',
    register: '/register',
    search: '/search/:q',
    notfound: '*',

    infoUser: '/infouser',
};

export default routes;
