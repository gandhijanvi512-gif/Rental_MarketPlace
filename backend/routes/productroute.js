import express from "express"
import { authMiddleware } from "../middleware/authmiddleware.js"
import { addProduct, deleteProduct, featureProduct, getMyProduct, getProductDetails, getProducts,
     getSingleProduct, searchProduct, updateProduct, getProductByCategory } from "../controller/productcontroller.js"
import { authorizeRole } from "../middleware/rolemiddleware.js"
import uploads from "../middleware/fileupload.js"


const productrouter=express.Router()

productrouter.post("/addproduct",authMiddleware,authorizeRole("admin","owner"),uploads.array("images",5),addProduct)
productrouter.get("/getproduct",getProducts)
productrouter.patch("/updateproduct/:id",authMiddleware,authorizeRole("admin","owner"),updateProduct)
productrouter.delete("/deleteproduct/:id",authMiddleware,authorizeRole("owner","admin"),deleteProduct)
productrouter.get("/getsingleproduct/:id",authMiddleware,getSingleProduct)
productrouter.get("/getmyproduct",authMiddleware,authorizeRole("owner"),getMyProduct)
productrouter.get("/searchproduct/search",authMiddleware,searchProduct)
// productrouter.get("/products",filterProducts)
productrouter.get("/featureproduct",featureProduct)
productrouter.get("/getproductdetails/:id",getProductDetails)
productrouter.get("/getproductbycategory/:category",getProductByCategory)

export default productrouter