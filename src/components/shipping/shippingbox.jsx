import { useEffect } from "react"
import logo from '/logostarken.jpg'
const Shippingbox=({id, get_shipping_option_id, shipping})=>{
    useEffect(() => {
        get_shipping_option_id(id)
    },[])
    return(
        <>
            <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
                    <h3 className="text-xl font-semibold leading-5 text-gray-800">Envio</h3>
                        <div className="flex justify-between items-start w-full">
                             <div className="flex justify-center items-center space-x-4">
                                    <div class="w-8 h-8">
                                        <img class="w-full h-full" alt="logo" src={logo} />
                                    </div>
                                    <div className="flex flex-col justify-start items-center">
                                        <p className="text-lg leading-6 font-semibold text-gray-800">
                                            {shipping && shipping.name}
                                            <br />
                                            <span className="font-normal">{shipping && shipping.time_to_delivery}</span>
                                        </p>
                                    </div>
                                </div>
                                
                            </div>
                            <div className="w-full flex justify-center items-center">
                                <button className="hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white">View Carrier Details</button>
                            </div>
                        </div>
        </>
    )

}
export default Shippingbox