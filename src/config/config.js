const routes = {
    home: '/',
    admin: '/admin',
    main: 'admin/main',
    create: 'admin/main/create',
    update: 'admin/main/update/:slug',
    read: 'admin/main/read/:slug',
    about: '/about',
    shop: '/shop',
    contact: '/contact',
    detail: '/detail/:slug',
    cart: '/cart',
    login: '/login',
    register: '/register',
    search: '/search/:q',
    notfound: '*',
};

export default routes;
