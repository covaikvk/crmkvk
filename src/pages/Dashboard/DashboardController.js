import axios from "axios";
import { base_url } from "../../api/api"; // import the base URL

// src/pages/DashboardController.js


const API_URL = `${base_url}/api/todayspecial`; // your backend route

// GET all specials
export const getTodaysSpecial = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// POST (create new special)
export const createTodaysSpecial = async (special) => {
  const response = await axios.post(API_URL, special);
  return response.data;
};

// PUT (update special by ID)
export const updateTodaysSpecial = async (id, special) => {
  const response = await axios.put(`${API_URL}/${id}`, special);
  return response.data;
};

// DELETE (delete special by ID)
export const deleteTodaysSpecial = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
