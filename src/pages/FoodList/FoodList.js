// // src/pages/FoodList.js
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function FoodList() {
//   const [foods, setFoods] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [editingFood, setEditingFood] = useState(null);
//   const [newFood, setNewFood] = useState({
//     title: "",
//     description: "",
//     category: "Breakfast",
//     image_url: "",
//   });
//   const [imageFile, setImageFile] = useState(null);
//   const [uploading, setUploading] = useState(false);

//   useEffect(() => {
//     fetchFoods();
//   }, []);

//   const fetchFoods = async () => {
//     try {
//       const res = await axios.get(
//         "https://kvk-backend.onrender.com/api/foods/category"
//       );
//       setFoods(Array.isArray(res.data) ? res.data : [res.data]);
//     } catch (error) {
//       console.error("Error fetching foods:", error);
//     }
//   };

//   const handleInputChange = (e) => {
//     setNewFood({ ...newFood, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     setImageFile(file);
//     setUploading(true);

//     const formData = new FormData();
//     formData.append("image", file);

//     try {
//       const res = await axios.post(
//         "https://kvk-backend.onrender.com/api/upload",
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );
//       // Use correct field returned by your upload API
//       setNewFood({ ...newFood, image_url: res.data.imageUrl });
//       setUploading(false);
    
      
//       alert("Image uploaded successfully!");
//     } catch (error) {
//       console.error("Image upload failed:", error.response || error);
//       alert("Image upload failed! Check console.");
//       setUploading(false);
//     }
//   };

//   const handleAddOrEditFood = async () => {
//     if (!newFood.title || !newFood.description || !newFood.image_url) {
//       alert("Please fill all fields and select an image!");
//       return;
//     }

//     try {
//       if (editingFood) {
//         await axios.put(
//           `https://kvk-backend.onrender.com/api/foods/category/${editingFood.id}`,
//           newFood
//         );
//       } else {
//         await axios.post(
//           "https://kvk-backend.onrender.com/api/foods/category",
//           newFood
//         );
//       }
//       fetchFoods();
//       setShowModal(false);
//       setEditingFood(null);
//       setNewFood({ title: "", description: "", category: "Breakfast", image_url: "" });
//       setImageFile(null);
//     } catch (error) {
//       console.error("Error saving food:", error.response || error);
//       alert("Failed to save food!");
//     }
//   };

//   const handleDeleteFood = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this food?")) return;
//     try {
//       await axios.delete(
//         `https://kvk-backend.onrender.com/api/foods/category/${id}`
//       );
//       fetchFoods();
//     } catch (error) {
//       console.error("Error deleting food:", error.response || error);
//       alert("Failed to delete food!");
//     }
//   };

//   const openEditModal = (food) => {
//     setEditingFood(food);
//     setNewFood({ ...food });
//     setShowModal(true);
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Food Menu</h1>

//       <button style={styles.addButton} onClick={() => setShowModal(true)}>
//         + Add Food
//       </button>

//       <div style={styles.cardContainer}>
//         {foods.length === 0 && <p>No food items found.</p>}
//         {foods.map((food) => (
//           <div key={food.id} style={styles.card}>
//             {food.image_url && (
//               <img
//                 src={food.image_url}
//                 alt={food.title}
//                 style={styles.foodImage}
//               />
//             )}
//             <h3>{food.title}</h3>
//             <p>{food.description}</p>
//             <span style={styles.category}>{food.category}</span>

//             <div style={{ marginTop: "10px", display: "flex", gap: "10px", justifyContent: "center" }}>
//               <button style={styles.editButton} onClick={() => openEditModal(food)}>Edit</button>
//               <button style={styles.deleteButton} onClick={() => handleDeleteFood(food.id)}>Delete</button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Modal */}
//       {showModal && (
//         <div style={styles.modalOverlay}>
//           <div style={styles.modal}>
//             <h2>{editingFood ? "Edit Food Item" : "Add Food Item"}</h2>

//             <label style={styles.label}>Title:</label>
//             <input
//               type="text"
//               name="title"
//               placeholder="Enter food title"
//               value={newFood.title}
//               onChange={handleInputChange}
//               style={styles.input}
//             />

//             <label style={styles.label}>Description:</label>
//             <textarea
//               name="description"
//               placeholder="Enter description"
//               value={newFood.description}
//               onChange={handleInputChange}
//               style={{ ...styles.input, height: "60px" }}
//             />

//             <label style={styles.label}>Category:</label>
//             <select
//               name="category"
//               value={newFood.category}
//               onChange={handleInputChange}
//               style={styles.input}
//             >
//               <option>Breakfast</option>
//               <option>Lunch</option>
//               <option>Dinner</option>
//               <option>Snacks</option>
//               <option>Beverages</option>
//             </select>

//             <label style={styles.label}>Image:</label>
//             <input
//               type="file"
//               onChange={handleImageChange}
//               style={styles.fileInput}
//             />

