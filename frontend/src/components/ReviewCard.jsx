const ReviewCard=({review})=>{
    return(
        <div className="review-card">
            <div className="review-header">
                <div className="review-user">
                    <div className="review-avatar">
                        {review.userId?.name?.charAt(0).toUpperCase()}
                    </div>

                    <div>
                        <h4>
                            {review.userId?.name}
                        </h4>
                        <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                        
                    </div>
                </div>

                <div className="review-rating">
                    {"⭐".repeat(review.rating)}
                </div>  
            </div>

            <p className="review-comment">
                {review.comment}
            </p>
        </div>
    )
}

export default ReviewCard