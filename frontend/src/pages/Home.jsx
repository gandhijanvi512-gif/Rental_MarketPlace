//   import { useEffect, useState } from "react";
//   import api from "../service/api";
//   // import "../../css/ProductListing.css"
//   import { useNavigate } from "react-router-dom";
//   import CategoryCard from "../components/CategoryCard";
//   import categories from "../data/categories";

//   const Home = () => {
//     const navigate=useNavigate()
//     const [products, setProducts] = useState([]);
//     const [search,setSearch]=useState("")
//     const [category,setCategory]=useState("")
//     const [minPrice,setMinPrice]=useState("")
//     const [maxPrice,setMaxPrice]=useState("")
//     const [openFAQ,setOpenFAQ]=useState(null)

//     const fetchProducts = async () => {
//       try {
//         const res = await api.get("/featureProduct",{
//           params:{
//             search,
//             category,
//             minPrice,
//             maxPrice
//           },
//           withCredentials:true
//         });

//         setProducts(res.data.product);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     const handleSearch=()=>{
//       navigate(`/products?search=${search}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}`)
//     }

//     useEffect(() => {
//       fetchProducts();
//     }, [search,category,minPrice,maxPrice]);

// return (
//   <>
//     {/* Hero Section */}

//   {/* Add your generated image URL to the style background-image */}
//   <section 
//     className="relative pt-4 pb-38 px-6 text-center min-h-screen flex flex-col justify-center items-center bg-cover bg-center"
//     style={{ backgroundImage: "url('/images/homepage.png')" }}
//   >
//     {/* Subtle dark overlay to ensure text is always readable over the complex image */}
//     <div className="absolute inset-0 bg-[#213555]/7 backdrop-blur-sm z-0"></div>

//     {/* Main Content Container - Elevated above the overlay */}
//     <div className="relative z-10 w-full max-w-7xl mx-auto">
      
//       <h1 className="text-7xl font-bold text-[#0b385f] drop-shadow-xl tracking-tight">
//         Rent Anything,
//         <br />
//         Anytime.
//       </h1>

//       <p className="mt-6 text-xl text-[#3373b0] font-medium drop-shadow-md">
//         Find bikes, cameras, laptops, books and more from trusted owners.
//       </p>

//       {/* Search Bar - Premium Glassmorphism */}
//       <div className="mt-10 max-w-6xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-full shadow-[0_8px_32px_rgba(33,53,85,0.5)] flex flex-wrap items-center overflow-hidden">

//         {/* What Input */}
//         <div className="flex-1 min-w-[220px] px-5 py-2 border-r border-white/20 text-left">
//           <p className="text-m font-semibold text-[#0b385f] uppercase tracking-wider mb-1">
//             What
//           </p>
//           <input
//             type="text"
//             placeholder="Search products"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full outline-none bg-transparent text-[#F5EFE7] placeholder-white/40 text-lg"
//           />
//         </div>

//         {/* Category Select */}
//         {/* <div className="flex-1 min-w-[180px] px-6 py-4 border-r border-white/20 text-left">
//           <p className="text-xs font-semibold text-[#D8C4B6] uppercase tracking-wider mb-1">
//             Category
//           </p>
//           <select
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             className="w-full outline-none bg-transparent text-[#F5EFE7] text-lg cursor-pointer appearance-none"
//           >
//             <option value="" className="text-[#213555]">All</option>
//             <option value="Electronics" className="text-[#213555]">Electronics</option>
//             <option value="Furniture" className="text-[#213555]">Furniture</option>
//             <option value="Vehicle" className="text-[#213555]">Vehicle</option>
//           </select>
//         </div> */}

//         {/* Min Price */}
//         <div className="flex-1 min-w-[150px] px-6 py-4 border-r border-white/20 text-left">
//           <p className="text-m font-semibold text-[#0b385f] uppercase tracking-wider mb-1">
//             Min Price
//           </p>
//           <input
//             type="number"
//             placeholder="₹0"
//             value={minPrice}
//             onChange={(e) => setMinPrice(e.target.value)}
//             className="w-full outline-none bg-transparent text-[#F5EFE7] placeholder-white/40 text-lg"
//           />
//         </div>