//             {newFood.image_url && (
//               <img
//                 src={newFood.image_url}
//                 alt="Preview"
//                 style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px", marginBottom: "10px" }}
//               />
//             )}

//             <div style={styles.modalButtons}>
//               <button
//                 onClick={handleAddOrEditFood}
//                 style={{ ...styles.saveButton, opacity: uploading ? 0.6 : 1 }}
//                 disabled={uploading || !newFood.image_url}
//               >
//                 {editingFood ? "Update" : "Save"}
//               </button>
//               <button
//                 onClick={() => {
//                   setShowModal(false);
//                   setEditingFood(null);
//                   setImageFile(null);
//                 }}
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

// const styles = {
//   addButton: {
//     padding: "10px 20px",
//     backgroundColor: "#27ae60",
//     color: "#fff",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//     marginBottom: "20px",
//   },
//   cardContainer: {
//     display: "flex",
//     flexWrap: "wrap",
//     gap: "20px",
//   },
//   card: {
//     width: "250px",
//     padding: "15px",
//     border: "1px solid #ccc",
//     borderRadius: "8px",
//     boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//     textAlign: "center",
//   },
//   foodImage: {
//     width: "100%",
//     height: "150px",
//     objectFit: "cover",
//     borderRadius: "8px",
//     marginBottom: "10px",
//   },
//   category: {
//     display: "inline-block",
//     marginTop: "10px",
//     padding: "5px 10px",
//     backgroundColor: "#ecf0f1",
//     borderRadius: "5px",
//     fontSize: "12px",
//     color: "#2c3e50",
//   },
//   editButton: {
//     padding: "6px 12px",
//     backgroundColor: "#2980b9",
//     color: "#fff",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//   },
//   deleteButton: {
//     padding: "6px 12px",
//     backgroundColor: "#c0392b",
//     color: "#fff",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//   },
//   modalOverlay: {
//     position: "fixed",
//     top: 0,
//     left: 0,
//     width: "100vw",
//     height: "100vh",
//     backgroundColor: "rgba(0,0,0,0.5)",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     zIndex: 1000,
//   },
//   modal: {
//     backgroundColor: "#fff",
//     padding: "25px",
//     borderRadius: "10px",
//     width: "400px",
//     display: "flex",
//     flexDirection: "column",
//     gap: "10px",
//     boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
//     zIndex: 1001,
//   },
//   label: {
//     fontWeight: "bold",
//     marginBottom: "5px",
//   },
//   input: {
//     padding: "10px",
//     borderRadius: "5px",
//     border: "1px solid #ccc",
//     marginBottom: "10px",
//     width: "100%",
//   },
//   fileInput: {
//     marginBottom: "10px",
//   },
//   modalButtons: {
//     display: "flex",
//     justifyContent: "space-between",
//   },
//   saveButton: {
//     backgroundColor: "#27ae60",
//     color: "#fff",
//     border: "none",
//     padding: "10px 20px",
//     borderRadius: "5px",
//     cursor: "pointer",
//   },
//   cancelButton: {
//     backgroundColor: "#c0392b",
//     color: "#fff",
//     border: "none",
//     padding: "10px 20px",
//     borderRadius: "5px",
//     cursor: "pointer",
//   },
// };







