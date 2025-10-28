// src/pages/Videos/Videos.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Videos.css";

const API_URL = "https://kvk-backend.onrender.com/api/videos";

export default function Videos() {
  const [videos, setVideos] = useState([]);
  const [formData, setFormData] = useState({ video_url: "", orderno: "" });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch videos
  const fetchVideos = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setVideos(res.data);
    } catch (err) {
      console.error("Error fetching videos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // ✅ Handle form input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Submit (Add or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`${API_URL}/${editId}`, formData);
        alert("Video updated successfully");
      } else {
        await axios.post(API_URL, formData);
        alert("Video added successfully");
      }
      setFormData({ video_url: "", orderno: "" });
      setEditId(null);
      fetchVideos();
    } catch (err) {
      console.error("Error saving video:", err);
    }
  };

  // ✅ Edit handler
  const handleEdit = (video) => {
    setEditId(video.id);
    setFormData({ video_url: video.video_url, orderno: video.orderno });
  };

  // ✅ Delete handler
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this video?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        alert("Video deleted successfully");
        fetchVideos();
      } catch (err) {
        console.error("Error deleting video:", err);
      }
    }
  };

  return (
    <div className="videos-container">
      <h1>🎬 Video Management</h1>

      <form className="video-form" onSubmit={handleSubmit}>
        <h2>{editId ? "Edit Video" : "Add New Video"}</h2>

        <div className="form-group">
          <input
            type="text"
            name="video_url"
            placeholder="Enter Video URL"
            value={formData.video_url}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="orderno"
            placeholder="Enter Order No"
            value={formData.orderno}
            onChange={handleChange}
            required
          />
        </div>

        <button className="btn-submit" type="submit">
          {editId ? "Update Video" : "Add Video"}
        </button>
      </form>

      {loading ? (
        <p>Loading videos...</p>
      ) : (
        <div className="video-cards">
          {videos.map((video) => (
            <div className="video-card" key={video.id}>
              <div className="video-content">
                <h3 className="video-title">Video #{video.orderno}</h3>
                <p>
                  <strong>URL: </strong>
                  <a href={video.video_url} target="_blank" rel="noreferrer">
                    {video.video_url}
                  </a>
                </p>
                <p>
                  <strong>Created:</strong>{" "}
                  {new Date(video.created_at).toLocaleString()}
                </p>
              </div>
              <div className="video-actions">
                <button className="btn-edit" onClick={() => handleEdit(video)}>
                  Edit
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(video.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
