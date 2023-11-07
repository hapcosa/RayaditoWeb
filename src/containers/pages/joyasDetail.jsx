import { connect } from "react-redux"
import Layout from "../../hocs/layout/layout"
import { useNavigate, useParams} from "react-router-dom"
import { useEffect, useState } from "react"
import { get_joyas_id, get_related_joyas, get_joyas_id_galery} from "../../redux/action/joyas"
import { Disclosure, RadioGroup, Tab } from '@headlessui/react'
import { HeartIcon, MinusSmIcon, PlusSmIcon } from '@heroiconv1/react/outline'
import Galery from "../../components/product/galery"
import {get_items, add_item, get_total, get_item_total} from "../../redux/action/cart"
import { RingLoader } from "react-spinners"
const JoyasDetail = ({
    get_joyas_id,
    joya,
    joya_galery,
    get_joyas_id_galery,
    add_item,
    get_items,
    get_total,
    get_item_total
}) =>{
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const addToCart = async () =>{
    if(joya && joya !==null && joya!==undefined && joya.sold === false){
      setLoading(true);
      await add_item(joya);
      await get_items();
      await get_total();
      await get_item_total();
      setLoading(false);
      navigate("/cart")
    }
 
    
  }
  const product = {
    
    details: [
      {
        name: 'Caracteristicas',
        items: [
          `Material: ${joya && joya.material}`,
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
      get_joyas_id(productId)
      get_joyas_id_galery(productId)
  }, []);

    
    return(
        <>
        <Layout>
          <div className="bg-white">
          <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
              {/* Image gallery */}
              <Galery data={joya && joya.photo} galery={joya_galery && joya_galery}/>

              {/* Product info */}
              <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{joya && joya.name}</h1>

                <div className="mt-3">
                  <h2 className="sr-only">Product information</h2>
                  <p className="text-3xl text-gray-900">{joya && joya.price}</p>
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
                    <p className="sr-only">{joya && joya.rating} out of 5 stars</p>
                  </div>
                </div>*/}

                <div className="mt-6">
                  <h3 className="sr-only">Description</h3>

                  <div
                    className="text-base text-gray-700 space-y-6"
                    dangerouslySetInnerHTML={{ __html: joya && joya.description }}
                  />
                </div>
                <div className="mt-6">
                  <h3 className="text-base text-gray-700 space-y-6">{ joya && joya.date_created.substr(0,10) }</h3>
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
                  {joya && joya.sold?
                   <p className="py-3 px-8 flex items-center justify-center text-base font-medium max-w-xs flex-1 text-red-600">No disponible</p>:
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
    joya: state.Joyas.joya,
    related_joyas: state.Joyas.related_joyas,
    joya_galery: state.Joyas.joya_galery,
})
export default connect(mapStateToProps, { get_joyas_id, get_related_joyas, get_joyas_id_galery, add_item, get_total, get_items, get_item_total}) (JoyasDetail)