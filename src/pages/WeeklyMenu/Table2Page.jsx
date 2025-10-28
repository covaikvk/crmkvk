// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from "axios";
// import { base_url } from "../../api/api";
// import "./Table2Page.css";

// const Table2Page = () => {
//   const { menuId } = useParams();
//   const [table2Data, setTable2Data] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);
//   const [form, setForm] = useState({
//     id: null,
//     sunday: { items: [] },
//     monday: { items: [] },
//     tuesday: { items: [] },
//     wednesday: { items: [] },
//     thursday: { items: [] },
//     friday: { items: [] },
//     saturday: { items: [] },
//     days_and_price: []
//   });

//   useEffect(() => {
//     fetchTable2();
//   }, [menuId]);

//   const fetchTable2 = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(`${base_url}/api/regularmenu/tabel_listid/${menuId}`);
//       setTable2Data(res.data || []);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching table 2 data:", error);
//       setLoading(false);
//     }
//   };

//   const handleChangeItem = (day, index, value) => {
//     const newItems = [...form[day].items];
//     newItems[index] = value;
//     setForm(prev => ({ ...prev, [day]: { items: newItems } }));
//   };

//   const addItem = day => {
//     setForm(prev => ({ ...prev, [day]: { items: [...prev[day].items, ""] } }));
//   };

//   const handleDaysPriceChange = (index, key, value) => {
//     const newArr = [...form.days_and_price];
//     newArr[index][key] = key === "day" || key === "price" ? Number(value) : value;
//     setForm(prev => ({ ...prev, days_and_price: newArr }));
//   };

//   const addDaysPrice = () => {
//     setForm(prev => ({ ...prev, days_and_price: [...prev.days_and_price, { day: 1, price: 0 }] }));
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();
//     const payload = {
//       regularmenu_id: Number(menuId),
//       sunday: form.sunday,
//       monday: form.monday,
//       tuesday: form.tuesday,
//       wednesday: form.wednesday,
//       thursday: form.thursday,
//       friday: form.friday,
//       saturday: form.saturday,
//       days_and_price: form.days_and_price
//     };

//     try {
//       if (isEditing) {
//         await axios.put(`${base_url}/api/regularmenu/tablelist/${form.id}`, payload);
//         alert("Weekly details updated successfully");
//       } else {
//         await axios.post(`${base_url}/api/regularmenu/tablelist`, payload);
//         alert("Weekly details added successfully");
//       }
//       setForm({
//         id: null,
//         sunday: { items: [] },
//         monday: { items: [] },
//         tuesday: { items: [] },
//         wednesday: { items: [] },
//         thursday: { items: [] },
//         friday: { items: [] },
//         saturday: { items: [] },
//         days_and_price: []
//       });
//       setIsEditing(false);
//       fetchTable2();
//     } catch (error) {
//       console.error("Error saving weekly details:", error);
//       alert("Failed to save weekly details");
//     }
//   };

//   const handleEdit = row => {
//     setForm({
//       id: row.id,
//       sunday: row.sunday || { items: [] },
//       monday: row.monday || { items: [] },
//       tuesday: row.tuesday || { items: [] },
//       wednesday: row.wednesday || { items: [] },
//       thursday: row.thursday || { items: [] },
//       friday: row.friday || { items: [] },
//       saturday: row.saturday || { items: [] },
//       days_and_price: row.days_and_price || []
//     });
//     setIsEditing(true);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleDelete = async id => {
//     if (!window.confirm("Are you sure you want to delete this row?")) return;
//     try {
//       await axios.delete(`${base_url}/api/regularmenu/tabel_listid/${id}`);
//       alert("Weekly detail deleted successfully");
//       fetchTable2();
//     } catch (error) {
//       console.error("Error deleting weekly detail:", error);
//       alert("Failed to delete weekly detail");
//     }
//   };

//   if (loading) return <p style={{ textAlign: "center" }}>Loading weekly details...</p>;

//   return (
//     <div className="table2-container">
//       <h1>Weekly Details</h1>
//       <Link to="/" className="btn-back">← Back to Weekly Menu</Link>

//       <form onSubmit={handleSubmit} className="table2-form">
//         <h2>{isEditing ? "Edit Weekly Detail" : "Add New Weekly Detail"}</h2>

