import { Clock3, Icon, Package, CalendarDays, Subtitles, Wallet } from "lucide-react"

function StatsCards({stats}){
    // console.log(stats);
    if(!stats){
        return null
    }

    const cards=[
        {
            title:"Active Rentals",
            value:stats.activeRentals,
            Subtitle:"Currently renting items",
            icon: <Package size={28}/>,
            className: "purple"
        },
        {
            title:"Completed Rentals",
            value:stats.completedRentals,
            Subtitle:"Total rentals completed",
            icon: <Clock3 size={28}/>,
            className:"orange"
        },
        {
            title:"Upcoming Rentals",
            value:stats.upcomingRentals,
            Subtitle:"Scheduled for future",
            icon: <CalendarDays size={28}/>,
            className:"blue"
        },
        {
            title:"Total Spent",
            value:`₹${stats.totalSpent}`,
            Subtitle:"Across all rentals",
            icon: <Wallet size={28}/>,
            className:"green"
        }
    ];

    return(
        <div className="stats-grid">
            {cards.map((card,index)=>(
                <div className="stats-card" key={index}>

                    <div className={`stats-icon ${card.className}`}>
                        {card.icon}
                    </div>

                    <div className="stats-content">
                        <h2>{card.value}</h2>
                        <h4>{card.title}</h4>
                        <p>{card.Subtitle}</p>
                    </div>

                </div>
            ))}
        </div>
    )
}

export default StatsCards