// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function FoodsItems({ categoryId }) {
//   const [items, setItems] = useState([]);
//   const [showPopup, setShowPopup] = useState(false);
//   const [editingItem, setEditingItem] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     price: "",
//     description: "",
//     category: "Veg",
//     image_url: "",
//     foodcategory_id: categoryId,
//   });

//   // ✅ Fetch items filtered by category ID
//   const fetchItems = async () => {
//     try {
//       const res = await axios.get("https://kvk-backend.onrender.com/api/foods/item");
//       const filtered = res.data.filter(
//         (item) => item.foodcategory_id === categoryId
//       );
//       setItems(filtered);
//     } catch (err) {
//       console.error("Error fetching food items:", err);
//     }
//   };

//   useEffect(() => {
//     if (categoryId) fetchItems();
//   }, [categoryId]);

//   // ✅ Handle input changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // ✅ Auto upload image on select
//   const handleImageChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     setUploading(true);

//     const data = new FormData();
//     data.append("image", file);

//     try {
//       const res = await axios.post(
//         "https://kvk-backend.onrender.com/api/upload",
//         data,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );
//       setFormData((prev) => ({ ...prev, image_url: res.data.imageurl }));
//       setUploading(false);
//       alert("Image uploaded successfully!");
//     } catch (err) {
//       console.error("Image upload failed:", err);
//       alert("Image upload failed!");
//       setUploading(false);
//     }
//   };

//   // ✅ Save or update item
//   const handleSave = async () => {
//     const { name, price, description, category, image_url } = formData;
//     if (!name || !price || !description || !category || !image_url) {
//       alert("Please fill all fields and select an image!");
//       return;
//     }

//     try {
//       if (editingItem) {
//         await axios.put(
//           `https://kvk-backend.onrender.com/api/foods/item/${editingItem.id}`,
//           formData
//         );
//         alert("Item updated successfully!");
//       } else {
//         await axios.post(
//           "https://kvk-backend.onrender.com/api/foods/item",
//           formData
//         );
//         alert("Item added successfully!");
//       }
//       setShowPopup(false);
//       setEditingItem(null);
//       fetchItems();
//     } catch (err) {
//       console.error("Error saving item:", err);
//       alert("Failed to save item!");
//     }
//   };

//   // ✅ Delete item
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this item?")) return;
//     try {
//       await axios.delete(`https://kvk-backend.onrender.com/api/foods/item/${id}`);
//       alert("Item deleted successfully!");
//       fetchItems();
//     } catch (err) {
//       console.error("Error deleting item:", err);
//       alert("Failed to delete item!");
//     }
//   };

//   // ✅ Open modal for edit
//   const handleEdit = (item) => {
//     setEditingItem(item);
//     setFormData(item);
//     setShowPopup(true);
//   };

//   // ✅ Open modal for new item
//   const handleAdd = () => {
//     setEditingItem(null);
//     setFormData({
//       name: "",
//       price: "",
//       description: "",
//       category: "Veg",
//       image_url: "",
//       foodcategory_id: categoryId,
//     });
//     setShowPopup(true);
//   };

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.title}>Food Items</h1>
//       <button onClick={handleAdd} style={styles.addButton}>
//         + Add Item
//       </button>

//       <div style={styles.grid}>
//         {items.map((item) => (
//           <div key={item.id} style={styles.card}>
//             <img src={item.image_url} alt={item.name} style={styles.image} />
//             <h3>{item.name}</h3>
//             <p>{item.description}</p>
//             <p>
//               <b>₹{item.price}</b> — {item.category}
//             </p>
//             <div style={styles.actions}>
//               <button style={styles.editBtn} onClick={() => handleEdit(item)}>
//                 Edit
//               </button>
//               <button style={styles.deleteBtn} onClick={() => handleDelete(item.id)}>
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* ✅ Popup Modal */}
//       {showPopup && (
//         <div style={styles.popupOverlay}>
//           <div style={styles.popup}>
//             <h2>{editingItem ? "Edit Food Item" : "Add New Food Item"}</h2>
//             <input
//               type="text"
//               name="name"
//               placeholder="Name"
//               value={formData.name}
//               onChange={handleChange}
//               style={styles.input}
//             />
//             <input
//               type="text"
//               name="price"
//               placeholder="Price"
//               value={formData.price}
//               onChange={handleChange}
//               style={styles.input}
//             />
//             <textarea
//               name="description"
//               placeholder="Description"
//               value={formData.description}
//               onChange={handleChange}
//               style={styles.textarea}
//             />
//             <select
//               name="category"
//               value={formData.category}
//               onChange={handleChange}
//               style={styles.input}
//             >
//               <option value="Veg">Veg</option>
//               <option value="Non-Veg">Non-Veg</option>
//             </select>

