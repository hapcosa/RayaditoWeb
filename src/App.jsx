
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Error404 from "./containers/errors/error404";
import Home from "./containers/home";
import Piedras from './containers/piedras';
import Register from './containers/auth/register';
import Joyas from './containers/joyas';
import About from './containers/pages/about';
import JoyasDetail from './containers/pages/joyasDetail';
import PiedrasDetail from './containers/pages/piedrasDetail';
import Login from './containers/auth/login';
import Activate from './containers/auth/Activate';
import ResetPassword from './containers/auth/ResetPassword';
import ResetPasswordConfirm from './containers/auth/ResetPasswordConfirm';
import Search from "./containers/pages/search";
import Cart from "./containers/pages/cart";
import Checkout from "./containers/pages/checkout";
import Dashboard from "./containers/pages/Dashboard";
import DashboardPayments from "./containers/pages/DashboardPayments";
import DashboardNewAdress from "./containers/pages/SaveAddress";
import DashboardProfile from "./containers/pages/DashboardProfile";
import OrderDetail from "./containers/pages/OrderDetail";
import Success from "./containers/pages/successpayment";
import JoyasTestDetail from "./containers/pages/joyasdetail2";
function App() {

  return (
    <> 
     <Provider store={store}>
        <Router>
          <Routes>
            <Route path="*" element={<Error404 />}/>
            {/*compras*/ }
            <Route exact path="/cart" element={<Cart />}/>
            <Route exact path="/checkout" element={<Checkout />}/>
            <Route exact path="/success" element={<Success />}/>
            {/*joyas*/ }

            <Route exact path="/joyas" element={<Joyas />}/>
            <Route exact path="/joyas/:productId" element={<JoyasTestDetail/>}/>
             {/*piedras*/ }
            <Route exact path="/piedras" element={<Piedras />}/>
            <Route exact path="/piedras/:productId" element={<PiedrasDetail/>}/>
            {/*core*/ }
            <Route exact path="/" element={<Home />}/>
            <Route exact path="/about" element={<About />}/>
            <Route exact path="/Search" element={<Search />}/>
             {/*login and register*/ }
             <Route exact path="/register" element={<Register />}/>
            <Route exact path="/login" element={<Login />}/>
            <Route exact path="/activate/:uid/:token" element={<Activate/>}/>
            <Route exact path="/reset_password" element={<ResetPassword/>}/>
            <Route exact path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm/>}/>
            {/*perfil*/ }
            <Route exact path='/dashboard' element={<Dashboard/>}/>
            <Route exact path='/dashboard/payments' element={<DashboardPayments/>}/>
            <Route exact path='/dashboard/payment/:transaction_id' element={<OrderDetail/>}/>
            <Route exact path='/dashboard/profile' element={<DashboardProfile/>}/>
            <Route exact path="/dashboard/profile/newadress" element={<DashboardNewAdress/>}/>
          </Routes>
        </Router>
    </Provider>
    </>
  )
}

export default App
