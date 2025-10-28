import React, { useEffect, useState } from "react";
import logo from "../../assets/logo/logo1.png";
import {
  getTodaysSpecial,
  createTodaysSpecial,
  updateTodaysSpecial,
  deleteTodaysSpecial,
} from "./DashboardController";
import { motion, AnimatePresence } from "framer-motion";

export default function Dashboard() {
  const [specials, setSpecials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    image_url: "",
    type: "veg",
  });

  // Fetch all specials
  const fetchSpecials = async () => {
    try {
      const data = await getTodaysSpecial();
      setSpecials(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch today's specials.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpecials();
  }, []);

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const form = new FormData();
    form.append("image", file); // key = image

    try {
      const res = await fetch("https://kvk-backend.onrender.com/api/upload", {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      if (data.imageUrl) {
        setFormData((prev) => ({ ...prev, image_url: data.imageUrl }));
        // alert("Image uploaded successfully!");
      } else {
        alert("Failed to upload image");
      }
    } catch (err) {
      console.error(err);
      alert("Upload error");
    }
  };

  // Open Edit Modal
  const openEditModal = (item) => {
    if (!item || !item.id) return;
    setEditItem(item);
    setFormData({
      title: item.title || "",
      description: item.description || "",
      price:
        item.price !== undefined && item.price !== null
          ? item.price.toString()
          : "",
      image_url: item.image_url || "",
      type: item.type || "veg",
    });
    setShowModal(true);
  };

  // CREATE / EDIT
  const handleSave = async (e) => {
    e.preventDefault();
    const payload = { ...formData, price: Number(formData.price) };

    try {
      if (editItem && editItem.id) {
        // Edit
        const updated = await updateTodaysSpecial(editItem.id, payload);
        setSpecials((prev) =>
          prev.map((s) => (s.id === editItem.id ? updated : s))
        );
      } else {
        // Add
        const newItem = await createTodaysSpecial(payload);
        setSpecials((prev) => [...prev, newItem]);
      }

      setFormData({ title: "", description: "", price: "", image_url: "", type: "veg" });
      setEditItem(null);
      setShowModal(false);
      fetchSpecials(); // refresh list
    } catch (err) {
      console.error(err);
      alert("Failed to save special");
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    if (!id) return;
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await deleteTodaysSpecial(id);
      setSpecials((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete special");
    }
  };

  return (
    <div style={styles.dashboard}>
      <div style={styles.card}>
        <img src={logo} alt="Logo" style={styles.logo} />
        <h2 style={styles.title}>Welcome to Kandha Vilas Kitchen</h2>
        <p style={styles.subtitle}>Delicious food served with love ❤️</p>

        {/* Stats */}
        <div style={styles.stats}>
          <div style={styles.statBox}><h3>🍳 25</h3><p>Breakfast Items</p></div>
          <div style={styles.statBox}><h3>🍲 40</h3><p>Lunch Items</p></div>
          <div style={styles.statBox}><h3>🍽 30</h3><p>Dinner Items</p></div>
          <div style={styles.statBox}><h3>🥤 15</h3><p>Beverages</p></div>
        </div>

        {/* Today's Specials */}
        <div style={styles.specialSection}>
          <div style={styles.specialHeader}>
            <h2 style={styles.specialTitle}>⭐ Today’s Specials ⭐</h2>
            <button
              style={styles.addBtn}
              onClick={() => {
                setShowModal(true);
                setEditItem(null);
                setFormData({ title: "", description: "", price: "", image_url: "", type: "veg" });
              }}
            >
              + Add
            </button>
          </div>

          {loading && <p>Loading today's specials...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}

          <AnimatePresence>
            {specials.map((special) => (
              <motion.div
                key={special.id}
                style={styles.specialCard}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                whileHover={{ scale: 1.03, boxShadow: "0 12px 30px rgba(0,0,0,0.15)" }}
              >
                <img src={special.image_url} alt={special.title} style={styles.specialImg} />
                <div style={styles.specialInfo}>
                  <h3 style={styles.specialName}>{special.title}</h3>
                  <p style={styles.specialPrice}>Price: ₹{special.price}</p>
                  <p style={styles.specialDesc}>{special.description}</p>
                  <p>Type: {special.type}</p>
                  <div style={styles.buttonGroup}>
                    <button
                      style={{ ...styles.actionBtn, background: "#2980b9" }}
                      onClick={() => openEditModal(special)}
                    >
                      Edit
                    </button>
                    <button
                      style={{ ...styles.actionBtn, background: "#c0392b" }}
                      onClick={() => handleDelete(special.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Modal */}
        {showModal && (
          <div style={styles.modalBackdrop}>
            <div style={styles.modal}>
              <h2>{editItem ? "Edit Special" : "Add New Special"}</h2>
              <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <input
                  style={styles.modalInput}
                  type="text"
                  placeholder="Title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
                <input
                  style={styles.modalInput}
                  type="text"
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
                <input
                  style={styles.modalInput}
                  type="number"
                  placeholder="Price"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
                
                {/* Image Upload */}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={styles.modalInput}
                />
                {formData.image_url && (
                  <img
                    src={formData.image_url}
                    alt="Uploaded"
                    style={{ width: "100px", marginTop: "8px", borderRadius: "8px" }}
                  />
                )}

                <select
                  style={styles.modalSelect}
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                >
                  <option value="veg">Veg</option>
                  <option value="non-veg">Non-Veg</option>
                </select>
                <div style={styles.modalButtons}>
                  <button type="submit" style={{ ...styles.actionBtn, background: "#27ae60" }}>
                    {editItem ? "Save" : "Add"}
                  </button>
                  <button
                    type="button"
                    style={{ ...styles.actionBtn, background: "#c0392b" }}
                    onClick={() => {
                      setShowModal(false);
                      setEditItem(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}






 const styles = {
  dashboard: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f0f4f7, #d9e2ec)",
    padding: "30px",
    fontFamily: "'Poppins', sans-serif",
  },
  card: {
    background: "#fff",
    padding: "40px",
    borderRadius: "20px",
    textAlign: "center",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    width: "90%",
    maxWidth: "1100px",
    transition: "0.3s",
  },
  logo: {
    width: "160px",
    marginBottom: "15px",
    filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.2))",
  },
  title: {
    fontSize: "30px",
    fontWeight: "700",
    color: "#1b4332",
    marginBottom: "8px",
  },
  subtitle: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "35px",
    fontWeight: "500",
  },
  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "20px",
    marginBottom: "40px",
  },
  statBox: {
    background: "#e0f2f1",
    padding: "25px",
    borderRadius: "16px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    fontSize: "16px",
    fontWeight: "600",
    textAlign: "center",
    transition: "0.3s",
  },
  specialSection: {
    marginTop: "20px",
    textAlign: "left",
  },
  specialHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  specialTitle: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#ff6b35",
    letterSpacing: "1px",
  },
  addBtn: {
    background: "linear-gradient(135deg, #38b000, #4cc9f0)",
    color: "#fff",
    border: "none",
    padding: "10px 22px",
    fontSize: "15px",
    fontWeight: "600",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "0.3s",
    boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
  },
  specialCard: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    background: "#fff8f0",
    padding: "22px",
    borderRadius: "16px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
    marginBottom: "18px",
    transition: "0.3s",
    position: "relative",
  },
  specialCardHover: {
    transform: "scale(1.02)",
    boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
  },
  specialImg: {
    width: "220px",
    height: "160px",
    objectFit: "cover",
    borderRadius: "14px",
    border: "2px solid #ffd166",
  },
  specialInfo: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  specialName: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#1b4332",
  },
  specialPrice: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#06d6a0",
  },
  specialDesc: {
    fontSize: "15px",
    color: "#555",
    fontWeight: "500",
  },
  buttonGroup: {
    display: "flex",
    gap: "12px",
    marginTop: "12px",
  },
  actionBtn: {
    border: "none",
    padding: "8px 18px",
    fontSize: "14px",
    fontWeight: "600",
    borderRadius: "12px",
    cursor: "pointer",
    color: "#fff",
    transition: "0.3s",
    boxShadow: "0 4px 10px rgba(0,0,0,0.12)",
  },
  editBtn: {
    background: "#118ab2",
  },
  deleteBtn: {
    background: "#ef476f",
  },
  // ----- Modal Styles -----
  modalBackdrop: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.55)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
  modal: {
    background: "#fff",
    padding: "30px",
    borderRadius: "16px",
    width: "420px",
    maxWidth: "90%",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    boxShadow: "0 12px 28px rgba(0,0,0,0.25)",
    position: "relative",
  },
  modalInput: {
    padding: "12px 14px",
    fontSize: "15px",
    borderRadius: "12px",
    border: "1px solid #ccc",
    width: "100%",
    outline: "none",
    transition: "0.2s",
  },
  modalInputFocus: {
    borderColor: "#38b000",
    boxShadow: "0 0 6px rgba(56,176,0,0.3)",
  },
  modalSelect: {
    padding: "12px 14px",
    fontSize: "15px",
    borderRadius: "12px",
    border: "1px solid #ccc",
    width: "100%",
    outline: "none",
    cursor: "pointer",
    transition: "0.2s",
  },
  modalButtons: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "12px",
  },
  saveBtn: {
    background: "linear-gradient(135deg, #06d6a0, #118ab2)",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    fontSize: "15px",
    fontWeight: "600",
    borderRadius: "14px",
    cursor: "pointer",
    transition: "0.3s",
  },
  cancelBtn: {
    background: "#ef476f",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    fontSize: "15px",
    fontWeight: "600",
    borderRadius: "14px",
    cursor: "pointer",
    transition: "0.3s",
  },
};
