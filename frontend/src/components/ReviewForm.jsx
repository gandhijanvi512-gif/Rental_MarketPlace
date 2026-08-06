import { useState } from "react"
import api from "../service/api";

const ReviewForm=({productId,onReviewAdded})=>{
    const[rating,setRating]=useState(0);
    const[comment,setComment]=useState("");
    const[loading,setLoading]=useState(false)

    const handleSubmit=async(e)=>{
        e.preventDefault()

        if(rating===0){
            alert("Please select a rating")
            return;
        }

        if(comment.trim()===""){
            alert("Please enter your review")
            return;
        }

        try{
            setLoading(true)

            const res=await api.post(`/addreview/${productId}`,{
                rating,
                comment
            })

            alert(res.data.message);

            setRating(0);
            setComment("");

            if(onReviewAdded){
                onReviewAdded()
            }
        }catch(err){
            console.log(err);
            alert(
                err.response?.message?.data||"Faild to submit review"
            )
            
        }finally{
            setLoading(false)
        }
    }

    return(
        <div className="review-form">
            <h2>Write a Review</h2>

            <form onSubmit={handleSubmit}>
                <div className="rating-section">
                    <label htmlFor="">Your Rating</label>
                    <div className="star-rating">
                        {[1,2,3,4,5].map((star)=>(
                            <span key={star} className={star<=rating?"star-active":"star"}
                                onClick={()=>setRating(star)}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                </div>

                <div className="comment-section">
                    <label htmlFor="">Comment</label>

                    <textarea 
                        rows={5} placeholder="Share Your Experience" value={comment}
                        onChange={(e)=>setComment(e.target.value)}
                    ></textarea>
                </div>

                <button 
                    type="submit" className="review-btn" disabled={loading}
                >       
                    {loading? "Submitting...":"Submit Review"}
                </button>
            </form>
        </div>
    )
}

export default ReviewForm