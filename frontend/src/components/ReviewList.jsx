import { useEffect, useState } from "react"
import api from "../service/api"
import ReviewCard from "./ReviewCard"

const ReviewList=({productId,refresh})=>{
    const[reviews,setReviews]=useState([])
    const[averageRating,setAverageRating]=useState(0)
    const[totalReviews,setTotalReviews]=useState(0)
    // const[loading,setLoading]=useState(true)

    

    // if (loading){
    // return <h2>Loading Reviews...</h2>;
    // }

    const fetchReviews=async()=>{
        try{
             console.log("Fetching Reviews...");
            const res=await api.get(`/getreview/${productId}`)
            
            setReviews(res.data.reviews)
            setAverageRating(res.data.averageRating)
            setTotalReviews(res.data.totalReviews)
        }catch(err){
            console.log(err);
        }
            
        // }finally{
        //     setLoading(false)
        // }
    }

    console.log("ReviewList Rendered");


    useEffect(()=>{
        if(productId){
            fetchReviews()
        }
    },[productId,refresh])

    return(
        <div className="review-list">
            <div className="review-summary">
                <h2>Customer Reviews</h2>

                <div className="review-overview">
                    <h3>
                        ⭐ {Number(averageRating).toFixed(1)}
                    </h3>

                    <p>
                        {totalReviews} Review{totalReviews!==1?"s":""}
                    </p>
                </div>
            </div>

            {
                reviews.length===0?(
                    <p>No Reviews Available</p>
                ):(
                    reviews.map((review)=>(
                        <ReviewCard key={review._id} review={review} />
                    ))
                )
            }
        </div>
    )
}

export default ReviewList