import { useState } from "react"
import api from "../../service/api"
import { useEffect } from "react"
import toast from "react-hot-toast"

const AdminProductRequest=()=>{
    const [requests,setRequests]=useState([])

    const getRequest=async()=>{
        try{
            const res=await api.get("/admin/productrequest")

            if(res.data.success){
                setRequests(res.data.request)
            }
        }catch(err){
            console.log(err);
            
        }   
 
    }

    // approve request

    const approveProduct=async(id)=>{
        try{
            const res=await api.patch(`/admin/approverequest/${id}`)
            console.log(res.data);

            if(res.data.success){
                toast.success("Product approved successfully!")

                getRequest()
            }
            
        }catch(err){
            console.log(err);
            
        }
    }

    // reject request

    // const rejectProduct=async(id)=>{
    //     try{
    //         const res=await api.patch(`/admin/rejectrequest/${id}`)

    //         if(res.data.success){
    //             alert("Product request rejected")
    //         }

    //         getRequest()
    //     }catch(err){
    //         console.log(err);
            
    //     }
    // }

    const rejectProduct = async (id) => {
    try {

        console.log("REJECT ID:", id);

        const res = await api.patch(
            `/admin/rejectrequest/${id}`
        );

        console.log("REJECT RESPONSE:", res.data);

        if (res.data.success) {
            toast.success("Product request rejected");
            getRequest();
        }

    } catch (err) {

        console.log("STATUS:", err.response?.status);
        console.log("ERROR DATA:", err.response?.data);

        toast.error(
            err.response?.data?.message || "Reject failed"
        );
    }
};

    useEffect(()=>{
        getRequest()
    },[])

    
    return(
        <div className="product-request-page">

            <div className="page-header">
                <h1>Product Requests</h1>

                <p>Review and manage product request from users. Approve or reject request as needed</p>
            </div>
            
            <div className="request-list">
                
            {requests.length===0?(
                <p>No product request found</p>
            ):(
                requests.map((request)=>(
                    <div className="request-card" key={request._id}>

                        <div className="request-image">
                            <img src={request.images?.[0]?.url}
                            alt={request.title} />
                        </div>

                        <div className="request-info">
                            <h2>{request.title}</h2>

                            <p>
                                <strong>Owner:</strong>{" "}
                                {request.ownerId?.name}
                            </p>

                            <p>
                                <strong>Email:</strong>{" "}
                                {request.ownerId?.email}
                            </p>

                            <p>
                                <strong>Rent Price:</strong>{" "}
                                ₹{request.rentPrice}/ day
                            </p>

                            <p>
                                <strong>Deposit:</strong>{" "}
                                ₹{request.deposit}
                            </p>

                            <p>
                                <strong>Category:</strong>{" "}
                                {request.category}
                            </p>

                            <p>
                                <strong>Subcategory:</strong>{" "}
                                {request.subcategory}
                            </p>
                        </div>

                        <div className="request-actions">
                            <span className={`status ${request.status}`}>
                                {request.status}
                            </span>

                            
                        {request.status==="pending" && (
                            <div className="action-button">
                                <button className="approve-btn" onClick={()=>approveProduct(request._id)}>
                                    Approve
                                </button>

                                <button className="reject-btn" onClick={()=>rejectProduct(request._id)}>
                                    Reject
                                </button>
                            </div>
                        )}

                        </div>
                        
                    </div>
                ))
            )} 
            </div>

        </div>
    )
}

export default AdminProductRequest