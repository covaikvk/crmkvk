import React, { useEffect, useState } from "react";
import {
  getMenus,
  createMenu,
  updateMenu,
  deleteMenu,
} from "./ourServicesController";
import { useNavigate } from "react-router-dom";
import "./OurFoodServices.css";

export default function OurFoodServices() {
  const [foods, setFoods] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFood, setEditingFood] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    image_url: "",
    banner_url: "",
  });
  const navigate = useNavigate();

  const fetchFoods = async () => {
    try {
      const data = await getMenus();
      setFoods(Array.isArray(data) ? data : [data]);
    } catch (err) {
      console.error("Failed to fetch foods:", err);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const openAddModal = () => {
    setEditingFood(null);
    setFormData({ name: "", image_url: "", banner_url: "" });
    setIsModalOpen(true);
  };

  const openEditModal = (food) => {
    setEditingFood(food);
    setFormData({
      name: food.name,
      image_url: food.image_url,
      banner_url: food.banner_url,
    });
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    const form = new FormData();
    form.append("image", file);

    try {
      const res = await fetch("https://kvk-backend.onrender.com/api/upload", {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      if (data.imageUrl) {
        setFormData((prev) => ({ ...prev, [field]: data.imageUrl }));
      } else {
        alert("Failed to upload image");
      }
    } catch (err) {
      console.error(err);
      alert("Upload error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingFood) {
        await updateMenu(editingFood.id, formData);
      } else {
        await createMenu(formData);
      }
      setIsModalOpen(false);
      fetchFoods();
    } catch (err) {
      console.error("Failed to submit:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteMenu(id);
      fetchFoods();
    } catch (err) {
      console.error("Failed to delete:", err);
    }
  };

  return (
    <div className="food-container">
      <header className="food-header">
        <h1>🍽 Our Food Services</h1>
      </header>

      <div className="food-grid">
        {foods.map((food) => (
          <div
            key={food._id}
            className="food-card"
            onClick={() => navigate(`/menu/${food.id}`)}
          >
            <div className="banner-wrapper">
              <img src={food.banner_url} alt={food.name} className="banner-img" />
            </div>
            <div className="card-content">
              <h2>{food.name}</h2>
              <img src={food.image_url} alt={food.name} className="food-img" />
              <div className="card-actions">
                <button
                  className="btn edit"
                  onClick={(e) => {
                    e.stopPropagation();
                    openEditModal(food);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(food._id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="btn add-btn" onClick={openAddModal}>
        ＋ Add New
      </button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{editingFood ? "Edit Food" : "Add New Food"}</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Food Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />

              <label>Food Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, "image_url")}
              />
              {formData.image_url && (
                <img src={formData.image_url} alt="preview" className="preview-img" />
              )}

              <label>Banner Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, "banner_url")}
              />
              {formData.banner_url && (
                <img src={formData.banner_url} alt="preview" className="preview-img" />
              )}

              <div className="modal-actions">
                <button type="submit" className="btn save">
                  {editingFood ? "Update" : "Add"}
                </button>
                <button
                  type="button"
                  className="btn cancel"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
