import { useState } from "react";
import { Link } from "react-router-dom";
import { XMarkIcon, CheckIcon, ClockIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";
const CartItem = ({
    item,
    sold,
    remove_item,
    render,
    setRender,
    setAlert
})=>{
    const [formData, setFormData] = useState();
    
    useEffect(() => {
        if (!sold)
            setFormData({ ...formData });
    }, [sold]);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });


    const removeItemHandler = async () => {
        console.log('Removing')
        await remove_item(item);
        setRender(!render);
    };

    return(
        <>
        <li className="flex py-6 sm:py-10">
            <div className="flex-shrink-0">
            <img
                src={item.product.photo}
                alt=""
                className="w-24 h-24 rounded-md object-center object-cover sm:w-48 sm:h-48"
            />
            </div>

            <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
            <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                <div>
                <div className="flex justify-between">
                    <h3 className="text-sm">
                    <Link to={`/product/${item.product.id}`} className="font-medium text-gray-700 hover:text-gray-800">
                        {item.product.name}
                    </Link>
                    </h3>
                </div>
                <p className="mt-1 text-sm font-medium text-gray-900">$ {item.product.price}</p>
                </div>

                <div className="mt-4 sm:mt-0 sm:pr-9">
                <div className="absolute  mr-5 top-0 right-0">
                    <button 
                    onClick={removeItemHandler}
                    className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Remove</span>
                    <XMarkIcon className="h-5 w-5 text-gray-700 bg-gray-200" aria-hidden="true" />
                    </button>
                </div>
                </div>
            </div>

            <p className="mt-4 flex text-sm text-gray-700 space-x-2">
                {     
                    item.product && 
                    item.product !== null &&
                    item.product !== undefined && 
                    sold === false ? 
                (
                    <>
                    <CheckIcon className="flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" />
                    <span>Disponible</span>
                    </>
                ) 
                : (
                    <>
                <ClockIcon className="flex-shrink-0 h-5 w-5 text-gray-300" aria-hidden="true" />
                <span>Ya no se encuentra Disponible</span>
                    </>
                )}
            </p>
            </div>
        </li>
        
        </>
    )
}
export default CartItem