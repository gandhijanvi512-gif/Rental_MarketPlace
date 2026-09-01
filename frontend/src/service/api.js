import axios from "axios"

// const api=axios.create({
//     baseURL:import.meta.env.VITE_API_URL,
//     //  baseURL:" https://applaud-gala-atypical.ngrok-free.dev",
//     withCredentials:true

// })

const getBaseURL=()=>{
  const envURL=import.meta.env.VITE_API_URL;

  if(typeof window!=="undefined"){
    const hostname=window.location.hostname;

    if(hostname && hostname!=="localhost" && hostname!="127.0.0.1"){
      if(envURL && envURL.includes("localhost")){
        return envURL.replace("localhost",hostname)
      }
    }
  }
  return envURL || "http://localhost:5200"
}

const api=axios.create({
  baseURL:getBaseURL(),
  withCredentials:true
})

api.interceptors.request.use((config)=>{
  const url = config.url || "";
  const isAdminUrl = url.startsWith("/admin") || 
                     url.startsWith("/alluser") || 
                     url.startsWith("/deleteuser") || 
                     url.startsWith("/user/") || 
                     url.startsWith("/getadminoverview") || 
                     url.startsWith("/getbookingbystatus") || 
                     url.startsWith("/getowneranalytics") || 
                     url.startsWith("/topproducts") || 
                     url.startsWith("/getadminproducts");

  let token = null;
  if (isAdminUrl) {
    token = localStorage.getItem("admintoken") || localStorage.getItem("accesstoken");
  } else {
    token = localStorage.getItem("accesstoken");
  }
  

  if(token){
    config.headers.Authorization=`Bearer ${token}`
  }
  return config
})


// Response Interceptor: handles 401 Unauthorized cleanup
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const url = error.config?.url || "";
      if (url.includes("/getme")) {
        localStorage.removeItem("accesstoken");
        localStorage.removeItem("refreshtoken");
      } else if (url.includes("/admin/check") || url.includes("/admin/signin")) {
        localStorage.removeItem("admintoken");
      }
    }
    return Promise.reject(error);
  }
);

export const getProducts = (params) =>
  api.get("/products", { params });

export const getProductById = (id) =>
  api.get(`/products/${id}`);

export const getProductReviews = (id) =>
  api.get(`/products/${id}/reviews`);

export default api
