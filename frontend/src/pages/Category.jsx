import categories from "../data/categories";
import CategoryCard from "../components/CategoryCard";
import { useParams } from "react-router-dom";

function Category(){
    const {category}=useParams() 
    
    return(
        <>
        <h2 className="category-container">
            Browse Categories
        </h2>

        <div className="category-grid">
            {categories.map((item)=>(
                <CategoryCard 
                    key={item.name}
                    category={item}
                    active={category===item.name}
                />
            ))}
        </div>

        <h2 style={{marginTop:"60px"}}>
            {category}
        </h2>
        </>

    )
}

export default Category