import { combineReducers } from 'redux';
import Auth from './auth';
import Alert from './alert';
import Categories from './categories';
import Joyas from './joyas';
import Piedras from './piedras';
import Products from './products';
import Cart from './cart';
import Coupons from './coupons';
import Orders from './orders';
import Payment from './payment';
import Shipping from './shipping';
import Profile from './profile';
export default combineReducers({
    Auth,
    Alert,
    Categories,
    Joyas,
    Piedras,
    Products,
    Cart,
    Coupons,
    Orders,
    Payment,
    Shipping,
    Profile,
});