// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/SideBar/Sidebar";

// Pages
import Dashboard from "./pages/Dashboard/Dashboard";
import OurFoodServices from "./pages/OurFoodServices/OurFoodServices";
import MenuDetailPage from "./pages/MenuDetail/MenuDetail"; 
import FoodList from "./pages/FoodList/FoodList";
import FoodsItems from "./pages/FoodsItems/FoodsItems";
import WeeklyMenu from "./pages/WeeklyMenu/WeeklyMenu";
import QuotationPage from "./pages/QuotationPage/QuotationPage";
import Orders from "./pages/Orders/Orders";
import Table2Page from "./pages/WeeklyMenu/Table2Page"; 
import Videos from "./pages/videos/Videos";

function App() {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        {/* Sidebar always visible */}
        <Sidebar />

        {/* Page Content */}
        <div style={{ marginLeft: "250px", padding: "20px", flex: 1 }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/ourfoodservices" element={<OurFoodServices />} />
            <Route path="/menu/:id" element={<MenuDetailPage />} />
            <Route path="/foodlist" element={<FoodList />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/quotations" element={<QuotationPage />} />
            <Route path="/weekly menu" element={<WeeklyMenu />} />
            <Route path="/weekly-details/:menuId" element={<Table2Page />} />

            {/* ✅ FoodsItems with categoryId */}
            <Route path="/foodsitems/:id" element={<FoodsItems />} />

            {/* Optional: Redirect default /foodsitems to Veg category */}
            <Route path="/foodsitems" element={<Navigate to="/foodsitems/1" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