// src/pages/FoodList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function FoodList() {
  const [foods, setFoods] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingFood, setEditingFood] = useState(null);
  const [newFood, setNewFood] = useState({
    title: "",
    description: "",
    category: "Breakfast",
    image_url: "",
  });
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      const res = await axios.get("https://kvk-backend.onrender.com/api/foods/category");
      setFoods(Array.isArray(res.data) ? res.data : [res.data]);
    } catch (error) {
      console.error("Error fetching foods:", error);
    }
  };

  const handleInputChange = (e) => {
    setNewFood({ ...newFood, [e.target.name]: e.target.value });
  };

  const handleImageChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  setUploading(true);

  // Local preview
  const reader = new FileReader();
  reader.onloadend = () => {
    setNewFood(prev => ({ ...prev, image_url: reader.result }));
  };
  reader.readAsDataURL(file);

  const formData = new FormData();
  formData.append("image", file);

  try {
    const res = await axios.post(
      "https://kvk-backend.onrender.com/api/upload",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    console.log("Full Axios response:", res);

    // Flexible check for imageUrl
    const uploadedUrl =
      res.data?.imageUrl || res.data?.data?.imageUrl || res.data?.url || res.data?.path;

    if (!uploadedUrl) {
      alert("Upload succeeded but no image URL returned. Using preview image.");
      return;
    }

    setNewFood(prev => ({ ...prev, image_url: uploadedUrl }));
    alert("Image uploaded successfully!");
  } catch (err) {
    console.error("Image upload failed:", err.response || err.message);
    alert("Image upload failed!");
  } finally {
    setUploading(false);
  }
};




  const handleAddOrEditFood = async () => {
    if (!newFood.title || !newFood.description || !newFood.image_url) {
      alert("Please fill all fields and select an image!");
      return;
    }

    try {
      if (editingFood) {
        await axios.put(
          `https://kvk-backend.onrender.com/api/foods/category/${editingFood.id}`,
          newFood
        );
        alert("Food updated successfully!");
      } else {
        await axios.post("https://kvk-backend.onrender.com/api/foods/category", newFood);
        alert("Food added successfully!");
      }

      fetchFoods();
      setShowModal(false);
      setEditingFood(null);
      setNewFood({ title: "", description: "", category: "Breakfast", image_url: "" });
    } catch (error) {
      console.error("Error saving food:", error.response || error);
      alert("Failed to save food!");
    }
  };

  const handleDeleteFood = async (id) => {
    if (!window.confirm("Are you sure you want to delete this food?")) return;
    try {
      await axios.delete(`https://kvk-backend.onrender.com/api/foods/category/${id}`);
      alert("Food deleted successfully!");
      fetchFoods();
    } catch (error) {
      console.error("Error deleting food:", error.response || error);
      alert("Failed to delete food!");
    }
  };

  const openEditModal = (food) => {
    setEditingFood(food);
    setNewFood({ ...food });
    setShowModal(true);
  };
 return (
    <div style={{ padding: "20px", marginLeft: "250px" }}>
      <h1>Food Menu</h1>

      <button style={styles.addButton} onClick={() => setShowModal(true)}>
        + Add Food
      </button>

      <div style={styles.cardContainer}>
        {foods.length === 0 && <p>No food items found.</p>}
        {foods.map((food) => (
          <div
            key={food.id}
            style={styles.card}
            onClick={() => navigate(`/foodsitems/${food.id}`)}
          >
            {food.image_url && (
              <img src={food.image_url} alt={food.title} style={styles.foodImage} />
            )}
            <h3>{food.title}</h3>
            <p>{food.description}</p>
            <span style={styles.category}>{food.category}</span>
            <div style={styles.cardActions}>
              <button
                style={styles.editButton}
                onClick={(e) => {
                  e.stopPropagation();
                  openEditModal(food);
                }}
              >
                Edit
              </button>
              <button
                style={styles.deleteButton}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteFood(food.id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Modal */}
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2>{editingFood ? "Edit Food Item" : "Add Food Item"}</h2>

            <label style={styles.label}>Title:</label>
            <input
              type="text"
              name="title"
              placeholder="Enter food title"
              value={newFood.title}
              onChange={handleInputChange}
              style={styles.input}
            />

            <label style={styles.label}>Description:</label>
            <textarea
              name="description"
              placeholder="Enter description"
              value={newFood.description}
              onChange={handleInputChange}
              style={{ ...styles.input, height: "60px" }}
            />

            <label style={styles.label}>Category:</label>
            <select
              name="category"
              value={newFood.category}
              onChange={handleInputChange}
              style={styles.input}
            >
              <option>Breakfast</option>
              <option>Lunch</option>
              <option>Dinner</option>
              <option>Snacks</option>
              <option>Beverages</option>
            </select>

            <label style={styles.label}>Image:</label>
            <input type="file" onChange={handleImageChange} style={styles.fileInput} />

            {newFood.image_url && (
              <img
                src={newFood.image_url}
                alt="Preview"
                style={styles.previewImage}
              />
            )}

            <div style={styles.modalButtons}>
              <button
                onClick={handleAddOrEditFood}
                style={{ ...styles.saveButton, opacity: uploading ? 0.6 : 1 }}
                disabled={uploading}
              >
                {editingFood ? "Update" : "Save"}
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingFood(null);
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
  addButton: {
    padding: "10px 20px",
    backgroundColor: "#27ae60",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "20px",
  },
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
  },
  card: {
    width: "220px",
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    textAlign: "center",
    cursor: "pointer",
    transition: "transform 0.2s ease",
  },
  foodImage: {
    width: "100%",
    height: "130px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "10px",
  },
  category: {
    display: "inline-block",
    marginTop: "8px",
    padding: "4px 8px",
    backgroundColor: "#ecf0f1",
    borderRadius: "5px",
    fontSize: "12px",
    color: "#2c3e50",
  },
  cardActions: {
    marginTop: "10px",
    display: "flex",
    gap: "10px",
    justifyContent: "center",
  },
  editButton: {
    padding: "5px 10px",
    backgroundColor: "#2980b9",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  deleteButton: {
    padding: "5px 10px",
    backgroundColor: "#c0392b",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "#fff",
    padding: "25px",
    borderRadius: "10px",
    width: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
    zIndex: 1001,
  },
  label: { fontWeight: "bold", marginBottom: "5px" },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginBottom: "10px",
    width: "100%",
  },
  fileInput: { marginBottom: "10px" },
  previewImage: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "10px",
  },
  modalButtons: { display: "flex", justifyContent: "space-between" },
  saveButton: {
    backgroundColor: "#27ae60",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  cancelButton: {
    backgroundColor: "#c0392b",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};