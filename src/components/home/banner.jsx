import logo1 from '../../../public/media/IMG_0134.jpg'
import logo2 from '../../../public/media/IMG_0134.jpg'
import logo3 from '../../../public/media/IMG_0134.jpg'
import logo4 from '../../../public/media/IMG_0134.jpg'
import logo5 from '../../../public/media/IMG_0134.jpg'
import logo6 from '../../../public/media/IMG_0134.jpg'
import logo from '../../../public/media/IMG_0134.jpg'
import { Typewriter } from 'react-simple-typewriter'
export default function BannerPromo() {
    return (
      <>
      <div className="relative bg-white overflow-hidden">
        <div className="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:static">
            <div className="sm:max-w-lg py-2">
              <h4 className=" text-4xl font font-extrabold tracking-tight text-gray-700 sm:text-6xl">
              JOYAS Y PIEDRAS
              </h4>
              <h4 className=" text-4xl font font-extrabold tracking-tight text-gray-500 sm:text-5xl">
              <Typewriter words={
                  ['de autor', 'trabajadas a mano', 'para siempre', ]
                      }
                      loop={0}
                      cursor
                      cursorStyle='_'
                      typeSpeed={100}
                      deleteSpeed={50}
                      delaySpeed={1400}/>
              </h4>
              <p className="mt-6 text-xl text-gray-500">
                Joyas de autor, con piedras recolectadas en los hermosos y reconditos paisajes de la isla de Chiloe
              </p>
              <div className='mt-6'>
              <div aria-hidden="true" 
                        className="mt-2 pointer-events-none lg:absolute lg:inset-y-2 lg:max-w-10xl lg:mx-auto lg:w-full">
                  <div className="absolute transform sm:left-1/2 py-10 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                    <div className="flex items-center lg:space-x-2">
                      <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="w-44 h-48 rounded-lg overflow-hidden sm:opacity-0 lg:opacity-100">
                          <img
                            src={logo}
                            alt=""
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                        <div className="w-44 h-48 rounded-lg overflow-hidden">
                          <img
                            src={logo2}
                            alt=""
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                      </div>
                      <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="w-44 h-48 rounded-lg overflow-hidden">
                          <img
                            src={logo1}
                            alt=""
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                        <div className="w-44 h-48 rounded-lg overflow-hidden">
                          <img
                            src={logo3}
                            alt=""
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                        <div className="w-44 h-48 rounded-lg overflow-hidden">
                          <img
                            src={logo4}
                            alt=""
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                      </div>
                      <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="w-44 h-48 rounded-lg overflow-hidden">
                          <img
                            src={logo5}
                            alt=""
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                        <div className="w-44 h-48 rounded-lg overflow-hidden">
                          <img
                            src={logo6}
                            alt=""
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              <a
                  href="#"
                  className="inline-block text-center bg-gray-600 border border-transparent rounded-md py-2 px-8 font-medium text-white hover:bg-gray-700"
                >
                  Joyas
                </a>
              </div>
            </div>
          </div>
        </div>
        
      </div>
  
      </>
      
    )
  }
/*                <div
                  aria-hidden="true"
                  className="pointer-events-none lg:absolute lg:inset-y-0 lg:max-w-7xl lg:mx-auto lg:w-full"
                >
                  <div className="absolute transform sm:left-1/2 py-10 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                    <div className="flex items-center space-x-6 lg:space-x-8">
                      <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="w-36 h-44 rounded-lg overflow-hidden sm:opacity-0 lg:opacity-100">
                          <img
                            src={logo}
                            alt=""
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                        <div className="w-36 h-44 rounded-lg overflow-hidden">
                          <img
                            src={logo2}
                            alt=""
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                      </div>
                      <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="w-36 h-44 rounded-lg overflow-hidden">
                          <img
                            src={logo1}
                            alt=""
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                        <div className="w-36 h-44 rounded-lg overflow-hidden">
                          <img
                            src={logo3}
                            alt=""
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                        <div className="w-36 h-44 rounded-lg overflow-hidden">
                          <img
                            src={logo4}
                            alt=""
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                      </div>
                      <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="w-36 h-44 rounded-lg overflow-hidden">
                          <img
                            src={logo5}
                            alt=""
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                        <div className="w-36 h-44 rounded-lg overflow-hidden">
                          <img
                            src={logo6}
                            alt=""
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>*/