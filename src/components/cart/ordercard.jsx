
const OrderCard = ({data}) => {
  console.log(data)
    return(
        <>
          <div className="md:pl-64 flex flex-col flex-1">

<main className="flex-1">
  <div className="py-6">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
  <div className="max-w-3xl mx-auto">

  <div className="bg-white">
  <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
  <div className="bg-white">
  <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Order Details</h1>

<div className="text-sm border-b border-gray-200 mt-2 pb-5 sm:flex sm:justify-between">
<dl className="flex">
  <dt className="text-gray-500">Transaction ID: &nbsp;</dt>
  <dd className="font-medium text-gray-900">{data.transaction_id}</dd>
  <dt>
    <span className="sr-only">Date</span>
    <span className="text-gray-400 mx-2" aria-hidden="true">
      &middot;
    </span>
  </dt>
  <dd className="font-medium text-gray-900">
  <time >{moment(data.date_issued).fromNow()}</time>
  </dd>
</dl>
</div>
<div>
  <dt className="font-medium text-gray-900">Direccion</dt>
  <dd className="mt-3 text-gray-500">
      <span className="block">{data.address_line_1}</span>
  </dd>
</div>
<div className="mt-8">
<h2 className="sr-only">Productos adquiridos</h2>

<div className="space-y-24">
  {data.order_items.map((product) => (
    <div
    key={product.id}
    className="grid grid-cols-1 text-sm sm:grid-rows-1 sm:grid-cols-12 sm:gap-x-6 md:gap-x-8 lg:gap-x-8"
  >
    <div className="mt-6 sm:col-span-7 sm:mt-0 md:row-end-1">
      <h3 className="text-lg font-medium text-gray-900">
        <Link to={`/joyas/${product.id}`}>{product.name}</Link>
      </h3>
      <p className="text-gray-500 mt-3">{product.description}</p>
    </div>
    <div className="sm:col-span-12 md:col-span-7">
      <dl className="grid grid-cols-1 gap-y-8 border-b py-8 border-gray-200 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10">

        <div>
          <dt className="font-medium text-gray-900">Envio: {data.shipping_name}</dt>
          <dd className="mt-3 text-gray-500 space-y-3">
            <p></p>
            <p> Valor: ${product.price}</p>
            
          </dd>
        </div>
      </dl>
      <p className="font-medium text-gray-900 mt-6 md:mt-10">
        Status: {data.status}
      </p>
      <div className="mt-6">
        <div className="bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-2 bg-indigo-600 rounded-full"
            style={{ width: `calc((${product.step} * 2 + 1) / 8 * 100%)` }}
          />
        </div>
        <div className="hidden sm:grid grid-cols-4 font-medium text-gray-600 mt-6">
          <div className="text-indigo-600">Orden recibida</div>
          <div className={classNames(product.step > 0 ? 'text-indigo-600' : '', 'text-center')}>
            Procesado
          </div>
          <div className={classNames(product.step > 1 ? 'text-indigo-600' : '', 'text-center')}>
            Enviado
          </div>
        </div>
      </div>
    </div>
  </div>
  ))}
</div>
</div>

</div>
</div>

<div className="mt-8">
 
<div className="space-y-12">
  
</div>
</div>
</div>
</div>

  </div>
  </div>
  </div>
</main>
</div>
        </>
    )
}
export default OrderCard