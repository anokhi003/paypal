
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import React, { useState } from 'react';

import './App.css';

import PaypalForm from './jsx/Payment-form';

function App() {
  const [show, setShow] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const [orderId, setOrderId] = useState(false)


  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          description: 'This is the Book Worth 100$',
          amount: {
            currency_code: 'USD',
            value:30
          },
        },  
      ],
      application_context: {
        shipping_preference:'NO_SHIPPING'
      }
    })
      .then((orderID) => {
        setOrderId(orderID)
        return orderID
    })
  }

  const onApprove = (data,actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details
      setSuccess(true)
    })
  }

  const onError = (data, actions) => {
    setErrorMsg("An error occured with your payment")
  }
  return (
    <div className="App">
      <PayPalScriptProvider
        options={{
          "client-id": "AT7k2F5ClqJhRLr0BOARrflJD_7n-xp4o8_5iLLrgY8N8dVbHqSfTqVLz00lRuXTm2BCeRI8bxc7Jj7S",
        }} >

      <h1>Simple Book</h1>
      <span>$420</span>
      <button type="submit" onClick={() => setShow(true)}>Buy now</button>
      {show ? <>
        <PayPalButtons style={{ layout: "vertical" }} createOrder={createOrder}
          onApprove={onApprove}  onError={onError}
        />
      </> : ""}

      {success ? (
          <h1>Your Payment has been done successfully please check email</h1>
        ):<h2>payment is pending</h2>}
    </PayPalScriptProvider>
    </div>
  );
}

export default App;
