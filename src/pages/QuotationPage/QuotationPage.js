// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { motion, AnimatePresence } from "framer-motion";

// export default function QuotationPage() {
//   const [quotations, setQuotations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedQuotation, setSelectedQuotation] = useState(null);
//   const [gstPercent, setGstPercent] = useState(18); // default 18% GST

//   useEffect(() => {
//     const fetchQuotations = async () => {
//       try {
//         const response = await axios.get(
//           "https://kvk-backend.onrender.com/api/quotations"
//         );
//         setQuotations(response.data);
//       } catch (error) {
//         console.error("Error fetching quotations:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchQuotations();
//   }, []);

//   const handleAmountChange = (index, value) => {
//     const updatedItems = [...selectedQuotation.list];
//     updatedItems[index].amount = Number(value);
//     setSelectedQuotation({ ...selectedQuotation, list: updatedItems });
//   };

//   // Calculate subtotal
//   const subtotal = selectedQuotation
//     ? selectedQuotation.list.reduce((sum, item) => sum + (item.amount || 0), 0)
//     : 0;

//   // Calculate GST and total
//   const gstAmount = (subtotal * gstPercent) / 100;
//   const totalAmount = subtotal + gstAmount;

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.title}>📋 Customer Quotations</h1>

//       {loading ? (
//         <p style={styles.loading}>Loading...</p>
//       ) : (
//         <div style={styles.cardGrid}>
//           {quotations.map((q) => (
//             <motion.div
//               key={q.id}
//               style={styles.card}
//               whileHover={{ scale: 1.05, boxShadow: "0 15px 30px rgba(0,0,0,0.3)" }}
//               onClick={() => setSelectedQuotation(q)}
//             >
//               <div style={styles.cardHeader}>
//                 <h2>{q.name}</h2>
//                 <span>{new Date(q.created_at).toLocaleString()}</span>
//               </div>
//               <div style={styles.cardBody}>
//                 <p>
//                   <strong>Phone:</strong> {q.phone} | <strong>WhatsApp:</strong>{" "}
//                   {q.whatsappNumber}
//                 </p>
//                 <p>
//                   <strong>Address:</strong> {q.address1}, {q.address2},{" "}
//                   {q.city}, {q.state} - {q.pincode}
//                 </p>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       )}

//       {/* Modal */}
//       <AnimatePresence>
//         {selectedQuotation && (
//           <motion.div
//             style={styles.modalOverlay}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={() => setSelectedQuotation(null)}
//           >
//             <motion.div
//               style={styles.modalContent}
//               initial={{ scale: 0.8, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.8, opacity: 0 }}
//               transition={{ duration: 0.3 }}
//               onClick={(e) => e.stopPropagation()}
//             >
//               <h2 style={styles.modalTitle}>Items for {selectedQuotation.name}</h2>

//               <div style={styles.itemsList}>
//                 {selectedQuotation.list.map((item, index) => (
//                   <div key={index} style={styles.itemRow}>
//                     <span>{item.item}</span>
//                     <input
//                       type="number"
//                       placeholder="Amount"
//                       value={item.amount || ""}
//                       onChange={(e) =>
//                         handleAmountChange(index, e.target.value)
//                       }
//                       style={styles.amountInput}
//                     />
//                   </div>
//                 ))}
//               </div>

//               <div style={styles.gstRow}>
//                 <label>GST %:</label>
//                 <input
//                   type="number"
//                   value={gstPercent}
//                   onChange={(e) => setGstPercent(Number(e.target.value))}
//                   style={styles.gstInput}
//                 />
//               </div>

//               <h3 style={styles.total}>Subtotal: ₹{subtotal}</h3>
//               <h3 style={styles.total}>GST: ₹{gstAmount.toFixed(2)}</h3>
//               <h2 style={styles.total}>Total: ₹{totalAmount.toFixed(2)}</h2>

