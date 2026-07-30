import { useNavigate } from "react-router-dom"

function CategoryCard({category,active}){
    const navigatae=useNavigate()

    return(
        <div className={`category-card ${active? "active-category" : ""}`}
            onClick={()=>navigatae(`/category/${category.name}`)}
        >
            <img src={category.image} alt={category.name} />

            <h3>{category.name}</h3>
        </div>
    )
}

export default CategoryCard