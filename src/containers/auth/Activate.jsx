import Layout from "../../hocs/layout/layout";
import {Navigate, useParams} from "react-router-dom";
import {useState} from "react";
import { activate } from "../../redux/action/auth";
import { connect } from "react-redux";
import NavbarHero from "../../components/navigation/navbarheroiconv1";
import Footer from "../../components/navigation/footer";
import { Rings } from 'react-loader-spinner';
const Activate = ({
    activate, loading
}) => {
    const params = useParams();

    const [activated, setActivated] = useState(false);
    const activate_account = () => {
        const uid = params.uid
        const token = params.token
        activate(uid, token);
        setActivated(true)
    }
    if (activated && !loading)
        return <Navigate to='/' />;


    return (
        <Layout>
            <div className="max-w-7x1 mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-2-3xl mx-auto">
                {loading?
                    <button type="button" className=" mx-auto my-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <Rings color="#FFF" height={20} width={20} />
                    </button>:
                    <button onClick={activate_account} className=" mx-auto my-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Activa tu cuenta
                    </button>}
                </div>
            </div>
        </Layout>
    )
}
const mapStateToProps = state => ({
    loading: state.Auth.loading,
})
export default connect(mapStateToProps,{
   activate
})(Activate)