//               <button
//                 style={styles.closeButton}
//                 onClick={() => setSelectedQuotation(null)}
//               >
//                 Close
//               </button>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// // 💅 Styles
// const styles = {
//   container: {
//     marginLeft: "270px",
//     padding: "30px",
//     minHeight: "100vh",
//     background: "linear-gradient(180deg, #f0f2f5, #e2e8f0)",
//     fontFamily: "'Poppins', sans-serif",
//   },
//   title: {
//     fontSize: "28px",
//     color: "#145a32",
//     marginBottom: "20px",
//     borderBottom: "3px solid #27ae60",
//     paddingBottom: "10px",
//   },
//   loading: {
//     fontSize: "18px",
//     color: "#555",
//   },
//   cardGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
//     gap: "20px",
//   },
//   card: {
//     background: "rgba(255, 255, 255, 0.2)",
//     backdropFilter: "blur(15px)",
//     borderRadius: "15px",
//     padding: "20px",
//     cursor: "pointer",
//     transition: "all 0.3s ease",
//     border: "1px solid rgba(255,255,255,0.3)",
//   },
//   cardHeader: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: "15px",
//     fontWeight: "600",
//     color: "#0b3d0b",
//   },
//   cardBody: {
//     color: "#333",
//     lineHeight: "1.6",
//   },
//   modalOverlay: {
//     position: "fixed",
//     top: 0,
//     left: 0,
//     width: "100%",
//     height: "100%",
//     background: "rgba(0,0,0,0.6)",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     zIndex: 999,
//   },
//   modalContent: {
//     background: "rgba(255, 255, 255, 0.89)",
//     backdropFilter: "blur(20px)",
//     borderRadius: "20px",
//     padding: "30px",
//     width: "90%",
//     maxWidth: "550px",
//     boxShadow: "0 15px 40px rgba(0,0,0,0.3)",
//     position: "relative",
//     border: "1px solid rgba(255,255,255,0.3)",
//   },
//   modalTitle: {
//     marginBottom: "20px",
//     color: "#145a32",
//     borderBottom: "2px solid #27ae60",
//     paddingBottom: "10px",
//   },
//   itemsList: {
//     maxHeight: "250px",
//     overflowY: "auto",
//     marginBottom: "20px",
//   },
//   itemRow: {
//     display: "flex",
//     justifyContent: "space-between",
//     marginBottom: "12px",
//     alignItems: "center",
//   },
//   amountInput: {
//     width: "100px",
//     padding: "6px 12px",
//     borderRadius: "8px",
//     border: "1px solid #ccc",
//     fontWeight: "500",
//   },
//   gstRow: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: "10px",
//   },
//   gstInput: {
//     width: "80px",
//     padding: "5px 10px",
//     borderRadius: "8px",
//     border: "1px solid #ccc",
//     fontWeight: "500",
//   },
//   total: {
//     textAlign: "right",
//     fontSize: "18px",
//     color: "#0b3d0b",
//     marginBottom: "10px",
//     fontWeight: "600",
//   },
//   closeButton: {
//     padding: "10px 20px",
//     background: "#145a32",
//     color: "#fff",
//     border: "none",
//     borderRadius: "8px",
//     cursor: "pointer",
//     fontWeight: "600",
//     marginTop: "10px",
//   },
// };

// src/components/QuotationPage/QuotationPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../../assets/logo/logo1.png";
import "./QuotationPage.css";

// Icons
import { 
  FaDownload, 
  FaTimes, 
  FaEdit, 
  FaUser, 
  FaPhone, 
  FaWhatsapp, 
  FaMapMarkerAlt,
  FaCalendar,
  FaUsers,
  FaRupeeSign,
  FaFilePdf
} from "react-icons/fa";

