import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { base_url } from "../../api/api";
import "./WeeklyMenu.css";

const WeeklyMenu = () => {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null); // ✅ preview image

  const [form, setForm] = useState({
    id: null,
    category: "",
    type: "veg",
    food_category: "",
    packagename: "",
    package_image_url: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const API_URL = `${base_url}/api/regularmenu`;

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      const menusData = Array.isArray(res.data)
        ? res.data
        : res.data.data || [];
      setMenus(menusData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching menus:", error);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle image file select & preview
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Live preview
    const previewUrl = URL.createObjectURL(file);
    setPreviewImage(previewUrl);

    // Upload to server
    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const res = await fetch("https://kvk-backend.onrender.com/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      const imageUrl = data.imageUrl?.startsWith("http")
        ? data.imageUrl
        : `https://kvk-backend.onrender.com${data.url}`;

      setForm((prev) => ({ ...prev, package_image_url: imageUrl }));
    } catch (err) {
      console.error("Image upload failed:", err);
      alert("Image upload failed ❌");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) await axios.put(`${API_URL}/${form.id}`, form);
      else await axios.post(API_URL, form);

      setForm({
        id: null,
        category: "",
        type: "veg",
        food_category: "",
        packagename: "",
        package_image_url: "",
      });
      setPreviewImage(null);
      setIsEditing(false);
      fetchMenus();
    } catch (error) {
      console.error("Error saving menu:", error);
      alert("Failed to save menu.");
    }
  };

  const handleEdit = (menu) => {
    setForm({
      id: menu.id,
      category: menu.category,
      type: menu.type,
      food_category: menu.food_category,
      packagename: menu.packagename,
      package_image_url: menu.package_image_url,
    });
    setPreviewImage(menu.package_image_url);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this menu?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchMenus();
    } catch (error) {
      console.error("Error deleting menu:", error);
      alert("Failed to delete menu.");
    }
  };

  const handleCardClick = (menuId) => {
    navigate(`/weekly-details/${menuId}`);
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading menus...</p>;

  return (
    <div className="weekly-menu-container">
      <h1>Weekly Menu</h1>

      <form onSubmit={handleSubmit} className="menu-form">
        <h2>{isEditing ? "Edit Menu" : "Add New Menu"}</h2>

        <div className="form-group">
          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            required
          />
          <select name="type" value={form.type} onChange={handleChange}>
            <option value="veg">Veg</option>
            <option value="non-veg">Non-Veg</option>
          </select>
        </div>

        <div className="form-group">
          <input
            name="food_category"
            placeholder="Food Category"
            value={form.food_category}
            onChange={handleChange}
            required
          />
          <input
            name="packagename"
            placeholder="Package Name"
            value={form.packagename}
            onChange={handleChange}
            required
          />
        </div>

        {/* ✅ Image Upload + Preview */}
        <div className="form-group">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          {uploading && <p style={{ color: "orange" }}>Uploading...</p>}
          {previewImage && (
            <div className="image-preview">
              <img
                src={previewImage}
                alt="Preview"
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "10px",
                  objectFit: "cover",
                  marginTop: "10px",
                }}
              />
            </div>
          )}
        </div>

        <button type="submit" className="btn-submit">
          {isEditing ? "Update Menu" : "Add Menu"}
        </button>
      </form>

      {/* ✅ Menu Cards */}
      <div className="menu-cards">
        {menus.length === 0 ? (
          <p>No menus found.</p>
        ) : (
          menus.map((menu) => (
            <div
              key={menu.id}
              className="menu-card"
              onClick={() => handleCardClick(menu.id)}
            >
              {menu.package_image_url && (
                <img
                  src={menu.package_image_url}
                  alt={menu.packagename}
                  className="menu-image"
                />
              )}
              <div className="menu-content">
                <h2 className="menu-title">{menu.packagename}</h2>
                <p>
                  <strong>Type:</strong> {menu.type}
                </p>
                <p>
                  <strong>Category:</strong> {menu.category}
                </p>
                <p>
                  <strong>Food Category:</strong> {menu.food_category}
                </p>
              </div>
              <div className="menu-actions">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(menu);
                  }}
                  className="btn-edit"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(menu.id);
                  }}
                  className="btn-delete"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WeeklyMenu;
