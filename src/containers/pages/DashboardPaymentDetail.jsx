import Layout from '../../hocs/layout/layout';
import { connect } from 'react-redux'
import {list_orders, get_order_detail} from '../../redux/action/orders'
import { useParams } from 'react-router';
import { useEffect } from 'react';
import SidebarProfile from '../../components/navigation/sidebarProfile';
import OrderCard from '../../components/cart/ordercard';




const DashboardPaymentDetail =({
    order,
    isAuthenticated,
    get_order_detail
})=>{
    const params = useParams()
    const transaction_id = params.transaction_id
    console.log(transaction_id)
    useEffect(() => {
      window.scrollTo(0, 0);
      get_order_detail(transaction_id)
  }, []);


    return (
        <Layout>
          <div>

        <SidebarProfile/>
        <OrderCard orderdetail={order}/>

        
          </div>
        </Layout>
    )
}

const mapStateToProps =state=>({
    order: state.Orders.order,
    isAuthenticated: state.Auth.isAuthenticated,
    user: state.Auth.user
})

export default connect(mapStateToProps,{list_orders, get_order_detail}) (DashboardPaymentDetail)