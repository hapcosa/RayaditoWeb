import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import logo from '/logorayadito1.png'
import gifbutton from '/loading-gif.gif'
import { DotLoader } from 'react-spinners';
function Navbar() {
    return (
        <nav className="w-full py-3 top-0 fixed">
            <div className='bg-white px-4 sm:px6'>
                <div className='-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap px-14'>
                    <div className='ml-4 mt-2'>
                        <a href='/'>
                            <img src={logo}
                                alt='rayadito'
                                width={120}/>
                        </a>
                    </div>
                    <div className='ml-4 mt-2 flex-shrink-0'>
                        <NavLink to='/joyas' className=' hover:animate-pulse text-lg inline-flex font-semibold leading-6 text-gray-600 hover:text-gray-500 border-b-2 transition duration-800  border-white hover:border-gray-400 mx-4'>joyas</NavLink>
                        <NavLink to='/piedras' className='text-lg inline-flex font-semibold leading-6 text-gray-600 hover:text-gray-500 border-b-2 transition duration-800  border-white hover:border-gray-400 mx-4'>Piedras</NavLink>
                        <NavLink to='/procesos' className='text-lg inline-flex font-semibold leading-6 text-gray-600 hover:text-gray-500 border-b-2 transition duration-800  border-white hover:border-gray-400 mx-4'>Procesos</NavLink>
                        <button type="button" className="ml-6 inline-flex items-center rounded-md border border-transparent bg-gray-600 px-5 py-1.5 text-base font-medium transition duration-800 text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                            Registrarse
                            <DotLoader className="ml-1 -mr-1 h-1 w-1" size={12} color='#f2f2f2' />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}
const mapStateToProps = state => ({});

export default connect(mapStateToProps, {})(Navbar);