//         {["sunday","monday","tuesday","wednesday","thursday","friday","saturday"].map(day => (
//           <div key={day} className="day-input">
//             <label>{day.charAt(0).toUpperCase() + day.slice(1)}</label>
//             <div className="items-container">
//               {form[day].items.map((item, index) => (
//                 <input
//                   key={index}
//                   value={item}
//                   onChange={e => handleChangeItem(day, index, e.target.value)}
//                   placeholder="Enter food item"
//                 />
//               ))}
//               <button type="button" className="btn-small" onClick={() => addItem(day)}>+ Add Item</button>
//             </div>
//           </div>
//         ))}

//         <div className="days-price-input">
//           <label>Days & Price</label>
//           {form.days_and_price.map((obj, index) => (
//             <div key={index} className="day-price-row">
//               <input
//                 type="number"
//                 placeholder="Day"
//                 value={obj.day}
//                 onChange={e => handleDaysPriceChange(index, "day", e.target.value)}
//               />
//               <input
//                 type="number"
//                 placeholder="Price"
//                 value={obj.price}
//                 onChange={e => handleDaysPriceChange(index, "price", e.target.value)}
//               />
//             </div>
//           ))}
//           <button type="button" className="btn-small" onClick={addDaysPrice}>+ Add Day Price</button>
//         </div>

//         <button type="submit" className="btn-submit">Submit</button>
//       </form>

//       <div className="cards-container">
//         {table2Data.map(row => (
//           <div key={row.id} className="card">
//             <div className="card-header">
//               <h3>ID: {row.id}</h3>
//               <div className="card-actions">
//                 <button className="btn-small" onClick={() => handleEdit(row)}>Edit</button>
//                 <button className="btn-small btn-delete" onClick={() => handleDelete(row.id)}>Delete</button>
//               </div>
//             </div>
//             <div className="card-content">
//               {["sunday","monday","tuesday","wednesday","thursday","friday","saturday"].map(day => (
//                 <p key={day}><strong>{day.charAt(0).toUpperCase() + day.slice(1)}:</strong> {JSON.stringify(row[day].items || row[day])}</p>
//               ))}
//               <p><strong>Days & Price:</strong> {JSON.stringify(row.days_and_price)}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Table2Page;








import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { base_url } from "../../api/api";
import "./Table2Page.css";

