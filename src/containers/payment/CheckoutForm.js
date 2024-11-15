import { popoverClasses } from '@mui/material';
import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import FinancialTransactionsService from '../../services/FinancialTransactionsService';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import ProductCardContainer from '../ProductCardContainer';

const CheckoutForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const service = new FinancialTransactionsService();
  const cart = useState(1308)
  
  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();


    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: `http://localhost:3000/confirm/${props.orderId}?token=${props.uuid}?payment_intent=f4f4`,
      },
    });


    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  const formatMoney = (value) => {
    return (value / 100).toFixed(2);
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', borderRadius: '10px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}
    >
      <PaymentElement
      />
      <button type="submit" disabled={!stripe} style={{ marginTop: '20px', padding: '12px', width: '100%', backgroundColor: '#6772e5', color: '#fff', borderRadius: '6px', cursor: 'pointer' }}>
        {`Zapłać ${cart[0].totalPrice}`}
      </button>
    </form>
  );
};

export default CheckoutForm;