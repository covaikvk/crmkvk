import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch all orders
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://kvk-backend.onrender.com/api/orders");
      setOrders(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ✅ Update order status (Confirm)
  const updateOrderStatus = async (orderId, status) => {
    try {
      await axios.put(`https://kvk-backend.onrender.com/api/orders/${orderId}`, {
        order_status: status,
      });
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, order_status: status } : order
        )
      );
      alert(`✅ Order marked as ${status}`);
    } catch (err) {
      console.error("Error updating order status:", err);
      alert("❌ Failed to update order status");
    }
  };

  // ✅ Update payment status (Mark as Paid)
  const updatePaymentStatus = async (orderId, paymentStatus) => {
    try {
      await axios.put(`https://kvk-backend.onrender.com/api/orders/${orderId}`, {
        payment_status: paymentStatus,
      });
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId
            ? { ...order, payment_status: paymentStatus }
            : order
        )
      );
      alert(`💰 Payment marked as ${paymentStatus}`);
    } catch (err) {
      console.error("Error updating payment status:", err);
      alert("❌ Failed to update payment status");
    }
  };

  if (loading)
    return (
      <p style={{ marginLeft: "270px", padding: "20px", fontFamily: "Arial" }}>
        Loading orders...
      </p>
    );

  return (
    <div
      style={{
        marginLeft: "270px",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ marginBottom: "20px", color: "#145a32" }}>Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>User</th>
              <th style={thStyle}>Phone</th>
              <th style={thStyle}>Address</th>
              <th style={thStyle}>Total</th>
              <th style={thStyle}>Order Status</th>
              <th style={thStyle}>Payment Status</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td style={tdStyleCenter}>{order.id}</td>
                <td style={tdStyle}>{order.user_name}</td>
                <td style={tdStyle}>{order.user_phone}</td>
                <td style={tdStyle}>
                  {order.address_1}, {order.address_2 ? order.address_2 + ", " : ""}
                  {order.city}, {order.state}, {order.pincode}
                </td>
                <td style={tdStyleCenter}>₹{order.total_amount}</td>

                {/* ✅ Order Status */}
                <td
                  style={{
                    ...tdStyleCenter,
                    color:
                      order.order_status === "Confirmed"
                        ? "green"
                        : "orange",
                    fontWeight: "bold",
                  }}
                >
                  {order.order_status}
                </td>

                {/* ✅ Payment Status */}
                <td
                  style={{
                    ...tdStyleCenter,
                    color:
                      order.payment_status === "Paid" ? "green" : "orange",
                    fontWeight: "bold",
                  }}
                >
                  {order.payment_status}
                </td>

                {/* ✅ Action Buttons */}
                <td style={tdStyleCenter}>
                  {/* Confirm */}
                  <button
                    style={{
                      ...btnStyle,
                      background: "#2980b9",
                      cursor:
                        order.order_status === "Confirmed"
                          ? "not-allowed"
                          : "pointer",
                    }}
                    onClick={() => updateOrderStatus(order.id, "Confirmed")}
                    disabled={order.order_status === "Confirmed"}
                  >
                    {order.order_status === "Confirmed"
                      ? "Confirmed ✅"
                      : "Confirm"}
                  </button>

                  {/* Mark as Paid */}
                  <button
                    style={{
                      ...btnStyle,
                      background: "#8e44ad",
                      cursor:
                        order.payment_status === "Paid"
                          ? "not-allowed"
                          : "pointer",
                    }}
                    onClick={() => updatePaymentStatus(order.id, "Paid")}
                    disabled={order.payment_status === "Paid"}
                  >
                    {order.payment_status === "Paid"
                      ? "Paid 💰"
                      : "Mark Paid"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// ✅ Inline Styles
const thStyle = {
  border: "1px solid #ddd",
  padding: "10px",
  background: "#27ae60",
  color: "#fff",
  textAlign: "center",
};

const tdStyle = {
  border: "1px solid #ddd",
  padding: "10px",
};

const tdStyleCenter = {
  ...tdStyle,
  textAlign: "center",
};

const btnStyle = {
  padding: "6px 10px",
  margin: "4px",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  fontSize: "13px",
  fontWeight: "bold",
};

export default Orders;
