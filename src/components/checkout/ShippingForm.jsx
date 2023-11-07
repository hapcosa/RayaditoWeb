


import { get_shipping_options } from '../../redux/action/shipping'

const ShippingForm = ({
    first_name,
    last_name,
    address_line_1,
    city,
    email,
    countries,
    postal_zip_code,
    telephone_number,
    onChange,
    buy,
    renderShipping,
    total_amount,
    shipping_id,
    shipping,
    total_items,
}) => {     
    return (
        <>
        <section
            aria-labelledby="summary-heading"
            className="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5"
          >
            <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
              Sumario de orden
            </h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                {renderShipping()}
              </div>
              <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                <dt className="flex text-sm text-gray-600">
                  <span>Envio</span>
                </dt>
                <dd className="text-sm font-medium text-gray-900">{shipping && shipping_id !== 0 ? <>{get_shipping_options}</>:<div className="text-red-500">(Please select shipping option)</div>}</dd>
                </div>


              
              <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                <dt className="flex text-sm text-gray-600">
                  <span>Cantidad de piezas</span>
                </dt>
                <dd className="text-sm font-medium text-gray-900">{total_items}</dd>
                </div>
                <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                    <dt className="text-base font-medium text-gray-900">Order total</dt>
                    <dd className="text-base font-medium text-gray-900">${total_amount}</dd>
                </div>
              

              

            </dl>

            <form onSubmit={e => buy(e)}>
            <>
                <div className=" px-4 py-5  mt-4 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Shipping Address:</h3>
            </div>
            
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-gray-200 sm:pt-5">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Nombre:*
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <div className="max-w-lg flex rounded-md shadow-sm">
                    <input
                            type='text'
                            name='first_name'
                            //placeholder={`${user.first_name} ${user.last_name}`}
                            onChange={e => onChange(e)}
                            required
                            className=" mt-2 flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-300"
                        />
                    </div>
                </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-gray-200 sm:pt-5">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Apelllido:*
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <div className="max-w-lg flex rounded-md shadow-sm">
                    <input
                            type='text'
                            name='last_name'
                            //placeholder={`${user.first_name} ${user.last_name}`}
                            onChange={e => onChange(e)}
                            required
                            className=" mt-2 flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-300"
                        />
                    </div>
                </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-gray-200 sm:pt-5">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    E-mail*
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <div className="max-w-lg flex rounded-md shadow-sm">
                    <input
                        type='text'
                        name='email'
                        //placeholder={`${user.email}`}
                        onChange={e => onChange(e)}
                        value={email}
                        required
                        className=" mt-2 flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-300"
                    />
                    </div>
                </div>
            </div>


            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-gray-200 sm:pt-5">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Direccion*
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <div className="max-w-lg flex rounded-md shadow-sm">
                    <input
                        type='text'
                        name='address_line_1'
                        //placeholder={`${profile.address_line_1}`}
                        onChange={e => onChange(e)}
                        value={address_line_1}
                        required
                        className=" mt-2 flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-300"
                    />
                    </div>
                </div>
            </div>

            
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-gray-200 sm:pt-5">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Ciudad*
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <div className="max-w-lg flex rounded-md shadow-sm">
                    <input
                        type='text'
                        name='city'
                        //placeholder={`${profile.city}`}
                        onChange={e => onChange(e)}
                        value={city}
                        required
                        className=" mt-2 flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-300"
                    />
                    </div>
                </div>
            </div>
            
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-gray-200 sm:pt-5">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Region*
                </label>
                <div className="sm:mt-0 sm:col-span-2">
                    <div className="max-w-lg flex rounded-md shadow-sm">
                    <select
              id='state_province_region'
              name='state_province_region'
              onChange={e => onChange(e)}
              className=" mt-2 max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
            >
              {
                            countries && 
                            countries !== null &&
                            countries !== undefined &&
                            countries.map((country, index) => (
                                <option key={index} value={country.name}>
                                    {country.name}
                                </option>
                            ))
                        }
            </select>
                    </div>
                </div>
            </div>
            
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-gray-200 sm:pt-5">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Codigo postal*
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <div className="max-w-lg flex rounded-md shadow-sm">
                    <input
                        type='text'
                        name='postal_zip_code'
                        // placeholder={`${profile.zipcode}`}
                        onChange={e => onChange(e)}
                        value={postal_zip_code}
                        required
                        className="mt-2 flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-300"
                    />
                    </div>
                </div>
            </div>
            
            {/*
            <div className="">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Country/Region*
                </label>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-gray-200 sm:pt-5">
          <div className=" sm:col-span-2">
            <select
              id='country_region'
              name='country_region'
              onChange={e => onChange(e)}
              className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
            >
              {
                            countries && 
                            countries !== null &&
                            countries !== undefined &&
                            countries.map((country, index) => (
                                <option key={index} value={country.name}>
                                    {country.name}
                                </option>
                            ))
                        }
            </select>
          </div>
        </div>
            </div>*/ }

            <div className="sm:grid sm:grid-cols-3 mb-4 sm:gap-4 sm:items-start  sm:border-gray-200 sm:pt-5">
                <label htmlFor="telephone_number" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Telefono*
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <div className="max-w-lg flex rounded-md shadow-sm">
                    <input
                        type='tel'
                        name='telephone_number'
                        // placeholder={`${profile.phone}`}
                        onChange={e => onChange(e)}
                        value={telephone_number}
                        required
                        className="mt-2 flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-300"
                    />
                    </div>
                </div>
            </div>
            <button className='className="ml-8 inline-flex items-center justify-center px-20 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gray-600 hover:bg-gray-700"'>Pagar</button>
            </>
            

            </form>
          </section>
          </>

    )
}

export default ShippingForm