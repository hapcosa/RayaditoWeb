import Layout from "../hocs/layout/layout";
import {get_joyas_by_arrival} from "../redux/action/joyas";
import {get_piedras_by_arrival} from "../redux/action/piedras";
import {connect} from "react-redux";
import {useEffect} from "react";
import BannerPromo from '../components/home/banner';
import Product_arrival from "../components/home/Product_arrival";
const Home =({
    get_piedras_by_arrival,
    piedras_arrival,
    get_joyas_by_arrival,
    joyas_arrival,
})=>{
    useEffect(() => {
        window.scrollTo(0, 0);
        get_joyas_by_arrival()
        get_piedras_by_arrival()
    }, []);

    return (
        <>
            <Layout>
                <div className="mt-2">
                    <BannerPromo/>
                    <Product_arrival joyas={joyas_arrival}  piedras={piedras_arrival}/>
                </div>
            </Layout>
        </>
    )
}
const mapStateToProps = state => ({
    joyas_arrival: state.Joyas.joyas_arrival,
    piedras_arrival: state.Piedras.piedras_arrival})
export default connect(mapStateToProps, { get_joyas_by_arrival, get_piedras_by_arrival})(Home)
