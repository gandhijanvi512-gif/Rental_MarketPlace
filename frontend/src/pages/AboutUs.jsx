import React from "react";
import { 
  Bike, Camera, Laptop, BookOpen, ArrowRight, 
  Search, CalendarCheck, ShieldCheck, HandCoins, 
  LayoutGrid, Star, CheckCircle, BarChart3, Clock,
  CreditCard, Shield, HeadphonesIcon, HeartHandshake,BadgeCheck 
} from "lucide-react";
import { useReveal, useCounter } from "./useAboutInteractions";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const AboutUs = () => {
  const heroRef = useReveal(0.1);
  const storyRef = useReveal(0.2);
  const missionRef = useReveal(0.2);
  const stepsRef = useReveal(0.2);
  const rentersRef = useReveal(0.2);
  const ownersRef = useReveal(0.2);
  const trustRef = useReveal(0.2);
  const whyRef = useReveal(0.2);
  const ctaRef = useReveal(0.2);

  const { count: productsCount, ref: productsRef } = useCounter(500);
  const { count: bookingsCount, ref: bookingsRef } = useCounter(1000);
  const { count: ownersCount, ref: ownersRefCount } = useCounter(100);

  const navigate=useNavigate()

useEffect(() => {
  const section = stepsRef.current;

  if (!section) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        section.classList.add("steps-visible");
      } else {
        section.classList.remove("steps-visible");
      }
    },
    {
      threshold: 0.2,
    }
  );

  observer.observe(section);

  return () => observer.disconnect();
}, []);


  return (
    <div className="about-page-wrapper">
      
      {/* 1. HERO SECTION */}
      <section className="about-hero-section" ref={heroRef}>
        <div className="about-hero-content reveal-anim fade-up">
          <span className="about-hero-label">HERO SECTION</span>
          <h1 className="about-hero-title">Making Renting Simple, Flexible & Accessible</h1>
          <p className="about-hero-desc">Discover, rent and manage the things you need — all in one trusted marketplace.</p>
          <div className="about-hero-actions">
            <button className="about-btn about-btn-primary">Explore Rentals</button>
            <button className="about-btn about-btn-secondary">List Your Product <ArrowRight size={16}/></button>
          </div>
        </div>
        
        <div className="about-hero-bento reveal-anim scale-up">
          <div className="about-bento-item about-bento-large">
            <img src="https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=800&auto=format&fit=crop" alt="Renting a bike" />
            <div className="about-floating-badge top-left"><CalendarCheck size={16}/> Easy Booking</div>
            <div className="about-floating-badge top-right"><ShieldCheck size={16}/> Verified Owners</div>
          </div>
          <div className="about-bento-row">
            <div className="about-bento-item">
              <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop" alt="Camera rental" />
              <div className="about-floating-badge bottom-left"><CreditCard size={16}/> Secure Payments</div>
            </div>
            <div className="about-bento-item">
              <img src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop" alt="Laptop rental" />
              <div className="about-floating-badge bottom-right"><Clock size={16}/> Flexible Rentals</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OUR STORY SECTION */}
      <section className="about-story-section" ref={storyRef}>
        <div className="about-story-img-wrapper reveal-anim fade-right">
  <video 
    autoPlay 
    loop 
    muted 
    playsInline 
    className="about-story-img"
    style={{ objectFit: "cover" }}
  >
    <source src="/images/aboutus.mp4" type="video/mp4" />
  </video>
