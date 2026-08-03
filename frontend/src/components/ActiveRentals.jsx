import { Link } from "react-router-dom";

function ActiveRentals({rentals}){
    if(!rentals){
         console.log("Rentals:", rentals);
        return null
    }

    return(
        <div className="active-rentals">
            <div className="active-header">
                <h3>Active Rentals</h3>

                <Link to="/myrentals">
                    View All
                </Link>
            </div>
            <div className="active-List"></div>
            {
                rentals.length===0?(
                    <div className="empty-rentals">
                        No Active Rentals
                    </div>
                ):(
                    rentals.map((rental)=>{
                        const endDate=new Date(rental.endDate)

                        const today=new Date()

                        const daysLeft=Math.ceil((endDate-today)/(1000*60*60*24))
                        
                        return(
                            
                            <div className="active-item" key={rental._id}>

                                <div className="active-left">

                                <img src={`http://localhost:5200${rental.productId.images[0]}`} 
                                
                                alt={rental.productId.title} 
                                className="active-image"
                                />
                                

                                <div className="active-info">
                                    <h4>{rental.productId.title}</h4>

                                    <p>
                                        Start:{" "}{new Date(rental.startDate).toLocaleDateString()}                                        
                                    </p>

                                    <p>
                                        End:{" "}{new Date(rental.endDate).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                                <div className="active-status">
                                    <span className="days-left">
                                        {
                                            daysLeft<=0?"Today":`${daysLeft} Days Left`
                                        }
                                    </span>

                                    <span className="status-badge">
                                        ACTIVE
                                    </span>
                                </div>

                            </div>  
                        )
                    })
                )
            }
            

            <Link 
                to="/myrentals" className="view-active-btn"
            >
                View All Active Rentals
            </Link>
        </div>
    )
}

export default ActiveRentals