import React from "react";
import "./App.css";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

function App() {

  const [rzpKey, setRzpKey] = React.useState("");
  const [orderId, setOrderId] = React.useState("");

  async function showRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const options = {
      key: rzpKey,
      currency: "INR",
      order_id: orderId,
      name: "Test Payment",
      description: "Test Razorpay Payment",
      handler: function (response) {
        alert("Transaction successful");
      },
      prefill: {
        name: "Harsh",
        email: "harsh.smartters@gmail.com",
        phone_number: "9899999999",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <div className="App">
      <header className="App-header">
      <h3>Razorpay payment portal</h3>
      <p>RazorPay Key</p>
       <input type="text" value={rzpKey} onChange={(e) => setRzpKey(e.target.value)} />
       <br />
       <p>RazorPay Order Id</p>
        <input type="text" value={orderId} onChange={(e) => setOrderId(e.target.value)} />
        <br/>
        <button
          className="App-link"
          onClick={showRazorpay}
          target="_blank"
          rel="noopener noreferrer"
        >
          Pay now
        </button>
      </header>
    </div>
  );
}

export default App;
