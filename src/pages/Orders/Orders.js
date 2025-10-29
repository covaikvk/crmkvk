import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Orders.css";
import { FaUser, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { MdShoppingBag } from "react-icons/md";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all orders
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://kvk-backend.onrender.com/api/orders");
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
      alert("Failed to load orders (check console/network).");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Update Order Status
  const updateOrderStatus = async (orderId, status) => {
    try {
      await axios.put(`https://kvk-backend.onrender.com/api/orders/${orderId}`, {
        order_status: status,
      });
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, order_status: status } : o))
      );
    } catch (err) {
      console.error("Error updating order:", err);
      alert("Failed to update order status.");
    }
  };

  // Update Payment Status
  const updatePaymentStatus = async (orderId, paymentStatus) => {
    try {
      await axios.put(`https://kvk-backend.onrender.com/api/orders/${orderId}`, {
        payment_status: paymentStatus,
      });
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, payment_status: paymentStatus } : o))
      );
    } catch (err) {
      console.error("Error updating payment:", err);
      alert("Failed to update payment status.");
    }
  };

  if (loading)
    return (
      <div className="orders-loader">
        <div className="orders-spinner" />
        <p>Loading orders...</p>
      </div>
    );

  return (
    <div className="orders-container">
      <h1 className="orders-title">
        <MdShoppingBag className="title-icon" /> Orders Management
      </h1>

      {orders.length === 0 ? (
        <p className="empty-state">No orders found.</p>
      ) : (
        <div className="orders-grid">
          {orders.map((order) => {
            let parsedItems = [];
            try {
              parsedItems =
                typeof order.items === "string" ? JSON.parse(order.items) : order.items || [];
            } catch {
              parsedItems = [];
            }

            return (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <div className="order-info">
                    <FaUser className="info-icon" />
                    <span className="customer-name">{order.name}</span>
                  </div>
                  <span className="order-id">#{order.id}</span>
                </div>

                <div className="order-body">
                  <div className="info-row">
                    <FaPhone className="icon" />
                    <span>{order.phone_number}</span>
                  </div>

                  <div className="info-row">
                    <FaMapMarkerAlt className="icon" />
                    <span>
                      {order.address_line_1 || order.address_1},{" "}
                      {order.city}, {order.state}, {order.pincode}
                    </span>
                  </div>

                  <div className="items-section">
                    <h4>Items</h4>
                    {parsedItems.length > 0 ? (
                      <ul className="items-list">
                        {parsedItems.map((item, i) => (
                          <li key={i}>
                            {item.item_name || item.name} × {item.quantity} — ₹{item.price}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="empty-items">No items</p>
                    )}
                  </div>
                </div>

                <div className="order-footer">
                  <div className="status-row">
                    <strong>Order:</strong>{" "}
                    <span
                      className={`status-badge ${
                        order.order_status === "Confirmed" ? "confirmed" : "pending"
                      }`}
                    >
                      {order.order_status}
                    </span>
                  </div>
                  <div className="status-row">
                    <strong>Payment:</strong>{" "}
                    <span
                      className={`status-badge ${
                        order.payment_status === "Paid" ? "paid" : "unpaid"
                      }`}
                    >
                      {order.payment_status}
                    </span>
                  </div>

                  <div className="total-row">
                    <strong>Total:</strong> ₹{order.total_amount}
                  </div>

                  <div className="button-row">
                    <button
                      className="btn confirm"
                      onClick={() => updateOrderStatus(order.id, "Confirmed")}
                      disabled={order.order_status === "Confirmed"}
                    >
                      {order.order_status === "Confirmed" ? "Confirmed ✅" : "Confirm"}
                    </button>

                    <button
                      className="btn paid"
                      onClick={() => updatePaymentStatus(order.id, "Paid")}
                      disabled={order.payment_status === "Paid"}
                    >
                      {order.payment_status === "Paid" ? "Paid 💰" : "Mark Paid"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Orders;
