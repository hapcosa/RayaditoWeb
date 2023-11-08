import Layout from '../../hocs/layout/layout';
import { connect } from 'react-redux'
import {list_orders, get_order_detail} from '../../redux/action/orders'
import {
    get_items,
    get_total,
    get_item_total
} from "../../redux/action/cart";
import { useEffect } from 'react';
import { Navigate } from 'react-router';
import {  useState } from 'react'

import { Link } from 'react-router-dom';

import SidebarProfile from '../../components/navigation/sidebarProfile';
import OrderCard from '../../components/orders/orderCard';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const DashboardPayments =({
    list_orders,
    get_items,
    get_total,
    get_item_total,
    orders,
    isAuthenticated,
    get_order_detail,
})=>{



    useEffect(() => {
        get_items()
        get_total()
        get_item_total()
        list_orders()
    }, [])

    if(!isAuthenticated)
        return <Navigate to="/"/>

    return (
        <Layout>
            <div>
  

        <SidebarProfile/>
        <OrderCard orders={orders}
          classNames={classNames}
        />
          
        </div>
      </Layout>
    )
}

const mapStateToProps =state=>({
    orders: state.Orders.orders,
    isAuthenticated: state.Auth.isAuthenticated,
    user: state.Auth.user
})

export default connect(mapStateToProps,{
    list_orders,
    get_order_detail,
    get_items,
    get_total,
    get_item_total
}) (DashboardPayments)