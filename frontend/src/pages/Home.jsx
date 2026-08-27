
  import { useEffect, useState } from "react";
  import api from "../service/api";
  // import "../../css/ProductListing.css"
  import { useNavigate } from "react-router-dom";
  import categories from "../data/categories";
  import {ArrowRight,Search,ShieldCheck,Wallet,CalendarCheck,Users,Package,Calendar,ChevronRight,PackageCheck,ChevronDown } from "lucide-react";
  import faqs from "../data/faqs";




  const Home = () => {
    const navigate=useNavigate()
    const [products, setProducts] = useState([]);
    const [category,setCategory]=useState("")
    const [openFAQ,setOpenFAQ]=useState(null)

    const [visibleSections, setVisibleSections] = useState({});

useEffect(() => {
  const sections = document.querySelectorAll(".home-scroll-section");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        setVisibleSections((prev) => ({
          ...prev,
          [entry.target.dataset.section]: entry.isIntersecting,
        }));
      });
    },
    {
      threshold: 0.25,
    }
  );

  sections.forEach((section) => observer.observe(section));

  return () => observer.disconnect();
}, []);


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

        <section className={`home-product-section home-scroll-section ${visibleSections.products?"is-visible":""}`}data-section="products">
          <div className="home-section-header home-scroll-left">
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

          <div className="home-product-grid home-scroll-stagger">
            {products.map((product)=>(
              <div
                key={product._id}
                className="home-product-card"
                onClick={()=>navigate(`/productsdetails/${product._id}`)}
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

        <section className={`home-category-section home-scroll-section ${visibleSections.categories?"is-visible":""} `}data-section="categories">
          <div className="home-category-heading home-scroll-left">
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
                key={category.name}
                className={`home-category-card category-${index + 1} home-scroll-card`}
                onClick={() =>
                    navigate(`/category/${encodeURIComponent(category.name)}`)
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

        <section className={`home-why-section home-scroll-section ${visibleSections.why?"is-visible":""} `}data-section="why">

    <div className="home-why-header home-scroll-up">
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


    <div className="home-why-grid home-scroll-stagger">

        <div className="home-why-card home-scroll-card">
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


        <div className="home-why-card home-scroll-card">
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


        <div className="home-why-card home-scroll-card">
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


        <div className="home-why-card home-scroll-card">
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


{/* how renting works */}

          {/* --- HOW RENTING WORKS SECTION --- */}
<section className={`process-section home-scroll-section ${visibleSections.process?"is-visible":""}`}data-section="process">
  <div className="process-container">
    
    {/* Left Header */}
    <div className="process-header home-scroll-left">
      <span className="process-tag">SIMPLE PROCESS</span>
      <h2 className="process-title">How renting works</h2>
      <p className="process-subtitle">
        From finding your product to returning it, everything is simple.
      </p>
    </div>

    {/* Steps Row */}
    <div className="process-steps home-scroll-stagger">

      {/* Step 1 */}
      <div className="process-step-card home-scroll-card">
        <div className="process-icon-wrap">
          <span className="step-badge">01</span>
          <div className="process-icon-circle">
            <Search size={24} />
          </div>
        </div>
        <h3>Discover</h3>
        <p>Browse products and find something that fits your needs.</p>
      </div>

      <div className="process-connector">
        <span className="connector-line"></span>
        <div className="connector-dot">
          <ChevronRight size={14} />
        </div>
        <span className="connector-line"></span>
      </div>

      {/* Step 2 */}
      <div className="process-step-card home-scroll-card">
        <div className="process-icon-wrap">
          <span className="step-badge">02</span>
          <div className="process-icon-circle">
            <Calendar size={24} />
          </div>
        </div>
        <h3>Choose Dates</h3>
        <p>Select your rental dates and check the available duration.</p>
      </div>

      <div className="process-connector">
        <span className="connector-line"></span>
        <div className="connector-dot">
          <ChevronRight size={14} />
        </div>
        <span className="connector-line"></span>
      </div>

      {/* Step 3 */}
      <div className="process-step-card home-scroll-card">
        <div className="process-icon-wrap">
          <span className="step-badge">03</span>
          <div className="process-icon-circle">
            <Wallet size={24} />
          </div>
        </div>
        <h3>Book & Pay</h3>
        <p>Confirm your booking and complete the secure payment.</p>
      </div>

      <div className="process-connector">
        <span className="connector-line"></span>
        <div className="connector-dot">
          <ChevronRight size={14} />
        </div>
        <span className="connector-line"></span>
      </div>

      {/* Step 4 */}
      <div className="process-step-card home-scroll-card">
        <div className="process-icon-wrap">
          <span className="step-badge">04</span>
          <div className="process-icon-circle">
            <PackageCheck size={24} />
          </div>
        </div>
        <h3>Enjoy & Return</h3>
        <p>Use the product and return it after your rental period.</p>
      </div>

    </div>

  </div>
</section>



{/* FAQ SECTION */}

<section className={`home-faq-section home-scroll-section ${visibleSections.faq?"is-visible":""}`}data-section="faq">

  <div className="home-faq-heading home-scroll-up">
    <span className="home-section-tag">FAQ</span>

    <h2>Frequently Asked Questions</h2>

    <p>
      Everything you need to know about renting with Rentora.
    </p>
  </div>

  <div className="home-faq-layout">

    {/* LEFT FAQ */}
    <div className="home-faq-list home-scroll-left">

      {faqs.map((faq, index) => (
        <div
          className={`home-faq-item home-scroll-card ${
            openFAQ === index ? "open" : ""
          }`}
          key={index}
        >

          <button
            className="home-faq-question"
            onClick={() =>
              setOpenFAQ(openFAQ === index ? null : index)
            }
          >

            <div className="home-faq-question-left">

              <span className="home-faq-number">
                {String(index + 1).padStart(2, "0")}
              </span>

              <strong>{faq.question}</strong>

            </div>

            <div className="home-faq-arrow">
              <ChevronDown size={20} />
            </div>

          </button>

          {openFAQ === index && (
            <div className="home-faq-answer">
              <p>{faq.answer}</p>
            </div>
          )}

        </div>
      ))}

    </div>


    {/* RIGHT HELP CARD */}
{/* RIGHT SUPPORT CARD */}

<div className="home-faq-help">

  <div className="home-faq-help-top">
    <span className="home-faq-help-icon">
      ?
    </span>

    <span className="home-faq-help-label">
      RENTORA SUPPORT
    </span>
  </div>

  <h3>
    Need help with<br />
    your rental?
  </h3>

  <p>
    Have a question about booking, payment,
    cancellation or your rental? Our support
    team is here to help.
  </p>

  <div className="home-faq-help-line"></div>

  <div className="home-faq-help-bottom">

    <span>
      We're happy to help
    </span>

    <button
      onClick={() => navigate("/contactus")}
      className="home-faq-contact-btn"
    >
      Contact Support
      <ArrowRight size={18} />
    </button>

  </div>

</div>

  </div>

</section>





      </>
    )

};

export default Home;













