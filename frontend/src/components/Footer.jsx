import { Link } from "react-router-dom";
import { FaFacebook,FaInstagram,FaTwitter,FaYoutube } from "react-icons/fa";

function Footer(){
    return(
<footer className="footer">
  <div className="footer-glass">

    <div className="footer-grid">

      <div className="footer-col">
        <h2>RentEase</h2>
        <p>
          Rent bikes, cameras, laptops, books and more with secure booking and
          affordable pricing.
        </p>

        <div className="socials">
          <a href="#"><FaFacebook /></a>
          <a href="#"><FaInstagram /></a>
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaYoutube /></a>
        </div>
      </div>

      <div className="footer-col">
        <h3>Quick Links</h3>
        <Link to="/home">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/aboutus">About</Link>
        <Link to="/contactus">Contact</Link>
      </div>

      <div className="footer-col">
        <h3>Categories</h3>
        <Link to="/products?category=Bike">Bikes</Link>
        <Link to="/products?category=Camera">Cameras</Link>
        <Link to="/products?category=Laptop">Laptops</Link>
        <Link to="/products?category=Book">Books</Link>
      </div>

      <div className="footer-col">
        <h3>Newsletter</h3>

        <div className="newsletter">
          <input
            type="email"
            placeholder="Enter your email"
          />
          <button>Subscribe</button>
        </div>
      </div>

    </div>

    <div className="footer-bottom">
      © 2026 RentEase. All Rights Reserved.
    </div>

  </div>
</footer>
    )
}

export default Footer