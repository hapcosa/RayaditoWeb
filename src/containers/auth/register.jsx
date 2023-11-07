import {useEffect, useState} from "react";
import Footer from "../../components/navigation/footer";
import NavbarHero from "../../components/navigation/navbarheroiconv1";
import Layout from "../../hocs/layout/layout";
import logo from '/logorayadito1.png'
import { connect } from "react-redux";
import { signup } from "../../redux/action/auth";
import { Link, Navigate } from "react-router-dom";


function Register({
    signup
}) {


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        re_password: ''
    })
    const [accountCreated, setAccountCreated] = useState(false);
    const {
        first_name,
        last_name,
        email,
        password,
        re_password
    } = formData;

    const onChange = e => setFormData({...formData,[e.target.name]: e.target.value});
    const onSubmit = e => {
        e.preventDefault();
        console.log(formData);
        signup(
            first_name,
            last_name,
            email,
            password,
            re_password
        )
        setAccountCreated(true)
        console.log(accountCreated);
        window.scrollTo(0, 0);
    }
    if(accountCreated)
    return <><Navigate to="/"/></>


    return (

        <> 
            <Layout>
                <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                        <img className="mx-auto h-12 w-auto"
                            src={logo}
                            width={180}
                            alt="Workflow"/>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Registrate</h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            o{' '}
                            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                                ¿ya tienes una cuenta?
                            </Link>
                        </p>
                    </div>

                    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                            <form onSubmit={e=>onSubmit(e)} className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <div className="mt-1">
                                        <input  onChange={e=>onChange(e)} value={email} name="email" type="email" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Ingrese su nombre
                                    </label>
                                    <div className="mt-1">
                                        <input name="first_name" onChange={e=>onChange(e)} value={first_name} type="text" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="ape" className="block text-sm font-medium text-gray-700">
                                        Ingrese su apellido
                                    </label>
                                    <div className="mt-1">
                                        <input name="last_name" onChange={e=>onChange(e)} value={last_name} type="text" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Contraseña
                                    </label>
                                    <div className="mt-1">
                                        <input  value={password} onChange={e=>onChange(e)} name="password"  type="password" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="repassword" className="block text-sm font-medium text-gray-700">
                                        Confirma contraseña
                                    </label>
                                    <div className="mt-1">
                                        <input  value={re_password} onChange={e=>onChange(e)} name="re_password"  type="password" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                                    </div>
                                </div>
                                <div>
                                    <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        Sign in
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}
const mapStateToProps = state => ({

})
export default connect(mapStateToProps,{
    signup
})(Register)

