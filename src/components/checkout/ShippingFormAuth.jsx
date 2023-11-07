
const ShippingFormAuth = ({
    direction,
    buy,
    renderShipping,
    total_amount,
    shipping_id,
    shipping,
    total_items,
    address_id
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
                <dd className="text-sm font-medium text-gray-900">{shipping && shipping_id !== 0 ? <h6>Por Pagar</h6>:<div className="text-red-500">(Please select shipping option)</div>}</dd>
                </div>


              
              <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                <dt className="flex text-sm text-gray-600">
                  <span>Cantidad de piezas</span>
                </dt>
                <dd className="text-sm font-medium text-gray-900">{total_items}</dd>
                </div>
                <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                    <dt className="text-base font-medium text-gray-900">Total</dt>
                    <dd className="text-base font-medium text-gray-900">${total_amount}</dd>
                </div>
              

              

            </dl>

            <form onSubmit={e => buy(e)}>
            <div className="px-4 py-5  mt-4 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Elige o crea una dirección:</h3>
            </div>
            <div>
            {direction()}
            </div>
           
            
                


             
            <button className=' mt-5 className="ml-8 inline-flex items-center justify-center px-20 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gray-600 hover:bg-gray-700"'>Pagar</button>
         </form>
        </section>
        </>

    )
}

export default ShippingFormAuth