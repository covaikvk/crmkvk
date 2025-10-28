// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import {
//   createMenu,
//   deleteMenu,
//   getMenusByMenuId,
//   updateMenu,
// } from "./menuDetailController";

// export default function MenuDetail() {
//   const { id } = useParams();
//   const [menus, setMenus] = useState([]);
//   const [isEditing, setIsEditing] = useState(false);
//   const [isAdding, setIsAdding] = useState(false);
//   const [formData, setFormData] = useState({
//     menuname_id: "",
//     title: "",
//     description: "",
//     price: "",
//     type: "",
//     image_url: "",
//   });
//   const [uploading, setUploading] = useState(false);

//   // Fetch menus by menuname_id
//   useEffect(() => {
//     const fetchMenus = async () => {
//       try {
//         const res = await getMenusByMenuId(id);
//         setMenus(res || []);
//       } catch (err) {
//         console.error("Failed to fetch menus:", err);
//       }
//     };
//     fetchMenus();
//   }, [id]);

//   // Input change
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Image upload
//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setUploading(true);
//     const form = new FormData();
//     form.append("image", file);

//     try {
//       const res = await fetch("https://kvk-backend.onrender.com/api/upload", {
//         method: "POST",
//         body: form,
//       });
//       const data = await res.json();
//       // Ensure full URL is used
//       const imageUrl = data.imageUrl.startsWith("http")
//         ? data.imageUrl
//         : `https://kvk-backend.onrender.com${data.url}`;
//       setFormData((prev) => ({ ...prev, image_url: imageUrl }));
//     } catch (err) {
//       console.error("Image upload failed:", err);
//       alert("Image upload failed ❌");
//     } finally {
//       setUploading(false);
//     }
//   };

