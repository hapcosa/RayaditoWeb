import Layout from '../../hocs/layout/layout';
import { connect } from 'react-redux'
import {list_orders} from '../../redux/action/orders'
import {
    get_items,
    get_total,
    get_item_total
} from "../../redux/action/cart";
import { useEffect } from 'react';
import { Navigate } from 'react-router';
import {Button,
} from "@material-tailwind/react";

import {  useState } from 'react'

import { Link } from 'react-router-dom';
import { countries } from '../../helpers/fixedCountries';
import { update_user_profile, get_user_profiles, create_user_profile } from '../../redux/action/profile';
import Address from '../../components/dashboard/address';
import SidebarProfile from '../../components/navigation/sidebarProfile';



const DashboardProfile =({
    list_orders,
    get_items,
    get_total,
    get_item_total,
    orders,
    isAuthenticated,
    user,
    get_user_profiles,
    update_user_profile,
    create_user_profile,
    profiles,
})=>{

    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        get_items()
        get_total()
        get_item_total()
        list_orders()
        get_user_profiles()
    }, [])

    const [formData, setFormData] = useState({
        address_line_1: '',
        city: '',
        zipcode: '',
        phone: '',
        country_region: ''
    });

    const {
        address_line_1,
        city,
        zipcode,
        phone,
        country_region
    } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
      e.preventDefault();
      setLoading(true)
      update_user_profile(
          address_line_1,
          city,
          zipcode,
          phone,
          country_region
      );
      setLoading(false)
      window.scrollTo(0, 0);
  };

  const direcction = () =>{

      let results = []
      let display = []

      if (profiles &&
        profiles !== null &&
        profiles !== undefined) {

        profiles.map((profile, index) => {
            return display.push(
                <div key={index}>
                    <Address data={profile}/>
                </div>
            );}); 
      }

      for (let i = 0; i < display.length; i += 2) {
        results.push(
          <div key={i} className='grid md:grid-cols-2 '>
              {display[i] ? display[i] : <div className=''></div>}
              {display[i+1] ? display[i+1] : <div className=''></div>}
          </div>
        )
      }

      if (results.length > 0){
        return results
      }else{
        return (<h1 >Aun no tiene direcciones de envio,agrega una</h1>)
      }

    }

    if(!isAuthenticated)
        return <Navigate to="/"/>

    return (
        <Layout>
            <div>

          <SidebarProfile/>
        
        
        <div className="md:pl-64 flex flex-col flex-1">
        
          <main className="flex-1">
            <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6 flex">
                <h1 className="text-lg leading-6 font-medium text-gray-700 flex-auto text">Tus direcciones</h1>
                <Link to='/dashboard/profile/newadress'><Button className='py-3 ml-5 bg-blue-gray-100 text-gray-600 rounded-xl flex-auto hover:bg-blue-gray-200'> Agregar nueva direccion</Button></Link>

              </div>

            {direcction()}
            {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
          {/* <form onSubmit={e => onSubmit(e)} className="max-w-3xl mx-auto">
      
        
              

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Address Line 1: 
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <div className="max-w-lg flex rounded-md shadow-sm">
                    
                    <input
                      type="text"
                      name='address_line_1'
                      placeholder={`${profiles.address_line_1}`}
                      onChange={e => onChange(e)}
                      value={address_line_1}
                      className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-500"
                    />
                  </div>
                </div>
              </div>
              
              

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                City
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <div className="max-w-lg flex rounded-md shadow-sm">
                    
                    <input
                      type="text"
                      name='city'
                      placeholder={`${profiles.city}`}
                      onChange={e => onChange(e)}
                      value={city}
                      className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-500"
                    />
                  </div>
                </div>
              </div>

              

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Postal Code/Zipcode: 
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <div className="max-w-lg flex rounded-md shadow-sm">
                    
                    <input
                      type="text"
                      name='zipcode'
                            placeholder={`${profiles.zipcode}`}
                            onChange={e => onChange(e)}
                            value={zipcode}
                      className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-500"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Phone: 
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <div className="max-w-lg flex rounded-md shadow-sm">
                    
                    <input
                      type="text"
                      name='phone'
                            placeholder={`${profiles.phone}`}
                            onChange={e => onChange(e)}
                            value={phone}
                      className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-500"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Country
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <select
                            id='country_region' 
                            name='country_region'
                            onChange={e => onChange(e)}
                        >
                            <option value={country_region}>{profiles.country_region}</option>
                            {
                                countries && countries.map((country, index) => (
                                    <option key={index} value={country.name}>{country.name}</option>
                                ))
                            }
                        </select>
                </div>
              </div>

              {loading?<button
                className="inline-flex mt-4 float-right items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Loader
                type="Oval"
                width={20}
                height={20}
                color="#fff"
                />
              </button>:<button
                type="submit"
                className="inline-flex mt-4 float-right items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Guardar
              </button>}

            </form>*/}
            </div>
            </div>
          </main>
        </div>
      </div>
      </Layout>
    )
}

const mapStateToProps =state=>({
    orders: state.Orders.orders,
    isAuthenticated: state.Auth.isAuthenticated,
    user: state.Auth.user,
    profiles: state.Profile.profiles,
})

export default connect(mapStateToProps,{
    list_orders,
    get_items,
    get_total,
    get_item_total,
    update_user_profile,
    get_user_profiles,
}) (DashboardProfile)