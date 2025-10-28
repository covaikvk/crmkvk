import axios from "axios";
import { base_url } from "../../api/api"; // import your base URL

// Backend route for menus
const API_URL = `${base_url}/api/menu/menus`;

// GET all menus
export const getMenus = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// POST (create new menu item)
export const createMenu = async (menu) => {
  const response = await axios.post(API_URL, menu);
  return response.data;
};

// PUT (update menu item by ID)
export const updateMenu = async (id, menu) => {
  const response = await axios.put(`${API_URL}/${id}`, menu);
  return response.data;
};

// DELETE (delete menu item by ID)
export const deleteMenu = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