//         {/* Max Price */}
//         <div className="flex-1 min-w-[150px] px-6 py-4 text-left">
//           <p className="text-m font-semibold text-[#0b385f] uppercase tracking-wider mb-1">
//             Max Price
//           </p>
//           <input
//             type="number"
//             placeholder="₹10000"
//             value={maxPrice}
//             onChange={(e) => setMaxPrice(e.target.value)}
//             className="w-full outline-none bg-transparent text-[#F5EFE7] placeholder-white/40 text-lg"
//           />
//         </div>

//         {/* Search Button */}
//         <button onClick={handleSearch} className="m-2 px-10 py-4 rounded-full bg-[#3E5879] text-[#F5EFE7] font-semibold text-lg hover:bg-[#F5EFE7] hover:text-[#213555] transition-all duration-300 shadow-lg">
//           Search
//         </button>
//       </div>

//       {/* Category Buttons - Glassmorphism Pills */}
//       <div className="flex flex-wrap justify-center gap-4 mt-8">
//         {[
//           "All",
//           "Electronics",
//           "Furniture",
//           "Vehicle",
//           "Books",
//           "Cameras",
//           "Laptops",
//         ].map((item) => (
//           <button
//             key={item}
//             onClick={() => setCategory(item === "All" ? "" : item)}
//             className={`px-6 py-2.5 rounded-full backdrop-blur-md transition-all duration-300 font-medium border ${
//               category === item || (item === "All" && category === "")
//                 ? "bg-[#D8C4B6] text-[#213555] border-[#D8C4B6] shadow-[0_0_15px_rgba(216,196,182,0.4)]"
//                 : "bg-white/10 text-[#F5EFE7] border-white/20 hover:bg-white/20 hover:border-white/40"
//             }`}
//           >
//             {item}
//           </button>
//         ))}
//       </div>

//     </div>
//   </section>


//   <section className="category-section">
//         <h2 className="section-title">
//           Browse Categories
//         </h2>

//         <div className="category-container">
//           <div className="category-grid">
//           {categories.map(category=>(
//             <CategoryCard key={category.id} category={category}/>
//           ))}
//         </div>
//         </div>
        
//   </section>


//     {/* Products Section */}
//     <section className="max-w-7xl mx-auto px-6 pb-16">

//       <h2 className="text-4xl font-bold text-center text-[#213555] mb-10">
//         Available Rentals
//       </h2>

//       <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//         {products.map((product) => (
//           <div
//             key={product._id}
//             className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition"
//           >
//             <img
//               src={`http://localhost:5200${product.images[0]}`}
//               alt={product.title}
//               className="w-full h-56 object-cover"
//             />

//             <div className="p-5">
//               <h2 className="text-xl font-medium text-[#213555]">
//                 {product.title}
//               </h2>

//               <h3 className="mt-2 text-5xm font-medium text-[#3E5879]">
//                 Category: {product.category}
//               </h3>

//               <h3 className="mt-2 text-5xm font-medium text-[#3E5879]">
//                 ₹{product.rentPrice}/day
//               </h3>



//               {/* <button
//                 onClick={() =>
//                   navigate(`/products/${product._id}`)
//                 }
//                 className="mt-4 w-full bg-[#213555] text-white py-2 rounded-xl hover:bg-[#3E5879] transition"
//               >
//                 View Details
//               </button> */}
//             </div>
//           </div>
//         ))}
//       </div>

//     </section>

//     {/* Why Choose Us */}

// <section className="py-20 px-6">
//   <div className="max-w-7xl mx-auto">

//     <h2 className="text-4xl font-semibold text-center text-[#213555] mb-4">
//       Why Choose Us
//     </h2>

//     <p className="text-center text-[#3E5879] mb-12">
//       Experience a smarter and more affordable way to rent products.
//     </p>

//     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

