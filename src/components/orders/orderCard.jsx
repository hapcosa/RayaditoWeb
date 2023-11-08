import moment from 'moment/moment';
import { Link } from 'react-router-dom';
const OrderCard = ({orders, classNames}) =>{
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
    return(
        <main className="flex-1">
            <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
            <div className="max-w-3xl mx-auto">

            <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
       

        <div className="mt-8">
           
          <div className="space-y-12">
          <h2 className="sr-only">Tus Pedidos</h2>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Tus pedidos</h1>
            {orders.map((product) => (

              <>
                <div className='border'>
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
                <div className="border-b sm:col-span-12 md:col-span-7">
                  <dl className=" border-gray-200 ">
                    <div>
                      <dt className="font-medium text-gray-700">Dirección:</dt>
                      <dd className="ml-5 mt-3 text-gray-500">
                        <span className="text-lg block">{product.address_line_1}</span>
                      </dd>
                    </div>
                    <div>
                      <dt className="mt-3 font-medium text-gray-700">Valor pagado:</dt>
                      <dd className="mt-3 text-gray-500 space-y-3">
                        <p className='ml-5'>$ {product.amount}</p>
                        
                      </dd>
                    </div>
                  </dl>
                  <hr/>
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
    )
};

export default OrderCard;