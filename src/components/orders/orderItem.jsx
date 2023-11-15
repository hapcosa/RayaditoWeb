import { useState } from "react";
import { Link } from "react-router-dom";

const OrderItem = ({
    item,
})=>{

    return(
        <>
        <li className="flex py-6 sm:py-10">
            <div className="flex-shrink-0">
            <img
                src={item && item.photo}
                alt=""
                className="w-24 h-24 rounded-md object-center object-cover sm:w-48 sm:h-48"
            />
            </div>

            <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                <div className="flex">
                    <p className="text-gray-800">{item && item.name}</p>
                </div>
            <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                <div>
                <p className="mt-1 text-sm font-medium text-gray-900">$ {item && item.price}</p>
                </div>
            </div>
            </div>
        </li>
        
        </>
    )
}
export default OrderItem