import { useState } from "react"
import api from "../../service/api"
import { useEffect } from "react"

const AdminOwner=()=>{
    const [owners,setOwners]=useState([])
    const [loading,setLoading]=useState(true)


    const fetchOwners=async()=>{
        try{    
            const res=await api.get("/getowneranalytics",{
                withCredentials:true
            })

            setOwners(res.data.owner || res.data)
        }catch(err){
            console.log(err);
            
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchOwners()
    },[])

    if(loading){
        return(
            <div className="admin-page-loading">
                Loading Owners...
            </div>
        )
    }

    return(
        <div className="admin-table-card">
            <div className="admin-table-header">
                <h2>All Owners</h2>
                <span>{owners.length} Owners</span>

            </div>

            <div className="admin-table-wrapper">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Owner</th>
                            <th>Email</th>
                            <th>Products</th>
                            <th>Total Earning</th>
                            
                        </tr>
                    </thead>

                    <tbody>
                        {owners.length>0?(
                            owners.map((owner,index)=>(
                                <tr key={index}>
                                    <td>{index+1}</td>

                                    <td>
                                        <div className="owner-info">
                                            <div className="owner-avatar">
                                                {owner.ownerName?.charAt(0)?.toUpperCase()}
                                            </div>

                                            <span>
                                                {owner.ownerName || "N/A"}
                                            </span>

                                            
                                        </div>
                                    </td>

                                    <td>
                                        {owner.ownerEmail || "N/A"}
                                    </td>

                                    <td>
                                        <span className="product-count">
                                            {owner.totalProducts || 0}
                                        </span>
                                    </td>

                                    <td>
                                        ₹{Number(
                                            owner.totalEarning||0
                                        ).toFixed(2)}
                                    </td>

                                    
                                    
                                </tr>
                            ))
                        ):(
                            <tr>
                                <td colSpan="6" className="empty-table">No User Found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default AdminOwner