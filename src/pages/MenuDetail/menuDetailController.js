// src/pages/MenuDetail/MenuDetailController.js
import axios from "axios";
import { base_url } from "../../api/api"; // ✅ make sure base_url = https://kvk-backend.onrender.com

// Main API for menus
const API_URL = `${base_url}/api/menu/menulist`;

// GET all menus
export const getMenus = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// GET menus by menu id (separate API)
export const getMenusByMenuId = async (menuId) => {
  const response = await axios.get(`${base_url}/api/menu/menulist_by_menuid/${menuId}`);
  return response.data;
};

// POST - create new menu
export const createMenu = async (menu) => {
  const response = await axios.post(API_URL, menu);
  return response.data;
};

// PUT - update menu by ID
export const updateMenu = async (id, menu) => {
  const response = await axios.put(`${API_URL}/${id}`, menu);
  return response.data;
};

// DELETE - delete menu by ID
export const deleteMenu = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
