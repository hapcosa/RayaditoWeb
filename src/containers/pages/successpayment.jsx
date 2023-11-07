import { connect } from 'react-redux'
import Layout from "../../hocs/layout/layout";
import { statuspayment } from '../../redux/action/payment'
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react'

const Success =(statuspayment, payment_state ) =>{
    const [checked, setChecked] = useState(false);
    const navigate = useNavigate();
    const params = useParams();
    const merchantId = params.merchant_id
    const paymentId = params.payment_id
    const externalReference = params.external_reference
    console.log(paymentId + externalReference + merchantId)
    useEffect(() => {
        window.scrollTo(0,0)
        statuspayment(merchantId, paymentId, externalReference)
    }, [])
    const check = () =>{
        setChecked(true)
    }
    if(checked){
        navigate('/dashboard')
    }
    const status_message = () => {
        if(payment_state ==="rechazado"){
            return (
                <> <div className="pt-32 text-red-900">
                Pago rechazado
            </div></>
               
            )
        }else if(payment_state ==="aprobado"){
            return (
                <> <div className="pt-32 text-green-900 ">
                Pago Aprobado
                <button onClick={check} className=" mx-auto my-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Activa tu cuenta
                    </button>
                </div></>
            )
        }
        else if(payment_state ==="cancelado"){
            return (
                <> <div className="pt-32 text-green-900 ">
                Pago cancelado
                </div></>
            )
        }
    }
    return(
        <Layout>
                <div className="pt-32">
                   {status_message()}
                </div>
        </Layout>
    )
}
const mapStateToProps = state => ({
    payment_state: state.Payment.status
})

export default connect(mapStateToProps,{
    statuspayment
}) (Success)