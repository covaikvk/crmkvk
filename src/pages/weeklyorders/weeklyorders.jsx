import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCalendarAlt, FaUserAlt, FaPhoneAlt } from "react-icons/fa";
import "./weeklyorders.css";

export default function WeeklyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("https://kvk-backend.onrender.com/api/customizemenu");
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err.response ? err.response.data : err.message);
        setError("Failed to load weekly orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading)
    return (
      <div className="weekly-loader">
        <div className="weekly-spinner"></div>
        <p>Loading Weekly Orders...</p>
      </div>
    );

  if (error) return <div className="weekly-error">{error}</div>;

  return (
    <div className="weekly-container">
      <div className="weekly-header">
        <h1 className="weekly-title">
          <FaCalendarAlt className="title-icon" /> Weekly Menu Orders
        </h1>
        <p className="weekly-subtitle">View all customer weekly meal plans</p>
      </div>

      {orders.length === 0 ? (
        <div className="empty-state">
          <h3>No Weekly Orders Found</h3>
        </div>
      ) : (
        <div className="orders-grid">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <FaUserAlt className="info-icon" />
                  <h2 className="customer-name">{order.name}</h2>
                </div>
                <div className="order-date">
                  <FaCalendarAlt />{" "}
                  {new Date(order.created_at).toLocaleDateString()}
                </div>
              </div>

              <div className="order-body">
                <div className="info-row">
                  <FaPhoneAlt className="icon" />
                  <span>{order.phone_number}</span>
                </div>
                <div className="info-row">
                  <span className="address">
                    {order.address_1}, {order.address_2}, {order.landmark},{" "}
                    {order.city}, {order.state} - {order.pincode}
                  </span>
                </div>

                <div className="days-section">
                  <h4>Weekly Menu</h4>
                  <div className="days-grid">
                    {[
                      "sunday",
                      "monday",
                      "tuesday",
                      "wednesday",
                      "thursday",
                      "friday",
                      "saturday",
                    ].map((day) => (
                      <div key={day} className="day-card">
                        <strong className="day-name">
                          {day.charAt(0).toUpperCase() + day.slice(1)}
                        </strong>
                        <div className="day-items">
                          {order[day] && Object.keys(order[day]).length > 0 ? (
                            Object.entries(order[day]).map(([key, val]) => (
                              <div key={key} className="menu-item">
                                <span className="menu-key">{key}:</span>{" "}
                                {typeof val === "object" && val !== null ? (
                                  <div className="menu-value">
                                    {val.meal && (
                                      <div>
                                        <b>Meal:</b> {val.meal}
                                      </div>
                                    )}
                                    {val.items && (
                                      <div>
                                        <b>Items:</b>{" "}
                                        {Array.isArray(val.items)
                                          ? val.items.join(", ")
                                          : val.items}
                                      </div>
                                    )}
                                  </div>
                                ) : (
                                  <span className="menu-value">{val}</span>
                                )}
                              </div>
                            ))
                          ) : (
                            <span className="empty-day">—</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="order-footer">
                <div className="total-row">
                  <span>Total:</span> <strong>₹{order.total}</strong>
                </div>
                <div className="total-row">
                  <span>GST:</span> <strong>₹{order.gst}</strong>
                </div>
                <div className="total-row grand-total">
                  <span>Grand Total:</span>{" "}
                  <strong>₹{order.grand_total}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