</div>
        <div className="about-story-content reveal-anim fade-left">
          <span className="about-section-label">OUR STORY SECTION</span>
          <h2 className="about-section-title">Built Around the Way People Rent Today</h2>
          <p className="about-section-desc">
            Authentic startup-like, that platform was created to make renting easier for temporary use rather than full ownership.
          </p>
          <p className="about-section-desc">
            Easy product features, include easy product discovery, comparison, demos, date selection, availability checks, secure booking, and payments.
          </p>
          <div className="about-highlight-box">
            "Why buy when you can simply rent what you need?"
          </div>
        </div>
      </section>

      {/* 3. OUR MISSION */}
      <section className="about-mission-section" ref={missionRef}>
        <div className="about-center-header reveal-anim fade-up">
          <span className="about-section-label">OUR MISSION</span>
          <h2 className="about-section-title">Our Mission</h2>
          <p className="about-section-desc">Building a trusted rental ecosystem for convenient access and owner opportunity.</p>
        </div>
        <div className="about-mission-grid">
          <div className="about-mission-card reveal-anim fade-up" style={{ transitionDelay: "0ms" }}>
            <img src="/images/rent.jpg" alt="Access" className="about-card-img" />
            <div className="about-mission-content">
              <h3 className="about-card-title"><LayoutGrid size={20}/> ACCESS</h3>
              <p className="about-card-desc">Make useful products accessible without requiring users to purchase them.</p>
            </div>
          </div>
          <div className="about-mission-card reveal-anim fade-up" style={{ transitionDelay: "100ms" }}>
            <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=600&auto=format&fit=crop" alt="Trust" className="about-card-img" />
            <div className="about-mission-content">
              <h3 className="about-card-title"><ShieldCheck size={20}/> TRUST</h3>
              <p className="about-card-desc">Create a reliable marketplace with transparent bookings, secure payments and reviews.</p>
            </div>
          </div>
          <div className="about-mission-card reveal-anim fade-up" style={{ transitionDelay: "200ms" }}>
            <img src="https://images.unsplash.com/photo-1511994298241-608e28f14fde?q=80&w=600&auto=format&fit=crop" alt="Opportunity" className="about-card-img" />
            <div className="about-mission-content">
              <h3 className="about-card-title"><HandCoins size={20}/> OPPORTUNITY</h3>
              <p className="about-card-desc">Help owners generate income from products they already own.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="about-steps-section" ref={stepsRef}>
        <div className="about-center-header reveal-anim fade-up">
          <span className="about-section-label">HOW OUR MARKETPLACE WORKS</span>
          <h2 className="about-section-title">How our Marketplace works</h2>
        </div>
        <div className="about-timeline-container reveal-anim fade-up">
          <div className="about-timeline-line"></div>
          <div className="about-step">
            <div className="about-step-node">01</div>
            <div className="about-step-img-box"><Search className="about-step-icon"/></div>
            <h4 className="about-step-title">Discover</h4>
            <p className="about-step-desc">Search products</p>
          </div>
          <div className="about-step">
            <div className="about-step-node">02</div>
            <div className="about-step-img-box"><CalendarCheck className="about-step-icon"/></div>
            <h4 className="about-step-title">Choose</h4>
            <p className="about-step-desc">Select dates</p>
          </div>
          <div className="about-step">
            <div className="about-step-node">03</div>
            <div className="about-step-img-box"><CreditCard className="about-step-icon"/></div>
            <h4 className="about-step-title">Book & Pay</h4>
            <p className="about-step-desc">Secure checkout</p>
          </div>
          <div className="about-step">
            <div className="about-step-node">04</div>
            <div className="about-step-img-box"><Star className="about-step-icon"/></div>
            <h4 className="about-step-title">Enjoy</h4>
            <p className="about-step-desc">Use & return</p>
          </div>
        </div>
      </section>

      {/* 5. FOR RENTERS */}
      <section className="about-renters-section" ref={rentersRef}>
        <div className="about-center-header reveal-anim fade-up">
          <span className="about-section-label">FOR RENTERS</span>
          <h2 className="about-section-title">Everything You Need to<br/>Rent With Confidence</h2>
        </div>
        <div className="about-renter-grid">
          <div className="about-renter-card reveal-anim fade-up">
            <div className="about-rc-text">
              <Clock className="about-rc-icon"/>
              <h4>Flexible Rental Dates</h4>
              <p>Choose the dates that work for you.</p>
            </div>
            <div className="about-rc-visual"><div className="about-mock-circle"></div></div>
          </div>
          <div className="about-renter-card reveal-anim fade-up">
            <div className="about-rc-text">
              <CalendarCheck className="about-rc-icon"/>
              <h4>Availability Checking</h4>
              <p>Know before booking.</p>
            </div>
            <div className="about-rc-visual"><div className="about-mock-calendar"></div></div>
          </div>
          <div className="about-renter-card reveal-anim fade-up">
            <div className="about-rc-text">
              <Shield className="about-rc-icon"/>
              <h4>Secure Payments</h4>
              <p>100% safe checkout.</p>
            </div>
            <div className="about-rc-visual"><div className="about-mock-card"></div></div>
          </div>
          <div className="about-renter-card reveal-anim fade-up">
            <div className="about-rc-text">
              <BarChart3 className="about-rc-icon"/>
              <h4>Rental Tracking</h4>
              <p>Manage active rentals.</p>
            </div>
            <div className="about-rc-visual"><div className="about-mock-chart"></div></div>
          </div>
        </div>
      </section>

      {/* 6. FOR OWNERS */}
      <section className="about-owners-section" ref={ownersRef}>
        <div className="about-owners-box">
          <div className="about-owners-content reveal-anim fade-right">
            <span className="about-section-label">FOR OWNERS</span>
            <h2 className="about-section-title">Turn Your Products<br/>Into Opportunities</h2>
            <p className="about-section-desc">Owners can list products, manage prices / deposits / requests / tracking / history / earnings.</p>
            <button className="about-btn about-btn-primary mt-4" onClick={()=>navigate("/ownerSetup")}>Start Listing <ArrowRight size={16}/></button>
          </div>
          <div className="about-owners-ui reveal-anim fade-left">
            <div className="about-dashboard-mock">
              <div className="about-dash-head">Dashboard</div>
              <div className="about-dash-stats">
                <div><span>Products</span><strong>12</strong></div>
                <div><span>Pending</span><strong>3</strong></div>
                <div className="about-highlight-stat"><span>Earnings</span><strong>₹40,000</strong></div>
              </div>
              <div className="about-dash-bars">
                <div className="about-bar"></div><div className="about-bar"></div><div className="about-bar"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. TRUST & TRANSPARENCY */}
      <section className="about-trust-section" ref={trustRef}>
        <div className="about-center-header reveal-anim fade-up">
          <span className="about-section-label">TRUST & TRANSPARENCY</span>
          <h2 className="about-section-title">Designed for a Better Rental Experience</h2>
        </div>
        <div className="about-trust-grid">
          <div className="about-trust-card reveal-anim fade-up">
            <CheckCircle className="about-trust-icon"/>
            <h4>Verified Information</h4>
            <p>Clear product info.</p>
          </div>
          <div className="about-trust-card reveal-anim fade-up">
            <HandCoins className="about-trust-icon"/>
            <h4>Transparent Pricing</h4>
            <p>No hidden fees.</p>
          </div>
          <div className="about-trust-card reveal-anim fade-up">
            <CreditCard className="about-trust-icon"/>
            <h4>Secure Checkout</h4>
            <p>Razorpay integration.</p>
          </div>
          <div className="about-trust-card reveal-anim fade-up">
            <Star className="about-trust-icon"/>
            <h4>Reviews & Ratings</h4>
            <p>Community driven.</p>
          </div>
        </div>
      </section>

      {/* 8. PLATFORM NUMBERS */}
      <section className="about-stats-strip">
        <div className="about-stats-container">
          <div className="about-stat" ref={productsRef}>
            <h2>{productsCount}+</h2>
            <span>Products Listed</span>
          </div>
          <div className="about-stat" ref={bookingsRef}>
            <h2>{bookingsCount}+</h2>
            <span>Successful Bookings</span>
          </div>
          <div className="about-stat" ref={ownersRefCount}>
            <h2>{ownersCount}+</h2>
            <span>Active Owners</span>
          </div>
          <div className="about-stat">
            <h2>4.8/5</h2>
            <span>User Experience</span>
          </div>
        </div>
      </section>

      {/* 9. WHY CHOOSE US */}
      <section className="about-why-section" ref={whyRef}>
        <div className="about-center-header reveal-anim fade-up">
          <span className="about-section-label">WHY CHOOSE US</span>
        </div>
        <div className="about-why-grid">
          <div className="about-why-card reveal-anim fade-up"><Search className="about-w-icon"/> <h4>Easy Discovery</h4></div>
          <div className="about-why-card reveal-anim fade-up"><Clock className="about-w-icon"/> <h4>Flexible Rentals</h4></div>
          <div className="about-why-card reveal-anim fade-up"><ShieldCheck className="about-w-icon"/> <h4>Trusted Marketplace</h4></div>
          <div className="about-why-card reveal-anim fade-up"><LayoutGrid className="about-w-icon"/> <h4>Simple Booking</h4></div>
          <div className="about-why-card reveal-anim fade-up"><CreditCard className="about-w-icon"/> <h4>Secure Payments</h4></div>
          <div className="about-why-card reveal-anim fade-up"><HeadphonesIcon className="about-w-icon"/> <h4>Dedicated Support</h4></div>
          <div className="about-why-card reveal-anim fade-up"><HeartHandshake className="about-w-icon"/> <h4>Reliable Service</h4></div>
          <div className="about-why-card reveal-anim fade-up"><BadgeCheck className="about-w-icon"/> <h4>Verified Listings</h4></div>

        </div>
      </section>

      {/* 10. FINAL CTA */}
      <section className="about-cta-section" ref={ctaRef}>
        <div className="about-cta-content reveal-anim scale-up">
          <span className="about-cta-label">FINAL CTA SECTION</span>
          <h2 className="about-cta-title">Ready to Rent Something?</h2>
          <p className="about-cta-desc">Find what you need, choose your dates and start your rental journey.</p>
          <div className="about-cta-actions">
            <button className="about-btn about-btn-light" onClick={()=>navigate("/products")}>Explore Rentals</button>
            <button className="about-btn about-btn-outline" onClick={()=>navigate("/ownerSetup")}>Become an Owner</button>
          </div>
        </div>
        {/* Decorative background circles */}
        <div className="about-cta-shape shape-1"></div>
        <div className="about-cta-shape shape-2"></div>
      </section>

    </div>
  );
};

export default AboutUs;



