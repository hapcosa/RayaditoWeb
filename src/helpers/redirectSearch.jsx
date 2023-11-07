import { Navigate, redirect, useNavigate } from "react-router-dom";

function redirectsearch(){
    console.log("redirect")
    return <div>
        <Navigate to="/search" />;
    </div>
}
export default redirectsearch;