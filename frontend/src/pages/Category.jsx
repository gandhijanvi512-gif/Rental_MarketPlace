import CategoryCard from "../components/CategoryCard"
import categories from "../data/categories"

function Category(){

    return(
        <div className="category-container">
            <h1 className="section-title">Browse Category</h1>

            <div className="category-grid">
                {categories.map((item)=>(
                    <CategoryCard 
                        key={item.name}
                        category={item}
                    />
                ))}
            </div>
        </div>

        


    )
}

export default Category