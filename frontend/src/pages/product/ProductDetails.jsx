import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../../service/api";

import ReviewList from "../../components/ReviewList";
import ReviewForm from "../../components/ReviewForm";
import toast from "react-hot-toast";

const ProductDetails = () => {
  
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  const handleAddToCart = async () => {
    try {
      await api.post("/addtocart", { productId: product._id });

      toast.success("Product add to cart");

      setTimeout(()=>{
        navigate("/cart");
      },2000)

      
    } catch (err) {
      console.log(err);
      alert("Failed to add product to cart");
    }
  };

  const fetchProducts = async () => {
    
    try {
      const res = await api.get(`/getproductdetails/${id}`);
      setProduct(res.data.product);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setSelectedImage(0);
  }, [product?._id]);

  useEffect(() => {
    fetchProducts();
  }, [id]);

  if (!product) return <h2>Loading...</h2>;

  const mainImage=product.images?.[selectedImage]?.url ||
      product.images?.[0]?.url ||
      "/default-product.png"
  
  return (
    <div className="product-details-wrapper">
      <div className="product-details-container">
        {/* Top product card */}
        <div className="top-product-card">
          <div className="product-images">
            <div className="thumbnail-strip">
              {product.images?.map((img, index) => (
                <img
                  key={index}
                  src={img.url}
                  alt={product.title}
                  className={`product-details-img ${
                    index === selectedImage ? "active" : ""
                  }`}
                  onClick={() => setSelectedImage(index)}
                  onError={(e) => (e.target.src = "/default-product.png")}
                />
              ))}
            </div>

            <div className="main-image-wrap">
              {product.images?.length > 1 && (
                <button
                  type="button"
                  className="gallery-arrow arrow-left"
                  onClick={() =>
                    setSelectedImage((prev) =>
                      prev === 0 ? product.images.length - 1 : prev - 1,
                    )
                  }
                >
                  ‹
                </button>
              )}

              <img
                src={mainImage}
                alt={product.title}
                onError={(e) => (e.target.src = "/default-product.png")}
              />

              {product.images?.length > 1 && (
                <button
                  type="button"
                  className="gallery-arrow arrow-right"
                  onClick={() =>
                    setSelectedImage((prev) =>
                      prev === product.images.length - 1 ? 0 : prev + 1,
                    )
                  }
                >
                  ›
                </button>
              )}

              <div className="expand-btn">⤢</div>
            </div>
          </div>

          <div className="product-information">
            <h1>{product.title}</h1>

            <div className="rating-summary">
              <span className="starts">
                ⭐ {product.averageRating?.toFixed(1) || "0.0"}
              </span>
              <span className="reviews">
                ({product.totalReview || 0} Reviews)
              </span>
            </div>

            <p className="product-description">{product.description}</p>
            <div className="product-availability">
              {product.availability?.available ? (
                <div className="availability-card available-card">
                  <div className="availability-icon">✓</div>

                  <div className="availability-content">
                    <h3>Available Today</h3>

                    <p>You can book this item starting today.</p>
                  </div>
                </div>
              ) : (
                <div className="availability-unavailable-wrapper">
                  <div className="availability-card unavailable-card">
                    <div className="availability-icon">!</div>

                    <div className="availability-content">
                      <h3>
                        Unavailable for {product.availability?.unavailableDays}{" "}
                        days
                      </h3>

                      <p>This item is currently booked.</p>
                    </div>
                  </div>

                  <div className="availability-card available-from-card">
                    <div className="availability-icon">i</div>

                    <div className="availability-content">
                      <h3>Available from</h3>

                      <p>
                        <strong>
                          {new Date(
                            product.availability?.availableFrom,
                          ).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </strong>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            

            <div className="product-meta">
              <p>
                Category :<strong> {product.category}</strong>
              </p>
              <span className="divider">|</span>
              <p>
                Sub Category :<strong> {product.subcategory}</strong>
              </p>
            </div>

            <div className="price-card">
              <p className="price-label">Rental Price</p>
              <div className="price-box">
                <span className="price">₹{product.rentPrice}</span>
                <span className="per-day">/day</span>
              </div>

              <div className="deposit-box">
                <strong>Security Deposit</strong>
                <span className="deposit-price">₹{product.deposit}</span>
              </div>

<button
  className="cart-btn"
  onClick={handleAddToCart}
  disabled={!product.availability?.available}
>
  {!product.availability?.available
    ? "❌ Currently Unavailable"
    : "🛒 Add To Cart"}
</button>
            </div>
          </div>
        </div>

        {/* Owner card - full width, horizontal */}
        <div className="owner-card">
          <h2>Owner Information</h2>

          <div className="owner-card-body">
            <div className="owner-avatar">
              <img
                src={product.ownerId?.profileImage?.url || "/default-avatar.png"}
                alt={product.ownerId?.name || "Owner"}
              />
            </div>

            <div className="owner-main">
              <h3>{product.ownerId?.name}</h3>
              <div className="owner-contacts">
                <span>✉️ {product.ownerId?.email}</span>
                {product.ownerId?.phone && (
                  <span>📞 {product.ownerId.phone}</span>
                )}
                {(product.ownerId?.city || product.ownerId?.state) && (
                  <span>
                    📍{" "}
                    {[product.ownerId.city, product.ownerId.state]
                      .filter(Boolean)
                      .join(", ")}
                  </span>
                )}
              </div>
            </div>

            {/* <button
              className="view-products-btn"
              onClick={() =>
                navigate(`/owner/${product.ownerId?._id}/products`)
              }
            >
              View All Products
            </button> */}

            
          </div>
        </div>

        {/* Review section */}
        <div className="review-section">
          <div className="review-form-wrapper">
            <ReviewForm productId={product._id} />
          </div>

          <div className="review-form-wrapper">
            <ReviewList productId={product._id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
