import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

const Success = () => {
  const location = useLocation();
  const cart = location.state;
  console.log(location.state);
  // const data = location.state.stripeData;
  // const cart = useSelector((state) => state.cart);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);
  const TOKEN = currentUser?.accessToken;
  const headers = { token: `Bearer ${TOKEN}` };

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/orders",
          {
            userId: currentUser._id,
            products: cart.products.map((item) => ({
              productId: item._id,
              quantity: item.quantity,
            })),
            amount: cart.total,
            address: "Test Address",
            // address: data.billing_details.address,
          },
          { headers }
        );
        setOrderId(res.data._id);
      } catch {}
    };
    //data &&
    currentUser && cart && createOrder();
    // eslint-disable-next-line
  }, []);
  // cart, currentUser, headers
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Invalid request`}
      <Link to="/">
        <button style={{ padding: 10, marginTop: 20 }}>Go to Homepage</button>
      </Link>
    </div>
  );
};

export default Success;
