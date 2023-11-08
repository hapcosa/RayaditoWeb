import Layout from "../../hocs/layout/layout";
import  { connect } from "react-redux";
import { get_items, get_total, get_item_total, remove_item  } from "../../redux/action/cart";
import { useEffect } from "react";
import { useState } from "react";
import CartItem from "../../components/cart/CartItem"
import {setAlert} from "../../redux/action/alert"
import { Link } from "react-router-dom";
import { get_user_profiles} from "../../redux/action/profile"
const Cart = ({
    get_items,
    get_item_total,
    get_total,
    items,
    remove_item,
    total,
    total_items,
    profiles,
    get_user_profiles,
}
)=>{
    const [render, setRender] = useState(false);
    useEffect(() =>{
        get_item_total();
        get_items();
        get_total();
        get_user_profiles();
    },[render]);

    const showItems = () => {
        return(
            <div>
                {
                    items && 
                    items !== null && 
                    items !== undefined && 
                    items.length !== 0 && 
                    items.map((item, index)=>{
                        let sold = item.product.sold;
                        return (
                            <>
                            <div >
                                <CartItem 
                                    item={item}
                                    sold={sold}
                                    render={render}
                                    remove_item={remove_item}
                                    setRender={setRender}
                                    setAlert={setAlert}
                                />
                            </div>
                            </>
                        );
                    })
                }
            </div>
        )
    }
    const checkoutButton = () => {
        if (total_items < 1) {
            return(
                <>
                <Link
                to='/'
                
            >
                <button
                className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
            >
                Buscar Joyas
                </button>
            </Link>
            </>
            )
        }else {
            return(
                <>
                <Link
                to='/checkout'>
                 <button
                className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
            >
                Checkout
                </button>
            </Link>
                </>
            )
           
        }
    }

    return(
        <Layout>
        <div className="bg-white">
        <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Tu carrito</h1>
            <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
            <section aria-labelledby="cart-heading" className="lg:col-span-7">
                <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
                </h2>

                <ul role="list" className="border-t border-b border-gray-200 divide-y divide-gray-200">
                { showItems()}
                </ul>
            </section>

            {/* Order summary */}
            <section
                aria-labelledby="summary-heading"
                className="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5"
            >
                <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
                Orden
                </h2>

                <dl className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                    <dt className="text-sm text-gray-600">Subtotal</dt>
                    <dd className="text-sm font-medium text-gray-900">${total && total}</dd>
                </div>
                <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                    <dt className="flex text-sm text-gray-600">
                    <span>Impuestos</span>
                    <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                    </a>
                    </dt>
                    <dd className="text-sm font-medium text-gray-900">Iva incluido</dd>
                </div>
                <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                    <dt className="text-base font-medium text-gray-900">total</dt>
                    <dd className="text-base font-medium text-gray-900">${total && total}</dd>
                </div>
                </dl>

                <div className="mt-6">
                    {checkoutButton()}
                </div>
            </section>
            </div>
        </div>
        </div>
        </Layout>
    ) 
}
const mapStatetoprops = state => ({
    items: state.Cart.items,
    total: state.Cart.amount,
    total_items: state.Cart.total_items,
    compare: state.Cart.compare_amount,
    profiles: state.Profile.profile,


})
export  default connect(mapStatetoprops,{get_user_profiles, get_items, get_item_total,get_total, remove_item }) (Cart)