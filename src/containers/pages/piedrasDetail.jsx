import { connect } from "react-redux"
import Layout from "../../hocs/layout/layout"
import { useParams, useNavigate} from "react-router-dom"
import { useEffect, useState } from "react"

import { get_piedras_id, get_related_piedras, get_piedras_id_galery} from "../../redux/action/piedras"
import { HeartIcon } from '@heroicons/react/24/outline'
import Galery from "../../components/product/galery"
import { RingLoader } from "react-spinners"
import {get_items, add_item, get_total, get_item_total} from "../../redux/action/cart"

const PiedrasDetail = ({
    get_piedras_id,
    piedra,
    piedra_galery,
    get_piedras_id_galery,
    get_items,
    add_item,
    get_total,
    get_item_total
}) =>{
  
  const product = {
    
    details: [
      {
        name: 'Caracteristicas',
        items: [
          `Material: ${piedra && piedra.nombrePiedra}`,
          'Piedras:',
          'Leather handle and tabs',
          'Interior dividers',
          'Stainless strap loops',
          'Double stitched construction',
          'Water-resistant',
        ],
      },
      // More sections...
    ],
  }
    const params = useParams()
    const productId = params.productId
    useEffect(() => {
      window.scrollTo(0, 0);
      get_piedras_id(productId)
      get_piedras_id_galery(productId)
  }, []);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const addToCart = async () =>{
    if(piedra && piedra !==null && piedra!==undefined && piedra.sold === false){
      console.log("antes de actions")
      setLoading(true);
      await add_item(piedra);
      await get_items();
      await get_total();
      await get_item_total();
      setLoading(false);
      navigate("/cart")
    }
  } 
    return(
        <>
        <Layout>
          <div className="bg-white">
          <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
              {/* Image gallery */}
              <Galery data={piedra && piedra.photo} galery={piedra_galery && piedra_galery}/>

              {/* Product info */}
             <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{piedra && piedra.name}</h1>

                <div className="mt-3">
                  <h2 className="sr-only">Product information</h2>
                  <p className="text-3xl text-gray-900">{piedra && piedra.price}</p>
                </div>

                {/* Reviews 
                <div className="mt-3">
                  <h3 className="sr-only">Reviews</h3>
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            product.rating > rating ? 'text-indigo-500' : 'text-gray-300',
                            'h-5 w-5 flex-shrink-0'
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="sr-only">{piedra && piedra.rating} out of 5 stars</p>
                  </div>
                </div>*/}

                <div className="mt-6">
                  <h3 className="sr-only">Description</h3>

                  <div
                    className="text-base text-gray-700 space-y-6"
                    dangerouslySetInnerHTML={{ __html: piedra && piedra.description }}
                  />
                </div>
                <div className="mt-6">
                  <h3 className="text-base text-gray-700 space-y-6">{ piedra && piedra.date_created.substr(0,10) }</h3>
                </div>
                

                <section className="mt-6">
                  {/* Colors 
                  <div>
                    <h3 className="text-sm text-gray-600">Color</h3>

                    <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-2">
                      <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                      <div className="flex items-center space-x-3">
                        {product.colors.map((color) => (
                          <RadioGroup.Option
                            key={color.name}
                            value={color}
                            className={({ active, checked }) =>
                              classNames(
                                color.selectedColor,
                                active && checked ? 'ring ring-offset-1' : '',
                                !active && checked ? 'ring-2' : '',
                                '-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none'
                              )
                            }
                          >
                            <RadioGroup.Label as="p" className="sr-only">
                              {color.name}
                            </RadioGroup.Label>
                            <span
                              aria-hidden="true"
                              className={classNames(
                                color.bgColor,
                                'h-8 w-8 border border-black border-opacity-10 rounded-full'
                              )}
                            />
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>*/}

                  <div className="mt-10 flex sm:flex-col1">
                  {loading?
                    <button
                      className="max-w-xs flex-1 bg-gray-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full"
                    >
                      <RingLoader color="#FFF" height={20} width={20} />
                    </button>:
                    <button
                      type="submit"
                      onClick={addToCart}
                      className="max-w-xs flex-1 bg-gray-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full"
                    >
                      Agregar al carrito
                    </button>
                    }

                    <button
                      type="button"
                      className="ml-4 py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                    >
                      <HeartIcon className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
                      <span className="sr-only">Add to favorites</span>
                    </button>
                  </div>
                </section>

                <section aria-labelledby="details-heading" className="mt-12">
                  <h2 id="details-heading" className="sr-only">
                    Additional details
                  </h2>
                

                </section>
              </div>
            </div>
          </div>
        </div>
        </Layout>
        </>
    )
}
const mapStateToProps = state => ({ 
    piedra: state.Piedras.piedra,
    related_piedras: state.Piedras.related_piedras,
    piedra_galery: state.Piedras.piedra_galery,
})
export default connect(mapStateToProps, { get_piedras_id, get_related_piedras, get_piedras_id_galery, get_items, add_item, get_total, get_item_total}) (PiedrasDetail)