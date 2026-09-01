import axios from "axios"

// const api=axios.create({
//     baseURL:import.meta.env.VITE_API_URL,
//     //  baseURL:" https://applaud-gala-atypical.ngrok-free.dev",
//     withCredentials:true

// })

const getBaseURL=()=>{
  const envURL=import.meta.env.VITE_API_URL;

  const isValidEnv = typeof envURL === "string" && (envURL.startsWith("http://") || 
  envURL.startsWith("https://")) && !envURL.includes(process.env.VITE_API_UR);

  if(typeof window !== "undefined"){
    const hostname = window.location.hostname;

    // 1. If running on Vercel deployment
    if(hostname.endsWith(".vercel.app")){
      return "https://rental-marketplace-backend.onrender.com";

    }

     // 2. If running locally on localhost or 127.0.0.1
    if(hostname === "localhost" || hostname === "127.0.0.1"){
      if(isValidEnv){
        return envURL.replace(/\/+$/, "");
      }
      return "http://localhost:5200";
    }
    // 3. If running on LAN IP
    return `http://${hostname}:5200`;
  }
      
    

  if(isValidEnv){
     return envURL.replace(/\/+$/, "");
  }
  
    return "http://localhost:5200";
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
    token = localStorage.getItem("admintoken") || localStorage.getItem("accesstoken") || localStorage.getItem("token");
  } else {
    token = localStorage.getItem("accesstoken") || localStorage.getItem("token");
  }

   console.log("🔑 REQUEST:", url, "TOKEN FOUND:", token); 
  

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

      if(url.includes("/admin/check")||url.includes("/admin/signin")){
        localStorage.removeItem("admintoken")

      }else if(url.includes("/getme")||url.includes("/getProfile")){
        localStorage.removeItem("token");
        localStorage.removeItem("refreshtoken")
        localStorage.removeItem("refreshtoken")
        localStorage.removeItem("user")
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
