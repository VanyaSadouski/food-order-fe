import Admin from './pages/Admin';
import Cart from './pages/Cart';
import Kitchen from './pages/Kitchen';
import Login from './pages/Login';
import PersonalInfo from './pages/PersonalInfo';
import Registration from './pages/Registration';
import { ADMIN_ROUTE, CART, KITCHEN, LOGIN, PERSONAL_INFO, REGISTRATION } from './util/consts';

export const authRoutes = [
  {
    path: KITCHEN,
    Component: Kitchen,
    name: 'Food',
  },
  {
    path: PERSONAL_INFO,
    Component: PersonalInfo,
    name: 'Personal info',
  },
  {
    path: CART,
    Component: Cart,
    name: 'Cart',
  },
];

export const publicRoutes = [
  {
    path: KITCHEN,
    Component: Kitchen,
    name: 'Food',
  },
  {
    path: LOGIN,
    Component: Login,
    name: 'Sign in',
  },
  {
    path: REGISTRATION,
    Component: Registration,
    name: 'Sign up',
  },
];

export const adminRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: Admin,
    name: 'Food settings',
  },
];
