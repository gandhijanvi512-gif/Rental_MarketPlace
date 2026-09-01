import axios from "axios"

const api=axios.create({
    baseURL:import.meta.env.VITE_API_URL,
    //  baseURL:" https://applaud-gala-atypical.ngrok-free.dev",
    withCredentials:true

})

api.interceptors.request.use((config)=>{
  const token=localStorage.getItem("accesstoken");

  if(token){
    config.headers.Authorization=`Bearer ${token}`
  }
  return config
})

export const getProducts = (params) =>
  api.get("/products", { params });

export const getProductById = (id) =>
  api.get(`/products/${id}`);

export const getProductReviews = (id) =>
  api.get(`/products/${id}/reviews`);

export default api
