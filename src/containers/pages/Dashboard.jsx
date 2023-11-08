import Layout from '../../hocs/layout/layout';
import { connect } from 'react-redux'
import {list_orders} from '../../redux/action/orders'
import {get_user_profiles} from '../../redux/action/profile'

import SidebarProfile  from '../../components/navigation/sidebarProfile'
import {
    get_items,
    get_total,
    get_item_total
} from "../../redux/action/cart";
import { useEffect } from 'react';
import { Navigate } from 'react-router';
import DashboardLink from '../../components/dashboard/DashboardLink';
import { Fragment, useState } from 'react'







const Dashboard=({
    list_orders,
    get_items,
    get_total,
    get_item_total,
    orders,
    isAuthenticated,
    user,
    profiles,
    get_user_profiles,
})=>{

    

    useEffect(() => {
        get_items()
        get_total()
        get_item_total()
        list_orders()
        get_user_profiles()
    }, [])

    if(!isAuthenticated)
        return <Navigate to="/"/>

    return (
        <Layout>
        <div>
        <SidebarProfile/>

          <main className="flex-1">
            <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
            <div className="max-w-3xl mx-auto">
            <div>
        <h3 className="text-lg leading-6 font-medium text-gray-900">Informacion de usuario</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">informacion.</p>
      </div>
      <div className="mt-5 border-t border-gray-200">
        <dl className="divide-y divide-gray-200">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">nombre:</dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span className="flex-grow">{user.first_name}</span>
              
            </dd>
              
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">apellido:</dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span className="flex-grow">{user.last_name}</span>
              
            </dd>
          </div>

          
          <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Email address</dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span className="flex-grow">{user.email}</span>
              
            </dd>
          </div>

         
        </dl>
      </div>
            </div>
            </div>
            </div>
          </main>
        </div>
        </Layout>
    )
}

const mapStateToProps =state=>({
    orders: state.Orders.orders,
    isAuthenticated: state.Auth.isAuthenticated,
    user: state.Auth.user,
    profile: state.Auth.profile
})

export default connect(mapStateToProps,{
    list_orders,
    get_items,
    get_total,
    get_item_total,
    get_user_profiles
}) (Dashboard)