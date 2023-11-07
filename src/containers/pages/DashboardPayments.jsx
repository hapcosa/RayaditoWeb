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
import moment from 'moment/moment';
import SidebarProfile from '../../components/navigation/sidebarProfile';

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
    let step = 0
    const TimeLine = (status) =>{
      if(status === 'no procesado'){
        step = 0
      }else if(status === 'procesado'){
        step = 1
      }else if(status === 'enviado'){
        step = 2
      }
      
    }


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

          <main className="flex-1">
            <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
            <div className="max-w-3xl mx-auto">

            <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
       

        <div className="mt-8">
           
          <div className="space-y-12">
            {orders.map((product) => (

              <>
               <h2 className="sr-only">Tus productos</h2>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Tus pedidos</h1>
            
          <div className="text-sm border-b border-gray-200 mt-2 pb-5 sm:flex sm:justify-between">
            <dl className="flex">
              <dt className="text-gray-500">Transaction ID: &nbsp;</dt>
              <dd className="font-medium text-gray-900">{product.transaction_id}</dd>
              <dt>
                <span className="sr-only">Fecha</span>
                <span className="text-gray-400 mx-2" aria-hidden="true">
                  &middot;
                </span>
              </dt>
              <dd className="font-medium text-gray-900">
                <time >{moment(product.date_issued).fromNow()}</time>
              </dd>
            </dl>
            <div className="mt-4 sm:mt-0">
              <Link to={`/dashboard/payment/${product.transaction_id}`} className="font-medium text-indigo-600 hover:text-indigo-500">
                Detalle<span aria-hidden="true"> &rarr;</span>
              </Link>
            </div>
          </div>
              <div
                key={product.id}
                className="grid grid-cols-1 text-sm sm:grid-rows-1 sm:grid-cols-12 sm:gap-x-6 md:gap-x-8 lg:gap-x-8"
              >
                

                <div className="mt-6 sm:col-span-7 sm:mt-0 md:row-end-1">
                  <h3 className="text-lg font-medium text-gray-900">
                    <Link to={`/product/${product.id}`}>{product.name}</Link>
                  </h3>
                  <p className="font-medium text-gray-900 mt-1">Transaction ID: {product.transaction_id}</p>
                  <p className="text-gray-500 mt-3">{product.description}</p>
                </div>
                <div className="sm:col-span-12 md:col-span-7">
                  <dl className="grid grid-cols-1 gap-y-8 border-b py-8 border-gray-200 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10">
                    <div>
                      <dt className="font-medium text-gray-900">Dirección:</dt>
                      <dd className="mt-3 text-gray-500">
                        <span className="block">{product.address_line_1}</span>
                      </dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-900">Valor pagado:</dt>
                      <dd className="mt-3 text-gray-500 space-y-3">
                        <p>$ {product.amount}</p>
                        
                      </dd>
                    </div>
                  </dl>
                  <p className="font-medium text-gray-900 mt-6 md:mt-10">
                    Estado: {product.status}
                  </p>
                  {TimeLine(product.status)}
                  <div className="mt-6">
                    <div className="bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-2 bg-indigo-600 rounded-full"
                        style={{ width: `calc((${step} * 2 + 1) / 8 * 100%)` }}
                      />
                    </div>
                    <div className="hidden sm:grid grid-cols-4 font-medium text-gray-600 mt-6">
                      <div className="text-indigo-600">Orden recibida</div>
                      <div className={classNames(step > 0 ? 'text-indigo-600' : '', 'text-center')}>
                        Procesado
                      </div>
                      <div className={classNames(step > 1 ? 'text-indigo-600' : '', 'text-center')}>
                        Enviado
                      </div>
                      <div className={classNames(step > 2 ? 'text-indigo-600' : '', 'text-right')}>
                        Entregado
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </>
            ))}
          </div>
        </div>
      </div>
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
    user: state.Auth.user
})

export default connect(mapStateToProps,{
    list_orders,
    get_order_detail,
    get_items,
    get_total,
    get_item_total
}) (DashboardPayments)