//       <div className="bg-white rounded-3xl p-8 shadow-md">
//         <h3 className="text-xl font-medium text-[#213555] mb-3">
//           Trusted Rentals
//         </h3>
//         <p className="text-gray-600">
//           Verified owners and genuine products for a safe rental experience.
//         </p>
//       </div>

//       <div className="bg-white rounded-3xl p-8 shadow-md">
//         <h3 className="text-xl font-medium text-[#213555] mb-3">
//           Affordable Pricing
//         </h3>
//         <p className="text-gray-600">
//           Save money by renting instead of purchasing expensive products.
//         </p>
//       </div>

//       <div className="bg-white rounded-3xl p-8 shadow-md">
//         <h3 className="text-xl font-medium text-[#213555] mb-3">
//           Secure Payments
//         </h3>
//         <p className="text-gray-600">
//           Enjoy safe and reliable online payment options.
//         </p>
//       </div>

//       <div className="bg-white rounded-3xl p-8 shadow-md">
//         <h3 className="text-xl font-medium text-[#213555] mb-3">
//           Easy Booking
//         </h3>
//         <p className="text-gray-600">
//           Book products quickly with a simple and user-friendly process.
//         </p>
//       </div>

//       <div className="bg-white rounded-3xl p-8 shadow-md">
//         <h3 className="text-xl font-medium text-[#213555] mb-3">
//           Flexible Rental Duration
//         </h3>
//         <p className="text-gray-600">
//           Rent products for a day, week, or month based on your needs.
//         </p>
//       </div>

//       <div className="bg-white rounded-3xl p-8 shadow-md">
//         <h3 className="text-xl font-medium text-[#213555] mb-3">
//           Wide Variety of Products
//         </h3>
//         <p className="text-gray-600">
//           Explore electronics, vehicles, books, cameras and much more.
//         </p>
//       </div>

//     </div>

//   </div>
// </section>


// {/* FAQ */}

// <section className="py-20 px-6">
//   <div className="max-w-4xl mx-auto">

//     <h2 className="text-4xl font-semibold text-center text-[#213555] mb-4">
//       Frequently Asked Questions
//     </h2>

//     <p className="text-center text-[#3E5879] mb-12">
//       Everything you need to know about renting products.
//     </p>

//     {[
//       {
//         question: "How do I rent a product?",
//         answer:
//           "Search for a product, select rental dates and complete the booking process."
//       },
//       {
//         question: "Is the security deposit refundable?",
//         answer:
//           "Yes, the deposit is refunded after the product is returned in good condition."
//       },
//       {
//         question: "Can I cancel my booking?",
//         answer:
//           "Yes, bookings can be cancelled according to the platform policy."
//       },
//       {
//         question: "How do owners list products?",
//         answer:
//           "Owners can create an account, add products and publish them for rent."
//       },
//       {
//         question: "What payment methods are accepted?",
//         answer:
//           "UPI, Credit Card, Debit Card and Net Banking are supported."
//       },
//       {
//         question: "Are products verified?",
//         answer:
//           "Yes, products and owners are reviewed before appearing on the platform."
//       },
//       {
//         question: "What happens if a product is returned late?",
//         answer:
//           "Additional rental charges may apply depending on the owner's policy."
//       },
//       {
//         question: "Can I contact the owner before booking?",
//         answer:
//           "Yes, you can communicate with the owner before confirming a booking."
//       }
//     ].map((faq, index) => (
//       <div
//         key={index}
//         className="bg-white rounded-2xl shadow-md mb-4 overflow-hidden"
//       >
//         <button
//           onClick={() =>
//             setOpenFAQ(openFAQ === index ? null : index)
//           }
//           className="w-full flex justify-between items-center px-6 py-5 text-left"
//         >
//           <span className="text-[#213555] font-medium">
//             {faq.question}
//           </span>

//           <span className="text-2xl text-[#213555]">
//             {openFAQ === index ? "-" : "+"}
//           </span>
//         </button>

//         {openFAQ === index && (
//           <div className="px-6 pb-5 text-gray-600">
//             {faq.answer}
//           </div>
//         )}
//       </div>
//     ))}

