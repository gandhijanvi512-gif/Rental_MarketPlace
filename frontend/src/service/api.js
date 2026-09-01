import axios from "axios"

// const api=axios.create({
//     baseURL:import.meta.env.VITE_API_URL,
//     //  baseURL:" https://applaud-gala-atypical.ngrok-free.dev",
//     withCredentials:true

// })

const getBaseURL=()=>{
  const envURL=import.meta.env.VITE_API_URL;

  if(typeof window!=="undefined"){
    if(envURL && envURL.includes("localhost") && window.location.hostname!=="localhost"){
      return envURL.replace("localhost",window.location.hostname)
    }
  }
  return envURL || (typeof window!=="undefined"?`http://${window.location.hostname}:5200`:"http://localhost:5200");
}

const api=axios.create({
  baseURL:getBaseURL(),
  withCredentials:true
})

api.interceptors.request.use((config)=>{
  const token=localStorage.getItem("admintoken") ||
              localStorage.getItem("accesstoken");
  

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
