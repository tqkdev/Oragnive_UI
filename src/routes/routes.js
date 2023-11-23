import config from '../config';

// Layouts
// import OnlyContent from '../layouts/OnlyContent/OnlyContent';

// Pages
// import Admin from '../pages/Admin/Admin';
// import Create from '../pages/CRUD/Create/Create';
// import Main from '../pages/CRUD/CRUD';
// import Update from '../pages/CRUD/Update/Update';
// import Read from '../pages/CRUD/Read/Read';
import Home from '../pages/Home/Home';
// import About from '../pages/About/About';
// import Shop from '../pages/Shop/Shop';
// import Contact from '../pages/Contact/Contact';
// import Detailproduct from '../pages/DetailProduct/Detailproduct';
// import Login from '../pages/Login/Login';
// import Register from '../pages/Register/Register';
// import Cart from '../pages/Cart/Cart';
// import Checkout from '../pages/Checkout/Checkout';
// import Search from '../pages/Search/Search';

// Public routes
const publicRoutes = [
    // { path: config.routes.admin, component: Admin, layout: OnlyContent },
    // { path: config.routes.main, component: Main, layout: OnlyContent },
    // { path: config.routes.create, component: Create, layout: OnlyContent },
    // { path: config.routes.update, component: Update, layout: OnlyContent },
    // { path: config.routes.read, component: Read, layout: OnlyContent },
    { path: config.routes.home, component: Home },
    // { path: config.routes.about, component: About },
    // { path: config.routes.shop, component: Shop },
    // { path: config.routes.contact, component: Contact },
    // { path: config.routes.detail, component: Detailproduct },
    // { path: config.routes.login, component: Login, layout: OnlyContent },
    // { path: config.routes.register, component: Register, layout: OnlyContent },
    // { path: config.routes.cart, component: Cart },
    // { path: config.routes.checkout, component: Checkout },
    // { path: config.routes.search, component: Search },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
