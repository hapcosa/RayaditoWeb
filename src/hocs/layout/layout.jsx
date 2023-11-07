import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { get_items, get_total, get_item_total, remove_item  } from "../../redux/action/cart";
import { check_authenticated, load_user, refresh } from '../../redux/action/auth';
import { useEffect } from 'react';
import NavbarHero from '../../components/navigation/navbarheroiconv1';
import Footer from '../../components/navigation/footer';
const Layout=(props) => {
    useEffect(() =>{
        props.refresh();
        props.check_authenticated();
        props.load_user();
        props.get_item_total();
    },[]);

    return(
        <>
        <div>
            <NavbarHero totalitem={props.total_items}/>
            <ToastContainer autoClose={5000}/>
            {props.children}
            <Footer/>
        </div>
        </>
    )
}
const mapStatetoprops = state => ({
    total_items: state.Cart.total_items,
})

export default connect(null,{
    check_authenticated,
    load_user,
    refresh,
    get_item_total,
    get_items,
    get_total,
}) (Layout);
