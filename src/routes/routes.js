import config from '../config';

// Layouts
import ContentOnly from '../layouts/ContentOnly/ContentOnly';
import HeaderSibar from '../layouts/HeaderSibar/HeaderSibar';

// Pages
import AdminLogin from '../pages/Admin/Login/AdminLogin';
import HomeAdmin from '../pages/Admin/HomeAdmin/HomeAdmin';
import Create from '../pages/Admin/Create/Create';
import Update from '../pages/Admin/Update/Update';
import Read from '../pages/Admin/Read/Read';
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

// Public routes
const publicRoutes = [
    { path: config.routes.admin, component: AdminLogin, layout: ContentOnly },
    { path: config.routes.main, component: HomeAdmin, layout: HeaderSibar },
    { path: config.routes.create, component: Create, layout: HeaderSibar },
    { path: config.routes.update, component: Update, layout: HeaderSibar },
    { path: config.routes.read, component: Read, layout: HeaderSibar },
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
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
