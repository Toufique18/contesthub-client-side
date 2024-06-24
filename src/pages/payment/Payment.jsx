import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from '../PaymentForm';

const stripePromise = loadStripe('pk_test_51PU5HICpLXSSbdQWZATCo9aAcghNturaBe0nbMMQTxiItm3Xc51lKLPmFuGZrenlxrlQ45ktICCCPnwPusIeB4vM00TI0UHRFW');

const Payment = () => {
    const amount = 20; // Replace this with dynamic amount as needed

    return (
        <Elements stripe={stripePromise}>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Payment</h1>
                <PaymentForm amount={amount} />
            </div>
        </Elements>
    );
};

export default Payment;
