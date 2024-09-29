import config from '../config';

// Layouts
import ContentOnly from '../layouts/ContentOnly/ContentOnly';
import Information from '../layouts/Information/Information';

// Pages
import AdminLogin from '../pages/Admin/Login/AdminLogin';
import HomeAdmin from '../pages/Admin/HomeAdmin/HomeAdmin';
import Product from '../pages/Admin/Product/Product';
import Read from '../pages/Admin/Product/Read/Read';
import Create from '../pages/Admin/Product/Create/Create';
import Update from '../pages/Admin/Product/Update/Update';
import Order from '../pages/Admin/Order/Order';
import Home from '../pages/Home/Home';
import About from '../pages/About/About';
import Shop from '../pages/Shop/Shop';
import Contact from '../pages/Contact/Contact';
import Detailproduct from '../pages/DetailProduct/Detailproduct';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Cart from '../pages/Cart/Cart';
import Search from '../pages/Search/Search';
import NotFound from '../pages/NotFound/NotFound';
import InfoUser from '../pages/InfoUser/InfoUser';

// Public routes
const publicRoutes = [
    { path: config.routes.admin, component: AdminLogin, layout: ContentOnly },
    { path: config.routes.main, component: HomeAdmin, layout: Information },
    { path: config.routes.product, component: Product, layout: Information },
    { path: config.routes.create, component: Create, layout: Information },
    { path: config.routes.update, component: Update, layout: Information },
    { path: config.routes.read, component: Read, layout: Information },
    { path: config.routes.order, component: Order, layout: Information },

    ///////
    { path: config.routes.home, component: Home },
    { path: config.routes.about, component: About },
    { path: config.routes.shop, component: Shop },
    { path: config.routes.contact, component: Contact },
    { path: config.routes.detail, component: Detailproduct },
    { path: config.routes.login, component: Login, layout: ContentOnly },
    { path: config.routes.register, component: Register, layout: ContentOnly },
    { path: config.routes.cart, component: Cart },
    { path: config.routes.search, component: Search },
    { path: config.routes.notfound, component: NotFound, layout: ContentOnly },
    { path: config.routes.infoUser, component: InfoUser },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
