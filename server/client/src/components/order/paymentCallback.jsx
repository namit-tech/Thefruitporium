// frontend callback handler
import React, { useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const paymentCallback = () => {
  const history = useHistory();

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      const { payment_id, order_id, signature } = new URLSearchParams(window.location.search);  // Extract query params
      try {
        const response = await axios.post('/verify-payment', { payment_id, order_id, signature });
        if (response.data.success) {
          alert("Payment Successful");
          history.push("/order-success");  // Redirect to a success page
        } else {
          alert("Payment Verification Failed");
          history.push("/order-failure");  // Redirect to a failure page
        }
      } catch (error) {
        console.error("Error verifying payment:", error);
      }
    };

    fetchPaymentStatus();
  }, [history]);

  return <div>Loading...</div>;
};

export default paymentCallback;