//   // Add or Update menu
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (uploading) {
//       alert("Please wait, image is still uploading...");
//       return;
//     }

//     try {
//       if (isEditing) {
//         const updated = await updateMenu(formData.id, formData);
//         // Update menu in local state without refreshing
//         setMenus((prev) =>
//           prev.map((m) => (m.id === formData.id ? updated : m))
//         );
//         alert("✅ Menu updated successfully");
//       } else if (isAdding) {
//         const created = await createMenu(formData);
//         setMenus((prev) => [...prev, created]);
//         alert("✅ Menu added successfully");
//       }
//       setIsEditing(false);
//       setIsAdding(false);
//       setFormData({
//         menuname_id: "",
//         title: "",
//         description: "",
//         price: "",
//         type: "",
//         image_url: "",
//       });
//     } catch (err) {
//       console.error("Error saving menu:", err);
//       alert(err.response?.data?.message || "Failed to save menu ❌");
//     }
//   };

//   // Delete menu
//   const handleDelete = async (menuId) => {
//     if (window.confirm("Are you sure you want to delete this menu?")) {
//       try {
//         await deleteMenu(menuId);
//         setMenus((prev) => prev.filter((m) => m.id !== menuId));
//         alert("❌ Menu deleted successfully");
//       } catch (err) {
//         console.error("Failed to delete menu:", err);
//       }
//     }
//   };

//   // Edit menu
//   const handleEdit = (menu) => {
//     setIsEditing(true);
//     setFormData(menu);
//   };

//   return (
//     <div style={{ padding: "30px", maxWidth: "800px", margin: "auto" }}>
//       {(isEditing || isAdding) && (
//         <form onSubmit={handleSubmit} style={styles.form}>
//           <input
//             type="text"
//             name="menuname_id"
//             value={formData.menuname_id}
//             placeholder="Menu Name ID (required)"
//             onChange={handleChange}
//             style={styles.input}
//             required
//           />
//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             placeholder="Title"
//             onChange={handleChange}
//             style={styles.input}
//             required
//           />
//           <textarea
//             name="description"
//             value={formData.description}
//             placeholder="Description"
//             onChange={handleChange}
//             style={styles.textarea}
//           />
//           <input
//             type="number"
//             name="price"
//             value={formData.price}
//             placeholder="Price"
//             onChange={handleChange}
//             style={styles.input}
//             required
//           />
//           <input
//             type="text"
//             name="type"
//             value={formData.type}
//             placeholder="Type"
//             onChange={handleChange}
//             style={styles.input}
//           />
//           <input type="file" onChange={handleImageUpload} style={styles.input} />
//           {uploading && <p>Uploading image... ⏳</p>}
//           {formData.image_url && (
//             <img src={formData.image_url} alt="Preview" style={{ width: "100px", marginBottom: "10px" }} />
//           )}
//           <button type="submit" style={styles.saveBtn}>
//             {isEditing ? "Update Menu" : "Add Menu"}
//           </button>
//           <button
//             type="button"
//             onClick={() => { setIsEditing(false); setIsAdding(false); setFormData({ menuname_id: "", title: "", description: "", price: "", type: "", image_url: "" }); }}
//             style={styles.cancelBtn}
//           >
//             Cancel
//           </button>
//         </form>
//       )}

//       <div>
//         {menus.map((menu) => (
//           <div key={menu.id} style={styles.card}>
//             <h2>{menu.title}</h2>
//             {menu.image_url ? (
//               <img
//                 src={menu.image_url.startsWith("http") ? menu.image_url : `https://kvk-backend.onrender.com${menu.image_url}`}
//                 alt={menu.title}
//                 style={styles.image}
//               />
//             ) : (
//               <p>No image available</p>
//             )}
//             <p><strong>Description:</strong> {menu.description}</p>
//             <p><strong>Price:</strong> ₹{menu.price}</p>
//             <p><strong>Type:</strong> {menu.type}</p>
//             <p><strong>Menu ID:</strong> {menu.menuname_id}</p>
//             <div style={{ marginTop: "10px" }}>
//               <button onClick={() => handleEdit(menu)} style={styles.editBtn}>✏️ Edit</button>
//               <button onClick={() => handleDelete(menu.id)} style={styles.deleteBtn}>🗑 Delete</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// const styles = {
//   card: { background: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)", marginBottom: "20px" },
//   image: { width: "100%", borderRadius: "12px", marginBottom: "15px" },
//   form: { display: "flex", flexDirection: "column", gap: "10px" },
//   input: { padding: "10px", borderRadius: "6px", border: "1px solid #ccc" },
//   textarea: { padding: "10px", borderRadius: "6px", border: "1px solid #ccc" },
//   saveBtn: { background: "#27ae60", color: "#fff", padding: "12px", border: "none", borderRadius: "6px", cursor: "pointer" },
//   cancelBtn: { background: "#7f8c8d", color: "#fff", padding: "10px", marginTop: "10px", border: "none", borderRadius: "6px", cursor: "pointer" },
//   editBtn: { background: "#2980b9", color: "#fff", padding: "10px", marginRight: "10px", border: "none", borderRadius: "6px", cursor: "pointer" },
//   deleteBtn: { background: "#c0392b", color: "#fff", padding: "10px", border: "none", borderRadius: "6px", cursor: "pointer" },
// };




import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  createMenu,
  deleteMenu,
  getMenusByMenuId,
  updateMenu,
} from "./menuDetailController";

