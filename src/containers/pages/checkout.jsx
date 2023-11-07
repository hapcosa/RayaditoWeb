import Layout from '../../hocs/layout/layout'
import { useNavigate } from 'react-router'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import CheckoutItem from '../../components/checkout/CheckoutItem'
import { setAlert } from '../../redux/action/alert'
import { update_item, remove_item } from '../../redux/action/cart'
import { useEffect, useState } from 'react'
import {get_shipping_options} from '../../redux/action/shipping'
import {get_user_profiles} from '../../redux/action/profile'
import {
  refresh
} from '../../redux/action/auth';
import ShippingFormAuth from '../../components/checkout/ShippingFormAuth'
import CheckAddress from '../../components/checkout/checkaddress'
import {
  process_payment, process_payment_auth, reset
} from '../../redux/action/payment';
import { RingLoader } from "react-spinners"
import {countries} from '../../helpers/fixedCountries'
import ShippingForm from '../../components/checkout/ShippingForm'
import { Radio } from "@material-tailwind/react";


const Checkout = ({
    isAuthenticated, 
    items,
    update_item,
    remove_item,
    setAlert,
    get_shipping_options,
    shipping,
    refresh, 
    process_payment,
    user,
    total_items,
    url,
    made_payment,
    loading,
    total,
    get_user_profiles,
    profiles,
    process_payment_auth
}) => {

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        address_line_1: '',
        address_id: '',
        city: '',
        state_province_region: '',
        postal_zip_code: '',
        telephone_number: '',
        shipping_id: 0,
    });
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const [data, setData] = useState({
        instance: {}
    });
    useEffect(() => {
        window.scrollTo(0,0)
        get_shipping_options()
        get_user_profiles()
    }, [])
    const direction = () =>{

        let results = []
        let display = []
  
        if (profiles &&
          profiles !== null &&
          profiles !== undefined) {
  
          profiles.map((profile, index) => {
    
              return display.push(
                <>
                <div className="flex" key={index}>
                <Radio onChange={e => onChange(e)} name='address_id' value={profile.id}/><CheckAddress data={profile}/>
                </div>
                </>
            );}); 
        }
        for (let i = 0; i < display.length; i += 1) {
          results.push(
            <div  className='flex items-center justify-between' key={i}>
                {display[i] ? display[i] : <div ></div>}
            </div>
          )
        }
        
  
        if (results.length > 0){
          return results
        }else{
          return (<Link to='/checkout/newaddress' >Aun no tiene direcciones de envio,agrega una</Link>)
        }
  
      }
    const { 
        address_id,
        email,
        first_name,
        last_name,
        address_line_1,
        city,
        state_province_region,
        postal_zip_code,
        telephone_number,
        shipping_id,
    } = formData;

    
    const buy = async e => {
        e.preventDefault();
        if(isAuthenticated){
            process_payment_auth(
                shipping_id,
                address_id,
                items,
            );
            reset()

        }else{
            process_payment(
                email,
                shipping_id,
                first_name,
                last_name,
                address_line_1,
                city,
                state_province_region,
                postal_zip_code,
                telephone_number,
                items,
            );
            reset()
        }
        
      
    }




    const [render, setRender] = useState(false);


  

    const showItems = () => {
        return(
            <div>
                {
                    items && 
                    items !== null && 
                    items !== undefined && 
                    items.length !== 0 && 
                    items.map((item, index)=>{
                        let count = item.count;
                        return (
                            <div key={index}>
                                <CheckoutItem
                                    item={item}
                                    count={count}
                                    update_item={update_item}
                                    remove_item={remove_item}
                                    render={render}
                                    setRender={setRender}
                                    setAlert={setAlert}
                                />
                            </div>
                        );
                    })
                }
            </div>
        )
    }

    const renderShipping = () => {
        if (shipping && shipping !== null && shipping !== undefined) {
            return (
                <div className='mb-5'>
                    {
                        shipping.map((shipping_option, index) => (
                            <div key={index}>
                                <input
                                    onChange={e => onChange(e)}
                                    value={shipping_option.id}
                                    name='shipping_id'
                                    type='radio'
                                    required
                                />
                                <label className='ml-4'>
                                    {shipping_option.name} - {shipping_option.price} {shipping_option.time_to_delivery}
                                </label>
                            </div>
                        ))
                    }
                </div>
            );
        }
    };

    const AuthForm = () => {
          if (isAuthenticated) {
              return( 
                  <>
                      <ShippingFormAuth 
                        user={user}
                        profiles={profiles}
                        countries={countries}
                        renderShipping={renderShipping}
                        onChange={onChange}
                        buy={buy}
                        address_id={address_id}
                        total_items={total_items}
                        total_amount={total}
                        shipping_id={shipping_id}
                        shipping={shipping}
                        direction ={direction}
                      />
                  </>
              )
    
          }else {
            return(
              <>
                <ShippingForm
                first_name={first_name}
                last_name={last_name}
                email={email}
                address_line_1={address_line_1}
                city={city}
                state_province_region={state_province_region}
                postal_zip_code={postal_zip_code}
                telephone_number={telephone_number}
                onChange={onChange}
                buy={buy}
                countries={countries}
                total_items={total_items}
                user={user}
                renderShipping={renderShipping}
                total_amount={total}
                shipping_id={shipping_id}
                shipping={shipping}
            />

              </>
            )
          }
    }
    if (made_payment){
        /*window.open(url, '_blank')*/
        made_payment = false
        reset()
        window.location.href = url
        
    }
        
    

    return (
        <Layout>
            <div className="bg-white">
      <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Checkout</h1>
        <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Tu compra
            </h2>

            <ul className="border-t border-b border-gray-200 divide-y divide-gray-200">
              {showItems()}
            </ul>

          </section>

         {AuthForm()}

         
          
        </div>
      </div>
    </div>
        </Layout>
    )
}
const mapStateToProps = state => ({
    isAuthenticated: state.Auth.isAuthenticated,
    user: state.Auth.user,
    items: state.Cart.items,
    total_items: state.Cart.total_items,
    total: state.Cart.amount,
    shipping: state.Shipping.shipping,
    made_payment: state.Payment.made_payment,
    url: state.Payment.url,
    loading: state.Payment.loading,
    total_amount: state.Payment.total_amount,
    profiles: state.Profile.profiles
})

export default connect(mapStateToProps,{
    update_item,
    remove_item,
    setAlert,
    get_shipping_options,
    refresh,
    process_payment,
    get_user_profiles,
    reset,
    process_payment_auth
}) (Checkout)