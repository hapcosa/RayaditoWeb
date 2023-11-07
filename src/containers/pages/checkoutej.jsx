import React, { useEffect } from 'react';
import { initMercadoPago, Wallet} from '@mercadopago/sdk-react';



const Checkout = ({}) => {
    useEffect(() => {
        initMercadoPago('TEST-64b6d678-f0bb-42b9-91c1-7454b77df5a6')
      }, []);
      initMercadoPago.preferenceId
      const Context = React.createContext({});
      const preferenceId = React.useContext(Context);
     return(
        <>
            <div>
                <Wallet initialization={{ preferenceId: preferenceId }} />
            </div>
        </>
     )
          
  
}
export default Checkout;