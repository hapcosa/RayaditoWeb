import { Link } from "react-router-dom"
const ProductCard = ({data, categories, categories_piedras})=>{
  const joyaorstone = () =>{
    let display = []
    categories.map((category,index)=>{
      if(category.sub_categories.length > 0){
        category.sub_categories.map((category,index)=>{
          if(category.id === data.category){
            return display.push(
              <Link to={`/joyas/${data.id}`}>
                <span aria-hidden="true" className="absolute inset-0" />
                {data.name}
              </Link>
            )
        }
        }
        )
       
      }
      if(category.id === data.category){
        
        return display.push(
          <Link to={`/joyas/${data.id}`}>
            <span aria-hidden="true" className="absolute inset-0" />
            {data.name}
          </Link>
        )
      }})
    categories_piedras.map((category,index)=>{
      if(category.sub_categories.length > 0){
        category.sub_categories.map((category,index)=>{
          if(category.id === data.category){
            return display.push(
              <Link to={`/piedras/${data.id}`}>
                <span aria-hidden="true" className="absolute inset-0" />
                {data.name}
              </Link>
            )
         }
        }
          )
      }
      if(category.id === data.category){
        
        return display.push(
          <Link to={`/piedras/${data.id}`}>
                  <span aria-hidden="true" className="absolute inset-0" />
                  {data.name}
          </Link>
        )
      }
     })
    return display
    }
    return (
        <div  className="group relative">
        <div className="w-64 min-h-80 bg-gray-200 rounded-md overflow-hidden group-hover:opacity-75 lg:h-64 lg:aspect-none">
          <img
            src={data.photo}
            alt=""
            className=" w-full h-full object-center object-cover lg:w-full lg:h-full"
          />
        </div>
        <div className=" mb-4 group-hover:opacity-75 w-64 mt-2 justify-between">
          <div>
            <h5 className="text-sm text-gray-700">
             { joyaorstone()}
            </h5>
          </div>
          <p className="text-sm font-medium text-gray-500">$ {data.price} clp</p>
          
        </div>
      </div>
    )
}
export default ProductCard