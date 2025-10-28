// src/components/SideBar/Sidebar.js
import React from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaUtensils,
  FaPizzaSlice,
  FaCoffee,
  FaShoppingCart,
  FaConciergeBell,
} from "react-icons/fa";

export default function Sidebar() {
  return (
    <div style={styles.sidebar}>
      <h2 style={styles.logo}>Kandha Vilas Kitchen</h2>

      <ul style={styles.menu}>
        {/* Dashboard */}
        <li style={styles.menuItem}>
          <Link to="/" style={styles.link}>
            <FaHome style={styles.icon} /> Dashboard
          </Link>
        </li>

        {/* Food Menu */}
        <li style={styles.menuItem}>
          <Link to="/foodlist" style={styles.link}>
            <FaUtensils style={styles.icon} /> Food Menu
          </Link>
        </li>

    

        {/* Orders */}
        <li style={styles.menuItem}>
          <Link to="/orders" style={styles.link}>
            <FaShoppingCart style={styles.icon} /> Orders
          </Link>
        </li>


        <li style={styles.menuItem}>
  <Link to="/quotations" style={styles.link}>
    <FaConciergeBell style={styles.icon} /> Quotations
  </Link>
</li>

       <li style={styles.menuItem}>
  <Link to="/weekly menu" style={styles.link}>
    <FaConciergeBell style={styles.icon} /> Weekly menu
  </Link>
</li>



 <li style={styles.menuItem}>
  <Link to="/videos" style={styles.link}>
    <FaConciergeBell style={styles.icon} /> videos
  </Link>
</li>



       <li style={styles.menuItem}>
  <Link to="/weekly menu orders" style={styles.link}>
    <FaConciergeBell style={styles.icon} /> Weekly Menu Orders
  </Link>
</li>
        {/* Our Food Services */}
        <li style={styles.menuItem}>
          <Link to="/ourfoodservices" style={styles.link}>
            <FaConciergeBell style={styles.icon} /> Our Food Services
          </Link>
        </li>
      </ul>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "250px",
    height: "100vh",
    background: "linear-gradient(180deg, #145a32, #0b3d0b)",
    color: "#ecf0f1",
    padding: "20px",
    position: "fixed",
    top: 0,
    left: 0,
    boxShadow: "2px 0 10px rgba(0,0,0,0.2)",
  },
  logo: {
    marginBottom: "40px",
    fontSize: "22px",
    fontWeight: "bold",
    textAlign: "center",
    borderBottom: "2px solid #27ae60",
    paddingBottom: "15px",
    letterSpacing: "1px",
  },
  menu: {
    listStyle: "none",
    padding: 0,
  },
  menuItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px 15px",
    margin: "8px 0",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  link: {
    textDecoration: "none",
    color: "#ecf0f1",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    width: "100%",
  },
  icon: {
    fontSize: "18px",
  },
};
