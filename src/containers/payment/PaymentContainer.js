import React, { useEffect, useReducer, useState } from 'react';
import CheckoutForm from './CheckoutForm';
import FinancialTransactionsService from '../../services/FinancialTransactionsService';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';


const stripePromise = loadStripe('');

const PaymentContainer = (props) => {
  const service = new FinancialTransactionsService();
  const [secret, setSecret] = useState(undefined);


  useEffect(() => {
    const fetchData = async () => {
      props.setMenuBar(false);
      props.setLoading(true)
      try {
        const response = await service.getClientSecret()
        setSecret(response.token)
        props.setLoading(false)
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  const options = {
    clientSecret: secret,
    appearance: {
      theme: 'stripe'
    }
  };

  return (secret ?
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements> : null
  )

};

export default PaymentContainer;
