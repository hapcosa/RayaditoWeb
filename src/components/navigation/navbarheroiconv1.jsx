import {Fragment, useEffect, useState} from 'react'
import {Menu, Popover, Transition} from '@headlessui/react'
import {Link, Navigate, useNavigate} from 'react-router-dom'
import logo from '/logorayadito1.png'
import logoperfil from '/LogoPrincipal.png'
import {connect} from 'react-redux'

import Alert from '../alert';
import {logout} from '../../redux/action/auth'
import {get_categories, get_categories_piedras} from '../../redux/action/categories'
import {get_search_products} from '../../redux/action/products'
import SearchBox from './searchbox'
import {ShoppingBagIcon, Bars4Icon, XMarkIcon} from '@heroicons/react/24/outline'
import React from "react";


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function NavbarHero({
    isAuthenticated,
    user,
    logout,
    get_categories_piedras,
    categories,
    get_categories,
    categories_piedras,
    get_search_products,
    total_items

}) {
    const [redirect, setRedirect] = useState(false);
    const [render, setRender] = useState(false);
    const [formData, setFormData] = useState({category_id: 0, search: ''})

    const {category_id, search} = formData

    useEffect(() => {
        window.scrollTo(0, 0);
        get_categories_piedras()
        get_categories()
        window.addEventListener(
          "resize",
          () => window.innerWidth >= 960 && setOpenNav(false))
    }, []);

    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
    const [openNav, setOpenNav] = useState(false);
    const navigate = useNavigate();
    const onSubmit = e => {
        e.preventDefault();
        get_search_products(search, category_id);
        setRender(!render);
        navigate('/search')
    }


    const logouthandler = () => {
        logout();
        navigate('/')
    }
    if (redirect) {
        return <Navigate to='/'/>;
    }


    const authLinks = (
        <>
      <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center w-full border-gray-300 rounded-full bg-white text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500">
        <span className="inline-block h-10 w-10 rounded-full overflow-hidden bg-gray-100">
          <img
          src={logoperfil}>

          </img>
        </span>
        </Menu.Button>
      </div>

      <Transition 
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/dashboard"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Perfil
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Ayuda
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Terminos
                </a>
              )}
            </Menu.Item>
            <form method="POST" action="#">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={logouthandler}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full text-left px-4 py-2 text-sm'
                    )}
                  >
                    Logout
                  </button>
                )}
              </Menu.Item>
            </form>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
    </>
  )
    const guestLinks = (
      <div>
      <div className='hidden md:flex'>
        <Fragment>
            <Link to="/login" className="text-base font-medium text-gray-500 hover:text-gray-700">
                Login
            </Link>
            <Link to="/register" className="ml-3 inline-flex items-center px-1  justify-center border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gray-600 hover:bg-gray-700">
                Registrarse
            </Link>
        </Fragment>
      </div>
      <Menu as="div" className="md:hidden flex text-left">
      <div>
        <Menu.Button className="inline-flex justify-center w-full border-gray-300 rounded-full bg-white text-sm font-medium text-gray-700 focus:outline-none focus:ring-3 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500">
        <span className="inline-block h-10 w-10 rounded-full overflow-hidden bg-gray-100">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>

        </span>
        </Menu.Button>
      </div>

      <Transition 
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link to="/login"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Login
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link to="/register"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Registrarse
                </Link>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
      </div>
      
    )

    return (
        <>
            <Popover className="relative bg-gray-200">
                <div className="absolute inset-0 shadow z-30 pointer-events-none" aria-hidden="true"/>
                <div className="relative z-20">
                    <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-5 sm:px-6 sm:py-4 lg:px-8 md:justify-start md:space-x-10">
                        <div>
                            <a href="/" className="flex">
                                <span className="sr-only">Workflow</span>
                                <img src={logo}
                                    width={136}
                                    alt=""/>
                            </a>
                        </div>
                        <div className="mr-2 my-2 md:hidden flex">
                            <Link to='/cart' className="bg-gray-200 rounded-md p-1 mr-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-300">
                                <ShoppingBagIcon className='mr-2 h-7 w-7 text-gray-700 rounded-full'/>
                                <span className="text-xs absolute top-3 mt-3 ml-4 bg-red-500 text-white font-semibold rounded-full px-1 text-center">{total_items}</span>
                            </Link>
                            <Popover.Button className=" bg-gray-200 rounded-md p-1 mr-4 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                <span className="sr-only">Open menu</span>
                                <Bars4Icon className="h-6 w-6" aria-hidden="true"/>
                            </Popover.Button>
                            {
                                isAuthenticated ? authLinks : guestLinks
                            }
                        </div>
                        <div className="hidden md:flex-1 md:flex md:items-center md:justify-between">
                            <Popover.Group as="nav" className="flex space-x-10">
                                <Link to="/joyas" className="mt-4 text-base font-medium text-gray-500 hover:text-gray-700">
                                    Joyas
                                </Link>
                                <Link to="/piedras" className=" mt-4 text-base font-medium text-gray-500 hover:text-gray-700">
                                    Piedras
                                </Link>
                                <SearchBox search={search}
                                    onChange={onChange}
                                    onSubmit={onSubmit}
                                    categories={categories}
                                    categories_piedras={categories_piedras}/>

                            </Popover.Group>
                            <div className="flex items-center md:ml-12">
                                <Link to='/cart'>
                                    <ShoppingBagIcon className='mr-3 h-7 w-7 text-gray-700 rounded-full'/>
                                    <span className="text-xs absolute top-3 mt-3 ml-4 bg-red-500 text-white font-semibold rounded-full px-1 text-center">{total_items}</span>
                                </Link>
                                {
                                isAuthenticated ? authLinks : guestLinks
                            } </div>
                        </div>
                    </div>
                </div>

                <Transition as={Fragment}
                    enter="duration-200 ease-out"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="duration-100 ease-in"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95">
                    <Popover.Panel focus className="absolute z-30 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
                        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                            <div className="pt-5 pb-6 px-5 sm:pb-8">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <img className="h-8 w-auto"
                                            src={logo}
                                            alt="Workflow"/>
                                    </div>
                                    <div className="-mr-2">
                                        <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                            <span className="sr-only">Close menu</span>
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true"/>
                                        </Popover.Button>
                                    </div>
                                </div>
                                <div className="mt-6 sm:mt-8">
                                    <nav>
                                        <div className="grid gap-7 sm:grid-cols-2 sm:gap-y-8 sm:gap-x-4">
                                            <SearchBox search={search}
                                              onChange={onChange}
                                              onSubmit={onSubmit}
                                              categories={categories}
                                              categories_piedras={categories_piedras}/>
                                            <Link to="/joyas" className="-m-3 flex items-center p-3 rounded-lg hover:bg-gray-80">
                                                <div className="ml-4 text-base font-medium text-gray-600  hover:text-gray-700">Joyas</div>
                                            </Link>
                                            <Link to="/piedras" className="-m-3 flex items-center p-3 rounded-lg hover:bg-gray-80">
                                                <div className="ml-4 text-base font-medium text-gray-600 hover:text-gray-700">Piedras</div>
                                            </Link>
                                        </div>
                                        <div className="mt-8 text-base">
                                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                                {' '}
                                                Ver todos las creaciones
              
                                            </a>
                                        </div>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </Popover.Panel>
                </Transition>
            </Popover>
            <Alert/>
        </>
    )
}
const mapStateToProps = state => ({
    isAuthenticated: state.Auth.isAuthenticated,
    user: state.Auth.user,
    categories: state.Categories.categories,
    categories_piedras: state.Categories.categories_piedras,
    search_products: state.Products.search_products,
    items: state.Cart.items,
    total: state.Cart.amount,
    total_items: state.Cart.total_items,
})

export default connect(mapStateToProps, {logout, get_categories, get_categories_piedras, get_search_products})(NavbarHero)
