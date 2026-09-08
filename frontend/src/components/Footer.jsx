import { Link } from "react-router-dom";
import { FaFacebook,FaInstagram,FaTwitter,FaYoutube } from "react-icons/fa";

function Footer(){
    return(
<footer className="footer">
  <div className="footer-glass">

    <div className="footer-grid">

      <div className="footer-col">
        <h2>RentEase</h2>
        <p style={{textAlign:"justify"}}>
          Rent bikes, cameras, laptops, books, and more with secure booking and affordable pricing.
          Explore a wide range of quality products, choose flexible rental options, and enjoy a simple and convenient rental experience. 
          Whether you need something for a day, a weekend, or longer, find what you need at the right price.

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
        <Link to="/cart"> Cart</Link>
      </div>

      <div className="footer-col">
        <h3>Categories</h3>
        <Link to="/category/Properties">Properties</Link>
        <Link to="/category/Electronics">Electronics</Link>
        <Link to="/category/Fashion">Fashion</Link>
        <Link to="/category/Furniture">Books</Link>
        <Link to="/category/Books">Books</Link>
        

      </div>

      <div className="footer-col">
        <h3>Need Help?</h3>

        <p className="footer-help-text">
          Have an issue or need assistance? Our support team is here to help.
        </p>
        <br />
        <div className="footer-support">
          
          <div>
            <p style={{color:"white"}}>🎫Raise a Ticket</p>
            <p>Get support for your issue</p>
          </div>
        </div>
        <br />

        <div className="footer-support">
          <div>
            <p style={{color:"white"}}>💬Contact Support</p>
            <p>We're happy to assist you</p>
          </div>
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