//             <input type="file" accept="image/*" onChange={handleImageChange} />
//             {uploading && <p style={{ color: "orange" }}>Uploading image...</p>}
//             {formData.image_url && (
//               <img
//                 src={formData.image_url}
//                 alt="Preview"
//                 style={{ width: "100%", marginTop: "10px", borderRadius: "8px" }}
//               />
//             )}

//             <div style={styles.popupButtons}>
//               <button
//                 onClick={handleSave}
//                 style={styles.saveButton}
//                 disabled={uploading}
//               >
//                 {editingItem ? "Update" : "Save"}
//               </button>
//               <button
//                 onClick={() => setShowPopup(false)}
//                 style={styles.cancelButton}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // ✅ Inline Styles
// const styles = {
//   container: {
//     padding: "20px",
//     marginLeft: "250px",
//   },
//   title: {
//     fontSize: "24px",
//     marginBottom: "15px",
//   },
//   addButton: {
//     padding: "10px 20px",
//     background: "#27ae60",
//     color: "#fff",
//     border: "none",
//     borderRadius: "6px",
//     cursor: "pointer",
//     marginBottom: "20px",
//   },
//   grid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
//     gap: "20px",
//   },
//   card: {
//     background: "#fff",
//     borderRadius: "10px",
//     padding: "15px",
//     boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
//     textAlign: "center",
//   },
//   image: {
//     width: "100%",
//     height: "160px",
//     borderRadius: "8px",
//     objectFit: "cover",
//   },
//   actions: {
//     display: "flex",
//     justifyContent: "space-around",
//     marginTop: "10px",
//   },
//   editBtn: {
//     background: "#f1c40f",
//     border: "none",
//     padding: "6px 10px",
//     borderRadius: "5px",
//     cursor: "pointer",
//   },
//   deleteBtn: {
//     background: "#e74c3c",
//     border: "none",
//     padding: "6px 10px",
//     borderRadius: "5px",
//     cursor: "pointer",
//     color: "#fff",
//   },
//   popupOverlay: {
//     position: "fixed",
//     top: 0,
//     left: 0,
//     width: "100vw",
//     height: "100vh",
//     background: "rgba(0,0,0,0.5)",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     zIndex: 1000,
//   },
//   popup: {
//     background: "#fff",
//     padding: "25px",
//     borderRadius: "12px",
//     width: "400px",
//     boxShadow: "0 5px 20px rgba(0,0,0,0.2)",
//   },
//   input: {
//     width: "100%",
//     padding: "10px",
//     margin: "8px 0",
//     borderRadius: "6px",
//     border: "1px solid #ccc",
//   },
//   textarea: {
//     width: "100%",
//     height: "80px",
//     padding: "10px",
//     borderRadius: "6px",
//     border: "1px solid #ccc",
//     resize: "none",
//     marginBottom: "8px",
//   },
//   popupButtons: {
//     display: "flex",
//     justifyContent: "space-between",
//     marginTop: "15px",
//   },
//   saveButton: {
//     padding: "10px 20px",
//     background: "#27ae60",
//     color: "#fff",
//     border: "none",
//     borderRadius: "6px",
//     cursor: "pointer",
//   },
//   cancelButton: {
//     padding: "10px 20px",
//     background: "#7f8c8d",
//     color: "#fff",
//     border: "none",
//     borderRadius: "6px",
//     cursor: "pointer",
//   },
// };