//   </div>
// </section>
//   </>
// );
// };

// export default Home;


















  import { useEffect, useState } from "react";
  import api from "../service/api";
  // import "../../css/ProductListing.css"
  import { useNavigate } from "react-router-dom";
  import CategoryCard from "../components/CategoryCard";
  import categories from "../data/categories";
  import {ArrowRight,Search,ShieldCheck,Wallet,CalendarCheck,Users,Package,ChevronDown} from "lucide-react";



  const Home = () => {
    const navigate=useNavigate()
    const [products, setProducts] = useState([]);
    // const [search,setSearch]=useState("")
    const [category,setCategory]=useState("")
    // const [minPrice,setMinPrice]=useState("")
    // const [maxPrice,setMaxPrice]=useState("")
    const [openFAQ,setOpenFAQ]=useState(null)

    const fetchProducts = async () => {
      try {
        const res = await api.get("/featureProduct",{
          params:{
            category
          },
          withCredentials:true
        });

        setProducts(res.data.product);
      } catch (error) {
        console.log(error);
      }
    };

    // const handleSearch=()=>{
    //   navigate(`/products?search=${search}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}`)
    // }

    useEffect(() => {
      fetchProducts();
    }, [category]);

    return(
      <>
        <section className="home-hero">
          <div className="home-hero-bg">
            <img src="/images/homepage2.png" alt="Rental Background" />
          </div>

          <div className="home-hero-content">
            <div className="home-hero-text">
              <span className="home-hero-tag">
                RENT SMART. LIVE MORE
              </span>

              <h1>
                Rent what you need.
                <span>When you need it.</span>
              </h1>

              <p> 
                Discover bikes, cameras, laptops, books and more from trusted owners around you.
              </p>

              <div className="home-hero-buttons">
                <button className="home-primary-btn"
                  onClick={()=>navigate("/products")}
                >
                  Explore Rentals

                  <ArrowRight size={18}/>
                </button>

                <button className="home-secondary-btn"
                  onClick={()=>navigate("/ownerSetup")}
                >
                  Become An Owner
                </button>
              </div> 

              <div className="home-hero-stats">
                <div>
                  <strong>500+</strong>
                  <span>Products</span>
                </div>

                <div>
                  <strong>50+</strong>
                  <span>Owners</span>
                </div>

                <div>
                  <strong>4.9</strong>
                  <span>Rating</span>
                </div>
              </div> 

            </div>

            <div className="hero-floating-card hero-card-one">
          <ShieldCheck size={20} />
          <div>
            <strong>Trusted Rentals</strong>
            <span>Verified owners</span>
          </div>
        </div>

        <div className="hero-floating-card hero-card-two">
          <Wallet size={20} />
          <div>
            <strong>Affordable</strong>
            <span>Rent instead of buying</span>
          </div>
        </div>


          </div>
        </section>


        {/* product section */}

        <section className="home-product-section">
          <div className="home-section-header">
            <div>
              <span className="home-section-tag">
                JUST ADDED
              </span>
              
              <h2>Freshly Added Rentals</h2>

              <p>Explore the latest products added by our owners.</p>
    
            </div>

            <button className="home-view-all"
              onClick={()=>navigate("/products")}
            >
              View All Products
              
              <ArrowRight size={18} />

            </button>

          </div>

          <div className="home-product-grid">
            {products.map((product)=>(
              <div
                key={product._id}
                className="home-product-card"
                onClick={()=>navigate(`/productdetails/${product._id}`)}
              >
                <div className="home-product-image">
                  <img src={`http://localhost:5200${product.images?.[0]}`} 
                  alt={product.title} />

                  <span className="home-product-category">
                    {product.category}
                  </span>

                </div>

                <div className="home-product-info">
                  <h3>{product.title}</h3>

                  <div className="home-product-bottom">
                    <div>
                      <strong>
                        ₹{product.rentPrice}
                      </strong>
                      <span>/day</span>

                      <span className="home-product-arrow">
                        <ArrowRight size={18} />
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </section>


        {/* category sections */}

        <section className="home-category-section">
          <div className="home-category-heading">
            <div>
              <span className="home-section-tag">
                EXPLORE
              </span>

              <h2>
                Find What You Need
              </h2>

              <p>
                Explore our rental categories and discover
                something perfect for your next need.
              </p>
            </div>

            <button
            className="home-category-view-btn"
            onClick={() => navigate("/category")}
        >
            View All
            <ArrowRight size={18} />
        </button>
      </div>

        <div className="home-category-grid">

        {categories.map((category, index) => (
            <div
                key={category.id}
                className={`home-category-card category-${index + 1}`}
                onClick={() =>
                    navigate("/category")
                }
            >
                <img
                    src={category.image}
                    alt={category.name}
                />

                <div className="home-category-overlay"></div>

                <div className="home-category-content">

                    <span>
                        {index + 1}
                    </span>

                    <h3>
                        {category.name}
                    </h3>

                    <div className="home-category-arrow">
                        <ArrowRight size={19} />
                    </div>

                </div>

            </div>

          ))}


        

          </div>

        </section>


        {/* why choose us */}

        <section className="home-why-section">

    <div className="home-why-header">
        <span className="home-section-tag">
            WHY RENT WITH US
        </span>

        <h2>
            Renting made simple.
        </h2>

        <p>
            Everything you need for a smooth, secure and
            affordable rental experience.
        </p>
    </div>


    <div className="home-why-grid">

        <div className="home-why-card">
            <div className="home-why-icon">
                <ShieldCheck size={25} />
            </div>

            <span>01</span>

            <h3>Trusted Rentals</h3>

            <p>
                Connect with verified owners and rent
                genuine products with confidence.
            </p>
        </div>


        <div className="home-why-card">
            <div className="home-why-icon">
                <Wallet size={25} />
            </div>

            <span>02</span>

            <h3>Save Money</h3>

            <p>
                Get access to products you need without
                spending money on permanent purchases.
            </p>
        </div>


        <div className="home-why-card">
            <div className="home-why-icon">
                <CalendarCheck size={25} />
            </div>

            <span>03</span>

            <h3>Easy Booking</h3>

            <p>
                Choose your dates, confirm your booking
                and enjoy a simple rental experience.
            </p>
        </div>


        <div className="home-why-card">
            <div className="home-why-icon">
                <Users size={25} />
            </div>

            <span>04</span>

            <h3>Trusted Community</h3>

            <p>
                Rent from owners and become part of a
                growing rental community.
            </p>
        </div>

    </div>

</section>


{/* how it works */}

<section className="home-how-section">

    <div className="home-how-header">

        <span className="home-section-tag">
            SIMPLE PROCESS
        </span>

        <h2>
            How renting works
        </h2>

        <p>
            From finding your product to returning it,
            everything is simple.
        </p>

    </div>


    <div className="home-how-grid">

        <div className="home-how-step">

            <div className="home-how-number">
                01
            </div>

            <Search size={26} />

            <h3>Discover</h3>

            <p>
                Browse products and find something
                that fits your needs.
            </p>

        </div>


        <div className="home-how-line"></div>


        <div className="home-how-step">

            <div className="home-how-number">
                02
            </div>

            <CalendarCheck size={26} />

            <h3>Choose Dates</h3>

            <p>
                Select your rental dates and check
                the available duration.
            </p>

        </div>


        <div className="home-how-line"></div>


        <div className="home-how-step">

            <div className="home-how-number">
                03
            </div>

            <Wallet size={26} />

            <h3>Book & Pay</h3>

            <p>
                Confirm your booking and complete
                the secure payment.
            </p>

        </div>


        <div className="home-how-line"></div>


        <div className="home-how-step">

            <div className="home-how-number">
                04
            </div>

            <Package size={26} />

            <h3>Enjoy & Return</h3>

            <p>
                Use the product and return it
                after your rental period.
            </p>

        </div>

    </div>

</section>

      </>
    )

};

export default Home;