const Table2Page = () => {
  const { menuId } = useParams();
  const [table2Data, setTable2Data] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    tablelist_id: null,
    sunday: { items: [] },
    monday: { items: [] },
    tuesday: { items: [] },
    wednesday: { items: [] },
    thursday: { items: [] },
    friday: { items: [] },
    saturday: { items: [] },
    days_and_price: []
  });

  useEffect(() => {
    fetchTable2();
  }, [menuId]);

  const fetchTable2 = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${base_url}/api/regularmenu/tabel_listid/${menuId}`);
      console.log("Fetched data:", res.data);
      setTable2Data(res.data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching table 2 data:", error);
      setLoading(false);
    }
  };

  const handleChangeItem = (day, index, value) => {
    const newItems = [...form[day].items];
    newItems[index] = value;
    setForm(prev => ({ 
      ...prev, 
      [day]: { ...prev[day], items: newItems } 
    }));
  };

  const removeItem = (day, index) => {
    const newItems = form[day].items.filter((_, i) => i !== index);
    setForm(prev => ({ 
      ...prev, 
      [day]: { ...prev[day], items: newItems } 
    }));
  };

  const addItem = day => {
    setForm(prev => ({ 
      ...prev, 
      [day]: { ...prev[day], items: [...prev[day].items, ""] } 
    }));
  };

  const handleDaysPriceChange = (index, key, value) => {
    const newArr = [...form.days_and_price];
    newArr[index] = { ...newArr[index], [key]: key === "day" || key === "price" ? Number(value) : value };
    setForm(prev => ({ ...prev, days_and_price: newArr }));
  };

  const removeDaysPrice = (index) => {
    const newArr = form.days_and_price.filter((_, i) => i !== index);
    setForm(prev => ({ ...prev, days_and_price: newArr }));
  };

  const addDaysPrice = () => {
    setForm(prev => ({ 
      ...prev, 
      days_and_price: [...prev.days_and_price, { day: 1, price: 0 }] 
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    
    // Validate form
    const hasItems = Object.keys(form).some(key => 
      key !== 'tablelist_id' && key !== 'days_and_price' && form[key]?.items?.some(item => item.trim() !== "")
    );
    
    if (!hasItems && form.days_and_price.length === 0) {
      alert("Please add at least one item or day-price entry");
      return;
    }

    // Clean the data - remove empty items
    const cleanedForm = { ...form };
    const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    
    days.forEach(day => {
      cleanedForm[day] = {
        items: cleanedForm[day].items.filter(item => item.trim() !== "")
      };
    });

    const payload = {
      regularmenu_id: Number(menuId),
      sunday: cleanedForm.sunday,
      monday: cleanedForm.monday,
      tuesday: cleanedForm.tuesday,
      wednesday: cleanedForm.wednesday,
      thursday: cleanedForm.thursday,
      friday: cleanedForm.friday,
      saturday: cleanedForm.saturday,
      days_and_price: cleanedForm.days_and_price
    };

    console.log("Submitting payload:", payload);
    console.log("Is editing:", isEditing);
    console.log("Form ID:", form.tablelist_id);

    try {
      let response;
      if (isEditing && form.tablelist_id) {
        // Try multiple possible update endpoints
        console.log("Attempting UPDATE...");
        
        // Try endpoint 1
        try {
          response = await axios.put(`${base_url}/api/regularmenu/tablelist/${form.tablelist_id}`, payload);
          console.log("Update successful with endpoint 1");
        } catch (error1) {
          console.log("Endpoint 1 failed, trying endpoint 2...");
          // Try endpoint 2 - sometimes APIs use POST for updates too
          response = await axios.post(`${base_url}/api/regularmenu/tablelist/${form.tablelist_id}`, payload);
          console.log("Update successful with endpoint 2");
        }
        
        alert("Weekly details updated successfully");
      } else {
        // CREATE new record
        console.log("Attempting CREATE...");
        response = await axios.post(`${base_url}/api/regularmenu/tablelist`, payload);
        console.log("Create successful:", response.data);
        alert("Weekly details added successfully");
      }
      
      resetForm();
      fetchTable2(); // Refresh the list
    } catch (error) {
      console.error("Error saving weekly details:", error);
      console.error("Error details:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      alert(`Failed to save weekly details: ${error.response?.data?.message || error.message}`);
    }
  };

  const resetForm = () => {
    setForm({
      tablelist_id: null,
      sunday: { items: [] },
      monday: { items: [] },
      tuesday: { items: [] },
      wednesday: { items: [] },
      thursday: { items: [] },
      friday: { items: [] },
      saturday: { items: [] },
      days_and_price: []
    });
    setIsEditing(false);
  };

  const handleEdit = row => {
    console.log("Editing row:", row);
    
    // Ensure all days have the proper structure
    const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const formattedData = { tablelist_id: row.tablelist_id };
    
    days.forEach(day => {
      // Handle both {items: []} format and direct array format
      if (row[day] && Array.isArray(row[day])) {
        formattedData[day] = { items: row[day] };
      } else if (row[day] && row[day].items) {
        formattedData[day] = { items: row[day].items };
      } else {
        formattedData[day] = { items: [] };
      }
    });
    
    formattedData.days_and_price = row.days_and_price || [];
    
    console.log("Formatted data for edit:", formattedData);
    setForm(formattedData);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async tablelist_id => {
    if (!window.confirm("Are you sure you want to delete this weekly detail? This action cannot be undone.")) return;
    
    try {
      console.log("Attempting to delete ID:", tablelist_id);
      
      // Try multiple possible delete endpoints
      let response;
      try {
        // Try endpoint 1
        response = await axios.delete(`${base_url}/api/regularmenu/tablelist/${tablelist_id}`);
        console.log("Delete successful with endpoint 1");
      } catch (error1) {
        console.log("Endpoint 1 failed, trying endpoint 2...");
        // Try endpoint 2 - the one from your fetch
        response = await axios.delete(`${base_url}/api/regularmenu/tablelist/${tablelist_id}`);
        console.log("Delete successful with endpoint 2");
      }
      
      alert("Weekly detail deleted successfully");
      fetchTable2(); // Refresh the list
    } catch (error) {
      console.error("Error deleting weekly detail:", error);
      console.error("Delete error details:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      alert(`Failed to delete weekly detail: ${error.response?.data?.message || error.message}`);
    }
  };

  const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading weekly details...</p>
    </div>
  );

  return (
    <div className="table2-container">
      <div className="header-section">
        <div className="header-content">
          <h1>📅 Weekly Menu Details</h1>
          <p>Manage your weekly meal plans and pricing</p>
          <div className="debug-info">
            <small>Menu ID: {menuId} | Editing: {isEditing ? `Yes (ID: ${form.tablelist_id})` : 'No'}</small>
          </div>
        </div>
        <Link to="/" className="btn-back">
          ← Back to Weekly Menu
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="table2-form">
        <div className="form-header">
          <h2>
            {isEditing ? (
              <>
                ✏️ Editing Weekly Plan #{form.tablelist_id}
                <span className="edit-badge">EDIT MODE</span>
              </>
            ) : (
              "➕ Add New Weekly Detail"
            )}
          </h2>
          {isEditing && (
            <button type="button" className="btn-cancel" onClick={resetForm}>
              Cancel Edit
            </button>
          )}
        </div>

        <div className="days-grid">
          {days.map(day => (
            <div key={day} className="day-card">
              <div className="day-header">
                <label>{day.charAt(0).toUpperCase() + day.slice(1)}</label>
                <button type="button" className="btn-add-item" onClick={() => addItem(day)}>
                  + Add Item
                </button>
              </div>
              <div className="items-container">
                {form[day].items.map((item, index) => (
                  <div key={index} className="item-input-group">
                    <input
                      value={item}
                      onChange={e => handleChangeItem(day, index, e.target.value)}
                      placeholder={`Enter ${day} item...`}
                      className="item-input"
                    />
                    <button 
                      type="button" 
                      className="btn-remove"
                      onClick={() => removeItem(day, index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
                {form[day].items.length === 0 && (
                  <p className="no-items">No items added yet</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="days-price-section">
          <div className="section-header">
            <label>Days & Price Configuration</label>
            <button type="button" className="btn-small btn-primary" onClick={addDaysPrice}>
              + Add Day Price
            </button>
          </div>
          <div className="days-price-grid">
            {form.days_and_price.map((obj, index) => (
              <div key={index} className="day-price-card">
                <div className="day-price-inputs">
                  <div className="input-group">
                    <label>Day</label>
                    <input
                      type="number"
                      min="1"
                      value={obj.day}
                      onChange={e => handleDaysPriceChange(index, "day", e.target.value)}
                      className="input-field"
                    />
                  </div>
                  <div className="input-group">
                    <label>Price ($)</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={obj.price}
                      onChange={e => handleDaysPriceChange(index, "price", e.target.value)}
                      className="input-field"
                    />
                  </div>
                </div>
                <button 
                  type="button" 
                  className="btn-remove"
                  onClick={() => removeDaysPrice(index)}
                >
                  ×
                </button>
              </div>
            ))}
            {form.days_and_price.length === 0 && (
              <p className="no-items">No day-price entries added yet</p>
            )}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-submit">
            {isEditing ? "💾 Update Weekly Details" : "✨ Create Weekly Details"}
          </button>
          {isEditing && (
            <button type="button" className="btn-cancel" onClick={resetForm}>
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      <div className="content-section">
        <h2>📋 Existing Weekly Details ({table2Data.length})</h2>
        {table2Data.length === 0 ? (
          <div className="empty-state">
            <p>No weekly details found. Create your first one above!</p>
          </div>
        ) : (
          <div className="cards-grid">
            {table2Data.map(row => (
              <div key={row.tablelist_id} className={`card ${isEditing && form.tablelist_id === row.tablelist_id ? 'card-editing' : ''}`}>
                <div className="card-header">
                  <div className="card-title">
                    <h3>Weekly Plan #{row.tablelist_id}</h3>
                    <span className="badge">ID: {row.tablelist_id}</span>
                  </div>
                  <div className="card-actions">
                    <button className="btn-edit" onClick={() => handleEdit(row)}>
                      ✏️ Edit
                    </button>
                    <button className="btn-delete" onClick={() => handleDelete(row.tablelist_id)}>
                      🗑️ Delete
                    </button>
                  </div>
                </div>
                <div className="card-content">
                  {days.map(day => {
                    // Handle different data formats from API
                    let items = [];
                    if (row[day]) {
                      if (Array.isArray(row[day])) {
                        items = row[day];
                      } else if (row[day].items && Array.isArray(row[day].items)) {
                        items = row[day].items;
                      }
                    }
                    
                    return (
                      <div key={day} className="day-content">
                        <strong>{day.charAt(0).toUpperCase() + day.slice(1)}:</strong>
                        <div className="items-list">
                          {items.filter(item => item && item.trim() !== "").map((item, idx) => (
                            <span key={idx} className="item-tag">{item}</span>
                          ))}
                          {items.length === 0 && (
                            <span className="no-item">No items</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                  {row.days_and_price && row.days_and_price.length > 0 && (
                    <div className="days-price-content">
                      <strong>Days & Price:</strong>
                      <div className="price-tags">
                        {row.days_and_price.map((dp, idx) => (
                          <span key={idx} className="price-tag">
                            {dp.day} day{dp.day > 1 ? 's' : ''}: ${dp.price}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Table2Page;