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
import CheckoutService from '../../services/CheckoutService';

 const stripePromise = loadStripe('${process.env.STRIPE_API_PUBLIC_KEY}'
    // `${process.env.STRIPE_API_PUBLIC_KEY}`
   );

const PaymentContainer = (props) => {
 
  const service = new FinancialTransactionsService();
  const [secret, setSecret] = useState('');
  const { id } = useParams();

  const authService = new AuthService()
  const [orderId, setOrderId] = useState(undefined)
  const [UUID,setUUID] = useState(undefined)
  const hasFetchedData = useRef(false); 
  const [cart, setCart]=useState(undefined)


  const checkoutService = new CheckoutService()
  const productService = new ProductService()

  const clearCart = async () => {
    const ids = cart?.products.map(x => x.product.id);
    try {
      const resp = await checkoutService.deleteProducts(ids)
      await resp
    } catch (err) {
      console.log(err)
      props.setLoading(false);
    }
  }


  const fetchCart = async () => {
    props.setLoading(true)
    try {
      const response = await productService.getCheckoutProducts();
      const json = await response.json();

      setCart(json);
      props.setLoading(false);
    } catch (error) {
      props.setLoading(false)
      console.log(error);
    }
  };


  useEffect(() => {
  
    if (hasFetchedData.current) return;
    hasFetchedData.current = true;
  
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = '';
    };
  
    const fetchData = async () => {
      try {
   
        const uuid = sessionStorage.getItem(id) // id -> uuid

        const verifyResult = await authService.verifyPayToken();
        await verifyResult;
  
        props.setLoading(true);
        props.setMenuBar(false);
  
        if (!secret) {
          const response = await service.getClientSecretByUUID(uuid);
          setSecret(response.token);
          setOrderId(response.orderId);         
          setUUID(uuid);
        }

        window.onbeforeunload = handleBeforeUnload;
        props.setLoading(false);
      } catch (error) {
        props.setLoading(false);
        console.log("error", error);
      }
    };
    props.setShowNewsletter(false)
    props.setShowFooter(false)

    
    fetchCart()
    clearCart()
    fetchData();
  
    return () => {
      window.onbeforeunload = null;
    };
  }, []);
  



  return (
    secret && cart
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
        cart={cart}
        currency={'zł'} //TODO hardcoded currency
      />
    </Elements> : null
  )

};

export default PaymentContainer;
