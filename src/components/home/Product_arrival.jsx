import { Link } from "react-router-dom"



const products = [
    {
      id: 1,
      name: 'Basic Tee',
      href: '#',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$35',
      color: 'Black',
    },
    // More products...
  ]
  
  export default function Product_arrival({
    joyas, piedras
  }) {
    return (
      <>
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:max-w-7xl">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-700">Ultimas joyas</h2>
  
          <div className="mt-2 grid grid-cols-1 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {joyas &&
            joyas !== null &&
            joyas !== undefined &&
             joyas.map((joya) => (
              <div key={joya.id} className="group relative">
                <div className="w-64 min-h-80 bg-gray-200  rounded-md overflow-hidden group-hover:opacity-75 lg:h-52 lg:aspect-none">
                  <img
                    src={joya.photo}
                    alt=""
                    className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                  />
                </div>
                <div className=" group-hover:opacity-75 w-44 mt-2 justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <Link to={`joyas/${joya.id}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {joya.name}
                      </Link>
                    </h3>
                  </div>
                  <p className="text-sm font-medium text-gray-500">{joya.price} clp</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-700">Ultimas Piedras</h2>
  
          <div className="mt-2 grid grid-cols-1  gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {piedras &&
            piedras !== null &&
            piedras !== undefined &&
             piedras.map((piedra) => (
              <div key={piedra.id} className="group relative">
                <div className="w-64 min-h-80 bg-gray-200  rounded-md overflow-hidden group-hover:opacity-75 lg:h-52 lg:aspect-none">
                  <img
                    src={piedra.photo}
                    alt=""
                    className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                  />
                </div>
                <div className=" group-hover:opacity-75 w-44 mt-2 justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <Link to={`piedras/${piedra.id}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {piedra.name}
                      </Link>
                    </h3>
                  </div>
                  <p className="text-sm font-medium text-gray-500">{piedra.price} clp</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </>
    )
  }
  