import { useContext, useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { AuthContext } from "../provider/AuthProvider";
import { useParams } from "react-router-dom";

const PaymentForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useContext(AuthContext);
  const { contestId } = useParams();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(false);
    } else {
      setError("User is not authenticated");
      setLoading(false);
    }
  }, [user]);

  const confirmPayment = async (paymentIntentId, email, name, photoURL, userId, contestId) => {
    try {
      const response = await fetch('https://contesthub-server-gules.vercel.app/confirm-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentIntentId,
          email,
          name,
          photoURL,
          userId,
          contestId,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Participation saved successfully:', data);
      } else {
        console.error('Payment confirmation failed:', data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const { data: clientSecret } = await axios.post("https://contesthub-server-gules.vercel.app/create-payment-intent", {
        amount: 1000,
        email: user.email,
        name: user.displayName,
        photoURL: user.photoURL,
      });

      const paymentResult = await stripe.confirmCardPayment(clientSecret.clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: user.displayName,
            email: user.email,
          },
        },
      });

      if (paymentResult.error) {
        setError(paymentResult.error.message);
      } else {
        if (paymentResult.paymentIntent.status === "succeeded") {
          setSuccess("Payment succeeded!");
          confirmPayment(paymentResult.paymentIntent.id, user.email, user.displayName, user.photoURL, user.uid, contestId);
        }
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-600 mb-4">{error}</div>;
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Payment Form</h2>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {success && <div className="text-green-600 mb-4">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={user.email}
            readOnly
            className="input input-bordered w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={user.displayName}
            readOnly
            className="input input-bordered w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Photo URL</label>
          <input
            type="text"
            value={user.photoURL}
            readOnly
            className="input input-bordered w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Card Details</label>
          <CardElement className="p-2 border rounded" />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={!stripe}
        >
          Pay
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
