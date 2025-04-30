import ETHIcon from "../assets/images/ETH.svg";
import {
  confirmModelCreditPayment,
  confirmPayment,
  createPaymentOrder,
  paymentGateway,
} from "../api/services/PaymentService";

export async function displayRazorpay(
  userid,
  setLoading,
  confirmState,
  isInvestor,
  amountContext,
  expiryDate
) {
  const secretToken = localStorage.getItem("secretToken");
  const mobileNumber = localStorage.getItem("mobileNumber");

  const paymentOrderData = await paymentGateway(
    setLoading,
    { id: userid },
    { secretToken, mobileNumber },
    isInvestor ? "investor" : "advisor"
  );

  const customerOrderSelected = paymentOrderData[amountContext];

  const options = {
    key: "rzp_live_Ha9IisQMjay8tQ",
    currency: customerOrderSelected.currency,
    amount: customerOrderSelected.amount,
    desciption: "Wallet Transaction",
    image: { ETHIcon },
    order_id: customerOrderSelected.id,
    handler: function (response) {
      if (!response) return;
      (async () => {
        const data = await confirmPayment(
          setLoading,
          isInvestor
            ? {
                investorId: userid,
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                ...(expiryDate ? { expiryDate } : {}),
              }
            : {
                userId: userid,
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                ...(expiryDate ? { expiryDate } : {}),
              },
          { mobileNumber, secretToken },
          isInvestor ? "investor" : "advisor"
        );
        confirmState?.(true);
        console.log("payment status", data);
      })();
    },
    // prefill: {
    //   name: "Subir Singh",
    //   email: "subir@gmail.com",
    //   contact: "1234567893",
    // },
  };

  // displaying the window
  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
}

export async function displayRazorpayForSpecificAmount(
  userid,
  amount,
  setLoading,
  setConfirmState,
  expiryDate
) {
  const paymentOrderData = await createPaymentOrder(setLoading, {
    userId: userid,
    amount: amount,
  });

  const options = {
    key: "rzp_live_Ha9IisQMjay8tQ",
    currency: paymentOrderData.currency,
    amount: paymentOrderData.amount,
    desciption: "Wallet Transaction",
    image: { ETHIcon },
    order_id: paymentOrderData.id,
    handler: function (response) {
      if (!response) return;
      (async () => {
        try {
          const data = await confirmModelCreditPayment(setLoading, {
            userId: userid,
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            ...(expiryDate ? { expiryDate } : {}),
          });
          setConfirmState?.(true);
        } catch (err) {
          console.error("Payment confirmation error:", err);
        }
      })();
    },
  };

  // displaying the window
  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
}
