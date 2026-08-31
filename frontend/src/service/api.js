import axios from "axios"

const api=axios.create({
    baseURL:import.meta.env.VITE_API_URL,
    //  baseURL:" https://applaud-gala-atypical.ngrok-free.dev",
    withCredentials:true

})

export const getProducts = (params) =>
  api.get("/products", { params });

export const getProductById = (id) =>
  api.get(`/products/${id}`);

export const getProductReviews = (id) =>
  api.get(`/products/${id}/reviews`);

export default api