export default function QuotationPage() {
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuotation, setSelectedQuotation] = useState(null);
  const [gstPercent, setGstPercent] = useState(18);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchQuotations = async () => {
      try {
        const response = await axios.get(
          "https://kvk-backend.onrender.com/api/quotations"
        );
        // Transform the data to handle dish names properly
        const transformedQuotations = response.data.map(quotation => ({
          ...quotation,
          // Ensure list is an array and has proper dish names
          list: Array.isArray(quotation.list) ? quotation.list.map((item, index) => ({
            ...item,
            // Use actual dish name from your application
            item: item.dishName || item.item || `Dish ${index + 1}`,
            amount: item.amount || 0
          })) : []
        }));
        setQuotations(transformedQuotations);
      } catch (error) {
        console.error("Error fetching quotations:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuotations();
  }, []);

  // Filter quotations based on search
  const filteredQuotations = quotations.filter(quotation =>
    quotation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quotation.phone.includes(searchTerm) ||
    quotation.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAmountChange = (index, value) => {
    const updatedItems = [...selectedQuotation.list];
    updatedItems[index].amount = Number(value) || 0;
    setSelectedQuotation({ ...selectedQuotation, list: updatedItems });
  };

  const subtotal = selectedQuotation
    ? selectedQuotation.list.reduce((sum, item) => sum + (item.amount || 0), 0)
    : 0;
  const gstAmount = (subtotal * gstPercent) / 100;
  const totalAmount = subtotal + gstAmount;

  // Enhanced PDF Generator
  const generatePDF = () => {
    if (!selectedQuotation) return;

    const doc = new jsPDF("p", "mm", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 15;
    let yPos = margin;

    // Set default font
    doc.setFont("helvetica");
    
    // Company Header
    doc.setFillColor(25, 85, 55);
    doc.rect(0, 0, pageWidth, 40, "F");

    // Logo
    try {
      doc.addImage(logo, "PNG", margin, 8, 25, 25);
    } catch (err) {
      console.warn("Logo not loaded:", err);
    }

    // Company Info
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.text("KANDHA VILAS KITCHEN", pageWidth / 2, 15, { align: "center" });
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Authentic Catering & Event Specialists", pageWidth / 2, 22, { align: "center" });
    
    doc.setFontSize(9);
    doc.text("Phone: +91 98765 43210 | Email: kandhavilaskitchen@gmail.com", pageWidth / 2, 28, { align: "center" });
    doc.text("Website: www.kandhavilaskitchen.in", pageWidth / 2, 33, { align: "center" });

    doc.setFontSize(8);
    doc.text("GSTIN: 29ABCDE1234F1Z5 | FSSAI: 11223344556677", pageWidth / 2, 38, { align: "center" });

    yPos = 50;

    // Quotation Title
    doc.setTextColor(25, 85, 55);
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("QUOTATION", pageWidth / 2, yPos, { align: "center" });
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    const quotationNumber = `KVK/${new Date(selectedQuotation.created_at).getFullYear()}/${selectedQuotation.id.toString().padStart(4, '0')}`;
    doc.text(`Quotation No: ${quotationNumber}`, pageWidth / 2, yPos + 6, { align: "center" });
    
    yPos += 15;

    // Customer Details
    const customer = selectedQuotation;
    
    doc.setFontSize(10);
    doc.setTextColor(0);
    
    // Bill To section
    doc.setFont("helvetica", "bold");
    doc.text("Bill To:", margin, yPos);
    doc.setFont("helvetica", "normal");
    doc.text(`Name: ${customer.name}`, margin, yPos + 6);
    doc.text(`Phone: ${customer.phone}`, margin, yPos + 12);
    doc.text(`WhatsApp: ${customer.whatsappNumber}`, margin, yPos + 18);
    doc.text(`Address: ${customer.address1}, ${customer.address2}`, margin, yPos + 24);
    doc.text(`City: ${customer.city}, ${customer.state} - ${customer.pincode}`, margin, yPos + 30);
    doc.text(`Landmark: ${customer.landmark || "N/A"}`, margin, yPos + 36);

    // Quotation Details
    const validUntil = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN');
    doc.setFont("helvetica", "bold");
    doc.text("Quotation Details:", pageWidth - margin - 60, yPos);
    doc.setFont("helvetica", "normal");
    doc.text(`Date: ${new Date(customer.created_at).toLocaleDateString('en-IN')}`, pageWidth - margin - 60, yPos + 6);
    doc.text(`Valid Until: ${validUntil}`, pageWidth - margin - 60, yPos + 12);
    doc.text(`Person Count: ${customer.numberOfPerson}`, pageWidth - margin - 60, yPos + 18);

    yPos += 45;

    // Manual Table Creation - REMOVED QUANTITY COLUMN
    const createManualTable = () => {
      let tableY = yPos;
      
      // Table Header
      doc.setFillColor(25, 85, 55);
      doc.rect(margin, tableY, pageWidth - 2 * margin, 8, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      
      const headers = ["No.", "Dish Name", "Amount (Rs)"];
      const colWidths = [15, 140, 30];
      let xPos = margin;
      
      headers.forEach((header, index) => {
        doc.text(header, xPos + colWidths[index] / 2, tableY + 5, { align: "center" });
        xPos += colWidths[index];
      });
      
      tableY += 8;
      
      // Table Rows
      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      
      customer.list.forEach((item, index) => {
        if (tableY > 250) {
          doc.addPage();
          tableY = margin;
        }
        
        // Alternate row background
        if (index % 2 === 0) {
          doc.setFillColor(245, 245, 245);
          doc.rect(margin, tableY, pageWidth - 2 * margin, 8, "F");
        }
        
        let colX = margin;
        
        // Serial Number
        doc.text((index + 1).toString(), colX + 7, tableY + 5, { align: "center" });
        colX += colWidths[0];
        
        // Dish Name - Use actual dish name from your application
        const dishName = item.dishName || item.item || `Dish ${index + 1}`;
        doc.text(dishName, colX + 5, tableY + 5);
        colX += colWidths[1];
        
        // Amount
        doc.text((item.amount || 0).toFixed(2), colX + colWidths[2] - 5, tableY + 5, { align: "right" });
        
        // Grid lines
        doc.setDrawColor(200, 200, 200);
        doc.line(margin, tableY + 8, pageWidth - margin, tableY + 8);
        
        tableY += 8;
      });
      
      return tableY;
    };

    const finalY = createManualTable() + 10;

    // Totals Section
    doc.setFillColor(245, 248, 246);
    doc.rect(120, finalY, 76, 40, "F");

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(0);

    // Subtotal
    doc.text("Subtotal:", 125, finalY + 8);
    doc.text("Rs " + subtotal.toFixed(2), 190, finalY + 8, { align: "right" });

    // GST
    doc.text("GST (" + gstPercent + "%):", 125, finalY + 16);
    doc.text("Rs " + gstAmount.toFixed(2), 190, finalY + 16, { align: "right" });

    // Line separator
    doc.setDrawColor(25, 85, 55);
    doc.line(125, finalY + 20, 190, finalY + 20);

    // Grand Total
    doc.setFont("helvetica", "bold");
    doc.setTextColor(25, 85, 55);
    doc.setFontSize(11);
    doc.text("Grand Total:", 125, finalY + 28);
    doc.text("Rs " + totalAmount.toFixed(2), 190, finalY + 28, { align: "right" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(100);
    doc.text("(Inclusive of all taxes)", 125, finalY + 33);

    // Terms and Conditions
    const termsY = finalY + 45;
    doc.setFont("helvetica", "bold");
    doc.setTextColor(25, 85, 55);
    doc.setFontSize(10);
    doc.text("Terms & Conditions:", margin, termsY);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(0);
    doc.setFontSize(8);
    const terms = [
      "1. This quotation is valid for 15 days from the date of issue.",
      "2. Prices are inclusive of all applicable taxes.",
      "3. 50% advance payment required to confirm the booking.",
      "4. Balance payment to be made before delivery/completion of service.",
      "5. Service tax/GST extra as applicable.",
      "6. Any changes in menu or services may affect the final pricing.",
      "7. Cancellation policy: 7 days prior to event - full refund, 3-7 days - 50% refund."
    ];

    terms.forEach((term, index) => {
      doc.text(term, margin, termsY + 6 + (index * 4));
    });

    // Footer
    const footerY = 270;
    doc.setDrawColor(25, 85, 55);
    doc.line(margin, footerY, pageWidth - margin, footerY);

    doc.setFontSize(9);
    doc.setTextColor(100);
    doc.text("Thank you for choosing Kandha Vilas Kitchen!", pageWidth / 2, footerY + 6, { align: "center" });
    
    doc.setFontSize(8);
    doc.text("We guarantee the highest quality and service standards", pageWidth / 2, footerY + 12, { align: "center" });

    // Authorized Signatory
    doc.setFont("helvetica", "bold");
    doc.setTextColor(25, 85, 55);
    doc.text("Authorized Signatory", pageWidth - margin - 40, footerY + 25, { align: "center" });

    // Save PDF
    const fileName = `Quotation_${customer.name.replace(/\s+/g, '_')}.pdf`;
    doc.save(fileName);
  };

  return (
    <div className="quotation-container">
      {/* Header Section */}
      <div className="quotation-header">
        <h1 className="page-title">
          <FaFilePdf className="title-icon" />
          Customer Quotations
        </h1>
        <p className="page-subtitle">Manage and generate professional quotations</p>
        
        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by name, phone, or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-count">
            {filteredQuotations.length} of {quotations.length} quotations
          </span>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading quotations...</p>
        </div>
      ) : (
        <>
          {/* Quotations Grid */}
          <div className="quotations-grid">
            {filteredQuotations.length === 0 ? (
              <div className="empty-state">
                <FaFilePdf size={48} color="#ccc" />
                <h3>No quotations found</h3>
                <p>No quotations match your search criteria</p>
              </div>
            ) : (
              filteredQuotations.map((quotation) => (
                <motion.div
                  key={quotation.id}
                  className="quotation-card"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  onClick={() => setSelectedQuotation(quotation)}
                >
                  <div className="card-header">
                    <div className="customer-info">
                      <FaUser className="info-icon" />
                      <h3 className="customer-name">{quotation.name}</h3>
                    </div>
                    <span className="quotation-date">
                      <FaCalendar className="date-icon" />
                      {new Date(quotation.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="card-body">
                    <div className="info-row">
                      <FaPhone className="icon" />
                      <span>{quotation.phone}</span>
                    </div>
                    <div className="info-row">
                      <FaWhatsapp className="icon whatsapp" />
                      <span>{quotation.whatsappNumber}</span>
                    </div>
                    <div className="info-row">
                      <FaMapMarkerAlt className="icon" />
                      <span className="address">{quotation.city}, {quotation.state}</span>
                    </div>
                    <div className="info-row">
                      <FaUsers className="icon" />
                      <span>{quotation.numberOfPerson} persons</span>
                    </div>
                  </div>

                  <div className="card-footer">
                    <span className="item-count">
                      {quotation.list.length} dishes
                    </span>
                    <motion.button
                      className="view-btn"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View Details
                    </motion.button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </>
      )}

      {/* Quotation Detail Modal */}
      <AnimatePresence>
        {selectedQuotation && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedQuotation(null)}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="modal-header">
                <h2>
                  <FaEdit className="header-icon" />
                  Quotation Details - {selectedQuotation.name}
                </h2>
                <button 
                  className="close-btn"
                  onClick={() => setSelectedQuotation(null)}
                >
                  <FaTimes />
                </button>
              </div>

              {/* Customer Info */}
              <div className="customer-details">
                <h3 className="section-title">Customer Information</h3>
                <div className="details-grid">
                  <div className="detail-item">
                    <strong>Name:</strong> {selectedQuotation.name}
                  </div>
                  <div className="detail-item">
                    <strong>Phone:</strong> {selectedQuotation.phone}
                  </div>
                  <div className="detail-item">
                    <strong>WhatsApp:</strong> {selectedQuotation.whatsappNumber}
                  </div>
                  <div className="detail-item full-width">
                    <strong>Address:</strong> {selectedQuotation.address1}, {selectedQuotation.address2}, {selectedQuotation.city}, {selectedQuotation.state} - {selectedQuotation.pincode}
                  </div>
                  <div className="detail-item">
                    <strong>Persons:</strong> {selectedQuotation.numberOfPerson}
                  </div>
                  <div className="detail-item">
                    <strong>Date:</strong> {new Date(selectedQuotation.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* Items List */}
              <div className="items-section">
                <h3 className="section-title">Menu Items & Pricing</h3>
                <div className="items-list">
                  {selectedQuotation.list.map((item, index) => (
                    <div key={index} className="item-row">
                      <div className="item-info">
                        <span className="item-name">
                          {item.dishName || item.item || `Dish ${index + 1}`}
                        </span>
                      </div>
                      <div className="amount-input-container">
                        <FaRupeeSign className="currency-icon" />
                        <input
                          type="number"
                          placeholder="0.00"
                          value={item.amount || ""}
                          onChange={(e) => handleAmountChange(index, e.target.value)}
                          className="amount-input"
                          min="0"
                          step="0.01"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* GST Configuration */}
              <div className="gst-section">
                <div className="gst-input-group">
                  <label>GST Percentage:</label>
                  <div className="gst-input-container">
                    <input
                      type="number"
                      value={gstPercent}
                      onChange={(e) => setGstPercent(Number(e.target.value))}
                      className="gst-input"
                      min="0"
                      max="100"
                      step="0.1"
                    />
                    <span className="percent-symbol">%</span>
                  </div>
                </div>
              </div>

              {/* Totals Section */}
              <div className="totals-section">
                <div className="total-row">
                  <span>Subtotal:</span>
                  <span className="amount">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="total-row">
                  <span>GST ({gstPercent}%):</span>
                  <span className="amount">₹{gstAmount.toFixed(2)}</span>
                </div>
                <div className="total-row grand-total">
                  <span>Grand Total:</span>
                  <span className="amount">₹{totalAmount.toFixed(2)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="modal-actions">
                <motion.button
                  className="btn-secondary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedQuotation(null)}
                >
                  <FaTimes className="btn-icon" />
                  Close
                </motion.button>
                <motion.button
                  className="btn-primary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={generatePDF}
                >
                  <FaDownload className="btn-icon" />
                  Generate PDF
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}