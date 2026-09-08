import { useState } from "react"
import api from "../../service/api"
import { useEffect } from "react"

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

    useEffect(()=>{
        getRequest()
    },[])

    
    return(
        <div>
            <h2>Product Request</h2>

            {requests.map((request)=>(
                <div key={request._id}>
                    <h3>{request.title}</h3>

                    <p>
                        Owner:{request.ownerId?.name}
                    </p>

                    <p>
                        Rent Price:{request.ownerId?.rentPrice}
                    </p>

                    <p>
                        Status:{request.status}
                    </p>
                </div>
            ))}
        </div>
    )
}

export default AdminProductRequest