export default function MenuDetail() {
  const { id } = useParams();
  const [menus, setMenus] = useState([]);
  const [filteredMenus, setFilteredMenus] = useState([]);
  const [filterType, setFilterType] = useState("All");
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    menuname_id: id || "",
    title: "",
    description: "",
    price: "",
    type: "",
    image_url: "",
  });
  const [uploading, setUploading] = useState(false);

  // --- Helper: normalize & detect veg / nonveg ---
  const normalize = (str) =>
    (str || "")
      .toString()
      .toLowerCase()
      .replace(/[^a-z]/g, ""); // keep only letters

  const detectVegType = (menuType) => {
    const s = normalize(menuType);

    if (!s) return "unknown";

    // common non-veg indicators
    const nonIndicators = ["non", "chicken", "mutton", "meat", "fish", "egg", "prawn", "shrimp"];
    // common veg indicators
    const vegIndicators = ["veg", "veget", "vegetarian", "paneer", "tofu", "salad", "vegetable"];

    // if string explicitly contains both non & veg (eg. "nonveg", "nonveg-chicken")
    if (s.includes("non") && s.includes("veg")) return "nonveg";

    // check for explicit non-indicators
    for (let ni of nonIndicators) {
      if (s.includes(ni)) return "nonveg";
    }

    // check for veg-indicators (but avoid matching 'nonveg' due to earlier guard)
    for (let vi of vegIndicators) {
      if (s.includes(vi)) return "veg";
    }

    return "unknown";
  };

  // --- fetch & apply filter ---
  const applyFilter = (data, type) => {
    if (!Array.isArray(data)) {
      setFilteredMenus([]);
      return;
    }
    if (type === "All") {
      setFilteredMenus(data);
      return;
    }

    const desired = type === "Veg" ? "veg" : "nonveg";
    const filtered = data.filter((menu) => detectVegType(menu.type) === desired);
    setFilteredMenus(filtered);
  };

  const fetchMenus = async () => {
    try {
      const res = await getMenusByMenuId(id);
      const arr = res || [];
      setMenus(arr);
      applyFilter(arr, filterType);

      // Helpful debug output — remove if you want
      console.log("Fetched menu types:", arr.map((m) => m.type));
    } catch (err) {
      console.error("Failed to fetch menus:", err);
    }
  };

  useEffect(() => {
    fetchMenus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleFilter = (type) => {
    setFilterType(type);
    applyFilter(menus, type);
  };

  // --- form handlers (unchanged behavior) ---
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const form = new FormData();
    form.append("image", file);

    try {
      const res = await fetch("https://kvk-backend.onrender.com/api/upload", {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      const imageUrl = data.imageUrl?.startsWith("http")
        ? data.imageUrl
        : `https://kvk-backend.onrender.com${data.url}`;
      setFormData((prev) => ({ ...prev, image_url: imageUrl }));
    } catch (err) {
      console.error("Image upload failed:", err);
      alert("Image upload failed ❌");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (uploading) {
      alert("Please wait, image is still uploading...");
      return;
    }

    try {
      if (isEditing) {
        const updated = await updateMenu(formData.id, formData);
        const updatedMenus = menus.map((m) => (m.id === formData.id ? updated : m));
        setMenus(updatedMenus);
        applyFilter(updatedMenus, filterType);
        alert("✅ Menu updated successfully");
      } else if (isAdding) {
        const created = await createMenu(formData);
        const newMenus = [...menus, created];
        setMenus(newMenus);
        applyFilter(newMenus, filterType);
        alert("✅ Menu added successfully");
      }

      setIsEditing(false);
      setIsAdding(false);
      setFormData({
        menuname_id: id || "",
        title: "",
        description: "",
        price: "",
        type: "",
        image_url: "",
      });
    } catch (err) {
      console.error("Error saving menu:", err);
      alert(err.response?.data?.message || "Failed to save menu ❌");
    }
  };

  const handleDelete = async (menuId) => {
    if (window.confirm("Are you sure you want to delete this menu?")) {
      try {
        await deleteMenu(menuId);
        const remaining = menus.filter((m) => m.id !== menuId);
        setMenus(remaining);
        applyFilter(remaining, filterType);
        alert("❌ Menu deleted successfully");
      } catch (err) {
        console.error("Failed to delete menu:", err);
      }
    }
  };

  const handleEdit = (menu) => {
    setIsEditing(true);
    setIsAdding(false);
    setFormData(menu);
  };

  const handleCloseModal = () => {
    setIsEditing(false);
    setIsAdding(false);
    setFormData({
      menuname_id: id || "",
      title: "",
      description: "",
      price: "",
      type: "",
      image_url: "",
    });
  };

  return (
    <div style={{ padding: "20px", maxWidth: "700px", margin: "auto" }}>
      {/* Top Buttons Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <div>
          <button
            onClick={() => handleFilter("All")}
            style={{
              ...styles.filterBtn,
              background: filterType === "All" ? "#27ae60" : "#bdc3c7",
            }}
          >
            All
          </button>
          <button
            onClick={() => handleFilter("Veg")}
            style={{
              ...styles.filterBtn,
              background: filterType === "Veg" ? "#27ae60" : "#bdc3c7",
            }}
          >
            🥦 Veg
          </button>
          <button
            onClick={() => handleFilter("Non-Veg")}
            style={{
              ...styles.filterBtn,
              background: filterType === "Non-Veg" ? "#27ae60" : "#bdc3c7",
            }}
          >
            🍗 Non-Veg
          </button>
        </div>

        {!isAdding && !isEditing && (
          <button onClick={() => setIsAdding(true)} style={styles.addBtn}>
            ➕ Add Menu
          </button>
        )}
      </div>

      {/* Modal */}
      {(isAdding || isEditing) && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2>{isEditing ? "Edit Menu" : "Add Menu"}</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
              <input
                type="text"
                name="menuname_id"
                value={formData.menuname_id}
                placeholder="Menu Name ID"
                onChange={handleChange}
                style={styles.input}
                required
                readOnly
              />
              <input
                type="text"
                name="title"
                value={formData.title}
                placeholder="Title"
                onChange={handleChange}
                style={styles.input}
                required
              />
              <textarea
                name="description"
                value={formData.description}
                placeholder="Description"
                onChange={handleChange}
                style={styles.textarea}
              />
              <input
                type="number"
                name="price"
                value={formData.price}
                placeholder="Price"
                onChange={handleChange}
                style={styles.input}
                required
              />
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                style={styles.input}
                required
              >
                <option value="">Select Type</option>
                <option value="Veg">Veg</option>
                <option value="Non-Veg">Non-Veg</option>
              </select>
              <input type="file" onChange={handleImageUpload} style={styles.input} />
              {uploading && <p>Uploading image... ⏳</p>}
              {formData.image_url && (
                <img
                  src={formData.image_url}
                  alt="Preview"
                  style={{ width: "100px", marginBottom: "10px", borderRadius: "6px" }}
                />
              )}
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                <button type="submit" style={styles.saveBtn}>
                  {isEditing ? "Update Menu" : "Add Menu"}
                </button>
                <button type="button" onClick={handleCloseModal} style={styles.cancelBtn}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Menu Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "15px",
        }}
      >
        {filteredMenus.map((menu) => {
          const typeLabel = detectVegType(menu.type);
          return (
            <div key={menu.id} style={styles.card}>
              <h3 style={{ fontSize: "16px", marginBottom: "8px" }}>{menu.title}</h3>
              {menu.image_url ? (
                <img
                  src={
                    menu.image_url.startsWith("http")
                      ? menu.image_url
                      : `https://kvk-backend.onrender.com${menu.image_url}`
                  }
                  alt={menu.title}
                  style={styles.image}
                />
              ) : (
                <p style={{ fontSize: "12px", color: "#888" }}>No image available</p>
              )}
              <p style={{ fontSize: "12px", margin: "5px 0" }}>
                <strong>₹{menu.price}</strong>
              </p>
              <p style={{ fontSize: "12px", color: typeLabel === "veg" ? "green" : typeLabel === "nonveg" ? "red" : "#666" }}>
                {menu.type || "Unknown"}
              </p>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button onClick={() => handleEdit(menu)} style={styles.editBtn}>
                  ✏️
                </button>
                <button onClick={() => handleDelete(menu.id)} style={styles.deleteBtn}>
                  🗑
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  addBtn: {
    background: "#27ae60",
    color: "#fff",
    padding: "10px 16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  filterBtn: {
    color: "#fff",
    padding: "8px 14px",
    border: "none",
    borderRadius: "6px",
    marginRight: "8px",
    cursor: "pointer",
    fontSize: "14px",
  },
  card: {
    background: "#fff",
    padding: "12px",
    borderRadius: "10px",
    boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  image: {
    width: "100%",
    borderRadius: "8px",
    marginBottom: "8px",
    height: "100px",
    objectFit: "cover",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    background: "#fff",
    padding: "25px",
    borderRadius: "12px",
    width: "450px",
    maxHeight: "90vh",
    overflowY: "auto",
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
  },
  form: { display: "flex", flexDirection: "column", gap: "8px" },
  input: {
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  textarea: {
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  saveBtn: {
    background: "#27ae60",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    flex: 1,
    marginRight: "8px",
    fontSize: "14px",
  },
  cancelBtn: {
    background: "#7f8c8d",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    flex: 1,
    fontSize: "14px",
  },
  editBtn: {
    background: "#2980b9",
    color: "#fff",
    padding: "6px 8px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "12px",
  },
  deleteBtn: {
    background: "#c0392b",
    color: "#fff",
    padding: "6px 8px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "12px",
  },
};




