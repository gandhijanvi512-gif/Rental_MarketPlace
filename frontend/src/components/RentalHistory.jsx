import { Link } from "react-router-dom";

function RentalHistory({history}){
    // console.log("RentalHistory props:", history);
    if(!history){
        return null
    }

    return(
        <div className="rental-history">
            <div className="history-header">
                <h3>Recent Rental History</h3>

                <Link to="/rentalhistory">
                    View All
                </Link>
            </div>

            {
                history.length===0?(
                    <div className="empty-history">
                        No Rental History
                    </div>
                ):(
                    history.slice(0,3).map((rental)=>(
                        <div className="history-item" key={rental._id}>

                            <div className="history-left">

                            <img 
                            src={`http://localhost:5200${rental.productId.images[0]}`} 
                            alt={rental.productId.title}
                            className="history-image"/>

                            <div className="history-info">
                                <h4>{rental.productId.title}</h4>

                                <p>
                                    Start: {" "}{new Date(rental.startDate).toLocaleDateString()}
                                </p>

                                <p>
                                    End:{" "}{new Date(rental.endDate).toLocaleDateString()}
                                </p>
                            </div>
                        
                        </div>

                            <div className="history-status">
                                <span className="completed-badge">
                                    COMPLETED
                                </span>
                            </div>
                        </div>
                        
                        
                    ))
                )
            }
            <Link to="/rentalhistory" className="view-history-btn">
                View All History
            </Link>
        </div>
    )
}

export default RentalHistory