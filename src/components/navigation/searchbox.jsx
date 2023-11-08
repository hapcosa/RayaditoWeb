import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
const SearchBox = ({
  categories,
  categories_piedras,
  search,
  onChange,
  onSubmit,
}) => {

    return(
        <div>
              <form onSubmit={e => onSubmit(e)} className="text-base font-medium text-gray-500 hover:text-gray-700">
              <div>
                <div className="mt-2 flex rounded-md shadow-sm border border-gray-400">
                  <div className='px-2 mt-1 mx-1 py-1'>
                    <select
                    onChange={e=> onChange(e)}
                    name='category_id'
                    className='rounded-full bg-gray-100'>
                      <option className='text-gray-50 hover:text-gray-700' value={0}>todo</option>
                      {
                        categories && categories !== null
                        && categories !== undefined &&
                        categories.map((category, index)=>(
                          <option key={index} value={category.id}>
                          {category.name}
                          </option>
                        ))
                      }
                      {
                        categories_piedras && categories_piedras !== null
                        && categories_piedras !== undefined &&
                        categories_piedras.map((category, index)=>(
                          <option key={index} value={category.id}>
                          {category.name}
                          </option>
                        ))
                      }

                    </select>
                  </div>
                  <div className="relative flex items-stretch flex-grow focus-within:z-10">
                    <input
                      onChange={e=> onChange(e)}
                      type="search"
                      name="search"
                      value={search}
                      className="focus:ring-gray-500 focus:border-gray-500 block w-full h-10 rounded-none rounded-l-md pl-4 sm:text-sm border-gray-200"
                      placeholder="Encuentra tu pieza"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="-ml-px relative inline-flex items-center space-x-2 px-4 py-3 h-10 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-100 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
                  >
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />

                  </button>
                </div>
              </div>
            </form>
        </div>
    )
}
export default SearchBox
