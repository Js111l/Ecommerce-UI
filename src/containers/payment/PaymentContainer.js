import React, { useEffect, useReducer, useRef, useState } from 'react';
import CheckoutForm from './CheckoutForm';
import FinancialTransactionsService from '../../services/FinancialTransactionsService';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import ProductService from '../../services/ProductService';
import AuthService from "../../services/AuthService";
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

 const stripePromise = loadStripe('${process.env.STRIPE_API_PUBLIC_KEY}'
    // `${process.env.STRIPE_API_PUBLIC_KEY}`
   );

const PaymentContainer = (props) => {
 
  const service = new FinancialTransactionsService();
  const [secret, setSecret] = useState('');
  const navigate = useNavigate()
  const { id } = useParams();

  const productService = new ProductService()
  const authService = new AuthService()
  const [user, setUser] = useState(authService.getUserFromToken())
  const [token,setToken]=useState('')
  const [orderId, setOrderId] = useState(undefined)
  const [UUID,setUUID] = useState(undefined)
  const hasFetchedData = useRef(false); // Track if data has been fetched

  const [intentModel, setIntentModel] = useState({
    client: {},
    amount: '',
    localCurrency: 'eur',
    products: []
  })


  useEffect(() => {
  
    if (hasFetchedData.current) return; // Skip if already fetched
    hasFetchedData.current = true;
  
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = '';
    };
  
    const fetchData = async () => {
      try {
        const intentId = sessionStorage.getItem(id) // id -> uuid

        const verifyResult = await authService.verifyPayToken();
        await verifyResult;
  
        props.setLoading(true);
        props.setMenuBar(false);
  
        if (!secret) {
          const response = await service.getClientSecretByUUID(intentId);
          setSecret(response.token);
          setOrderId(response.orderId);

          const uuid = uuidv4()
         
          setUUID(uuid);
        }

        window.onbeforeunload = handleBeforeUnload;
        props.setLoading(false);
      } catch (error) {
        props.setLoading(false);
        console.log("error", error);
      }
    };
  
    fetchData();
  
    return () => {
      window.onbeforeunload = null;
    };
  }, []);
  



  return (
    secret
    ?
    <Elements stripe={stripePromise} options={{
      clientSecret: secret,
      appearance: {
        theme: 'stripe'
      }
    }}>
      <CheckoutForm
        orderId={orderId}
        uuid={UUID}
      />
    </Elements> : null
  )

};

export default PaymentContainer;
