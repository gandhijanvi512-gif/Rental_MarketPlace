import { useState } from "react"
import api from "../../service/api";
import { useNavigate } from "react-router-dom";

const AdminSignin=()=>{

    const navigate=useNavigate()

    const [formData,setFormData]=useState({email:"",password:""});
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState("")

    const handleChange=(e)=>{
        const {name,value}=e.target

        setFormData((prev)=>({
            ...prev,
            [name]:value
        }))
    }


    const handleSubmit=async(e)=>{
        e.preventDefault()

        setError("");
        setLoading(true)

        try{
            const res=await api.post("/admin/signin",{
                email:formData.email,
                password:formData.password
            },{
                withCredentials:true
            })
            console.log("ADMIN LOGIN RESPONSE:", res.data);

            if(!res.data.success){
                setError(res.data.message||
                    "Login Failed");
                return
            }

            // const user=res.data.user
            const token=res.data.token || res.data.admintoken;

            if(token){
                localStorage.setItem("admintoken",token)
            }

            // if(!user?.role?.includes("admin")){
            //     setError("You are not authorized as an admin.")
            //     return
            // }

            navigate("/admin/dashboard")

        } catch (err) {
            

    setError(
        err.response?.data?.message ||
        "Something Went Wrong. Please Try Again"
    );

            
        }finally{
            setLoading(false)
        }
    }

    return(
        <div className="admin-signin-page">
            <div className="admin-signin-card">
                <div className="admin-signin-header">
                    <h1>Sign In</h1>
                    <p>Sign in to access the admin panel</p>
                </div>

                {error && (
                    <div className="admin-error">
                        ⚠️{error}
                    </div>
                )}


                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label> Email Address</label>

                        <input type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="📧 Enter admin email"
                            required
                        />                        
                    </div>

                    <div className="form-group">
                        <label>Password</label>

                        <input type="password" 
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="🔒 Enter your password"
                            required
                            />
                    </div>


                    <button
                        type="submit"
                        disabled={loading}
                        className="admin-signin-btn"
                    >
                        {loading ? "⏳Signing In..." : "🚀Sign In"}
                    </button>
                </form>

            </div>

        </div>
    )
}


export default AdminSignin