// src/pages/FoodsItems.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function FoodsItems() {
  const { id: categoryId } = useParams();
  const [items, setItems] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "Veg",
    image_url: "",
    foodcategory_id: "",
  });

  useEffect(() => {
    if (categoryId) {
      setFormData((prev) => ({ ...prev, foodcategory_id: categoryId }));
      fetchItems();
    }
  }, [categoryId]);

  const fetchItems = async () => {
    try {
      const res = await axios.get(
        `https://kvk-backend.onrender.com/api/foods/item/category/${categoryId}`
      );
      setItems(res.data);
    } catch (err) {
      console.error("Error fetching food items:", err);
      alert("Failed to fetch items. Check backend/API.");
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    // Show local preview immediately
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, image_url: reader.result }));
    };
    reader.readAsDataURL(file);

    const data = new FormData();
    data.append("image", file);

    try {
      const res = await axios.post(
        "https://kvk-backend.onrender.com/api/upload",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("Upload response:", res.data);

      if (res.data?.imageUrl) {
        setFormData((prev) => ({ ...prev, image_url: res.data.imageUrl }));
        alert("Image uploaded successfully!");
      } else {
        alert("Upload succeeded but no image URL returned. Using preview.");
      }
    } catch (err) {
      console.error("Image upload failed:", err.response || err.message);
      alert("Image upload failed!");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    const { name, price, description, image_url } = formData;
    if (!name || !price || !description || !image_url) {
      alert("Please fill all fields and select an image!");
      return;
    }

    try {
      if (editingItem) {
        await axios.put(
          `https://kvk-backend.onrender.com/api/foods/item/${editingItem.id}`,
          formData
        );
        alert("Item updated successfully!");
      } else {
        await axios.post(
          "https://kvk-backend.onrender.com/api/foods/item",
          formData
        );
        alert("Item added successfully!");
      }

      setShowPopup(false);
      setEditingItem(null);
      fetchItems();
    } catch (err) {
      console.error("Error saving item:", err.response || err);
      alert("Failed to save item!");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await axios.delete(
        `https://kvk-backend.onrender.com/api/foods/item/${id}`
      );
      alert("Item deleted successfully!");
      fetchItems();
    } catch (err) {
      console.error("Error deleting item:", err);
      alert("Failed to delete item!");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Food Items</h1>
      <button onClick={() => setShowPopup(true)} style={styles.addButton}>
        + Add Item
      </button>

      <div style={styles.grid}>
        {items.map((item) => (
          <div key={item.id} style={styles.card}>
            <img src={item.image_url} alt={item.name} style={styles.image} />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>
              <b>₹{item.price}</b> — {item.category}
            </p>
            <div style={styles.actions}>
              <button
                style={styles.editBtn}
                onClick={() => {
                  setEditingItem(item);
                  setFormData(item);
                  setShowPopup(true);
                }}
              >
                Edit
              </button>
              <button
                style={styles.deleteBtn}
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showPopup && (
        <div style={styles.popupOverlay}>
          <div style={styles.popup}>
            <h2>{editingItem ? "Edit Item" : "Add Item"}</h2>
            <input
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
            />
            <input
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              style={styles.input}
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              style={styles.textarea}
            />
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="Veg">Veg</option>
              <option value="Non-Veg">Non-Veg</option>
            </select>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {formData.image_url && (
              <img
                src={formData.image_url}
                alt="Preview"
                style={{
                  width: "100%",
                  borderRadius: "8px",
                  marginTop: "10px",
                }}
              />
            )}
            <div style={styles.popupButtons}>
              <button
                onClick={handleSave}
                style={styles.saveButton}
                disabled={uploading}
              >
                {editingItem ? "Update" : "Save"}
              </button>
              <button
                onClick={() => {
                  setShowPopup(false);
                  setEditingItem(null);
                }}
                style={styles.cancelButton}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { padding: "20px", marginLeft: "250px" },
  title: { fontSize: "24px", marginBottom: "15px" },
  addButton: {
    padding: "10px 20px",
    background: "#27ae60",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginBottom: "20px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "#fff",
    borderRadius: "10px",
    padding: "15px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: "160px",
    borderRadius: "8px",
    objectFit: "cover",
  },
  actions: { display: "flex", justifyContent: "space-around", marginTop: "10px" },
  editBtn: {
    background: "#f1c40f",
    border: "none",
    padding: "6px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  deleteBtn: {
    background: "#e74c3c",
    border: "none",
    padding: "6px 10px",
    borderRadius: "5px",
    color: "#fff",
    cursor: "pointer",
  },
  popupOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
 
  // ...other styles remain the same
  popup: {
    background: "#fff",
    padding: "15px", // smaller padding
    borderRadius: "10px",
    width: "300px",  // smaller width
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  input: {
    width: "100%",
    padding: "8px", // smaller input padding
    margin: "6px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "14px", // smaller font
  },
  textarea: {
    width: "100%",
    height: "60px", // smaller height
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    resize: "none",
    marginBottom: "6px",
    fontSize: "14px",
  },
  saveButton: {
    padding: "8px 15px", // smaller button
    background: "#27ae60",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
  },
  cancelButton: {
    padding: "8px 15px", // smaller button
    background: "#7f8c8d",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
  },
  popupButtons: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
    gap: "10px",
  },
  // image preview smaller
  previewImage: {
    width: "100%",
    height: "120px",
    objectFit: "cover",
    borderRadius: "6px",
    marginTop: "8px",
  },
};

