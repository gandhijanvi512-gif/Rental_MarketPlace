import React, { useState } from "react";
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  User,
  FileText,
  ChevronDown,
  Pencil,
  Send,
  CalendarDays,
  Calendar,
  IndianRupee,
  Package,
  CircleUserRound,
  LockKeyhole,
  MessageCircle,
  ArrowRight,
  Headphones,
  Heart,
  ShoppingCart,
  UserCircle,
  Camera,
  Bike,
  Laptop,
  Sofa,
} from "lucide-react";

import api from "../service/api";

const ContactUs = () => {
  const [formData,setFormData]=useState({
    name:"",
    email:"",
    subject:"",
    category:"",
    message:""
  })

  const[loading,setLoading]=useState(false);
  const [success,setSuccess]=useState("");
  const [error,setError]=useState("")

  const handleChange=(e)=>{
    const {name,value}=e.target;

    setFormData((prev)=>({
        ...prev,
        [name]:value
    }))
  }

  const handleSubmit=async(e)=>{
    e.preventDefault()

    setLoading(true)
    setSuccess("")
    setError("")

    try{
        const res=await api.post("/admin/contact",formData,{
            withCredentials:true
        })

        if(res.data.success){
            setSuccess(
                res.data.message || "Your message has been sent successfully!"
            )

            setFormData({
                name:"",
                email:"",
                subject:"",
                category:"",
                message:"",
            })
        }else{
            setError(
            res.data.message || "Failed to send your message"
            );
        }
    }catch(err){
        console.log(err);

      setError(
        err.response?.data?.message ||
        "Something went wrong. Please try again."
      );
        
    }finally{
        setLoading(false)
    }

  }
  

  // ================================
  // HELP CATEGORIES
  // ================================

  const helpCategories = [
    {
      icon: <CalendarDays size={28} />,
      title: "Booking Help",
      text: "Questions about rentals, bookings or cancellations.",
    },
    {
      icon: <IndianRupee size={28} />,
      title: "Payment Support",
      text: "Issues with payments, refunds, deposits or Razorpay.",
    },
    {
      icon: <Package size={28} />,
      title: "Product Issues",
      text: "Questions about products, availability or pricing.",
    },
    {
      icon: <CircleUserRound size={28} />,
      title: "Owner Support",
      text: "Help for owners regarding listings, bookings or earnings.",
    },
    {
      icon: <LockKeyhole size={28} />,
      title: "Account Help",
      text: "Login issues, profile updates or account related help.",
    },
    {
      icon: <MessageCircle size={28} />,
      title: "General Inquiry",
      text: "Any other questions about our rental marketplace.",
    },
  ];

  return (
    <div className="contact-page">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="contact-hero">
        <div className="contact-hero-content">
          <span className="hero-small-title">CONTACT US</span>

          <h1>
            We’re Here to Help
            <br />
            You Rent Better
          </h1>

          <p>
            Have a question about a booking, payment, product,
            <br />
            or listing? Our team is always ready to assist you.
          </p>

          <a href="#contact-form" className="hero-button">
            <Mail size={18} />
            Send Us a Message
          </a>
        </div>

        {/* HERO ILLUSTRATION */}

        <div className="contact-hero-visual">
          {/* Dotted circle */}

          <div className="hero-circle"></div>

          {/* CAMERA */}

          <div className="floating-item hero-camera">
            <Camera size={40} />
          </div>

          {/* LAPTOP */}

          <div className="floating-item hero-laptop">
            <Laptop size={37} />
          </div>

          {/* BIKE */}

          <div className="floating-item hero-bike">
            <Bike size={38} />
          </div>

          {/* SOFA */}

          <div className="floating-item hero-sofa">
            <Sofa size={38} />
          </div>

          {/* PERSON */}

          <div className="support-person">
            <div className="person-hair"></div>

            <div className="person-face">
              <div className="person-eye left"></div>
              <div className="person-eye right"></div>

              <div className="person-mouth"></div>
            </div>

            <div className="person-body"></div>

            <div className="person-hand"></div>
          </div>

          {/* LAPTOP ON DESK */}

          <div className="support-laptop">
            <Laptop size={85} />
          </div>

          {/* CHAT */}

          <div className="support-chat">
            <span>•••</span>
          </div>

          {/* DESK */}

          <div className="support-desk"></div>
        </div>
      </section>

      {/* =====================================================
          CONTACT SECTION
      ===================================================== */}

      <section className="contact-main-section">
        {/* =================================================
            LEFT - CONTACT INFORMATION
        ================================================= */}

<div className="contact-info-card">

    <div className="section-heading">
        <span className="contact-label">GET IN TOUCH</span>

        <h2>Let’s Talk</h2>

        <p>
            Have a question or need help with your rental?
            Our support team is here to make your experience
            simple and stress-free.
        </p>
    </div>

    <div className="contact-info-list">

        {/* LOCATION */}
        <div className="contact-info-item">
            <div className="info-icon">
                <MapPin size={22} />
            </div>

            <div className="info-content">
                <span>Our Location</span>
                <h4>Surat, Gujarat, India</h4>
            </div>
        </div>


        {/* EMAIL */}
        <div className="contact-info-item">
            <div className="info-icon">
                <Mail size={22} />
            </div>

            <div className="info-content">
                <span>Email Us</span>
                <h4>support@rentora.com</h4>
            </div>
        </div>


        {/* PHONE */}
        <div className="contact-info-item">
            <div className="info-icon">
                <Phone size={22} />
            </div>

            <div className="info-content">
                <span>Call Us</span>
                <h4>+91 98765 43210</h4>
            </div>
        </div>


        {/* SUPPORT HOURS */}
        <div className="contact-info-item">
            <div className="info-icon">
                <Clock size={22} />
            </div>

            <div className="info-content">
                <span>Support Hours</span>
                <h4>Monday - Saturday</h4>
                <p>10:00 AM - 7:00 PM</p>
            </div>
        </div>

    </div>


    {/* QUICK SUPPORT */}
    <div className="contact-support-box">

        <div className="support-icon">
            <Headphones size={24} />
        </div>

        <div>
            <h4>Need Quick Help?</h4>

            <p>
                Our support team is ready to assist you.
            </p>
        </div>

    </div>

</div>

        {/* =================================================
            RIGHT - FORM
        ================================================= */}
        <div className="contact-form-card" id="contact-form">
            <div className="section-heading">
                <h2>
                    Send Us a Message
                </h2>

                <p>
                    Fill out the form and our team will get back to you as soon as possible.
                </p>
            </div>

            {/* success */}
            {success && (
                <div className="contact-success">
                     ✓ {success}
                </div>
            )}

            {/* error */}
            {error && (
                <div className="contact-error">
                    ⚠ {error}
                </div>
            )}


            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="contact-input-group">
                        <label>
                            Full Name
                        </label>

                        <div className="input-wrapper">
                            <User size={17} />

                            <input type="text" placeholder="Enter your full name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="contact-input-group">
                        <label>Email Address</label>

                        <div className="input-wrapper">
                            <Mail size={17} />

                            <input type="email" placeholder="Enter your email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                </div>

                {/* subject */}

                <div className="contact-input-group">
                    <label>Subject</label>

                    <div className="input-wrapper">
                        <FileText size={17} />

                        <input type="text" placeholder="Enter your subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                {/* category */}

                <div className="contact-input-group">
                    <label htmlFor="">Category</label>

                    <div className="select-wrapper">
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select a category</option>
                            <option value="Booking Issue">Booking Issue</option>
                            <option value="Payment Issue">Payment Issue</option>
                            <option value="Product Issue">Product Issue</option>
                            <option value="Owner Issue">Owner Issue</option>
                            <option value="Account Issue">Account Issue</option>
                            <option value="General Inquiry">General Inquiry</option>
                        </select>
                         <ChevronDown size={17} />
                    </div>
                </div>

                <div className="contact-input-group">
                    <label htmlFor="">Message</label>

                    <div className="textarea-wrapper">
                        <Pencil size={17} />

                        <textarea 
                            name="message"
                            value={formData.message}
                            placeholder="Enter your message"
                            onChange={handleChange}
                            rows={5}
                            required
                        />
                    </div>
                </div>

                <div className="form-submit-wrapper">
                    <button 
                        type="submit"
                        className="send-message-btn"
                        disabled={loading}
                    > 
                    {loading?("Sending..."):(
                        <>
                            <Send size={17} />
                            Send Message
                        </>
                    )}

                    </button>
                </div>

            </form>
        </div>

      </section>

      {/* =====================================================
          HELP SECTION
      ===================================================== */}

<section className="help-section">

    <div className="help-section-header">
        <h2>How Can We Help?</h2>
        <p>Choose a category that best fits your concern.</p>
    </div>

    <div className="help-categories">

        <div className="help-category-card">
            <div className="help-category-icon">
                <Calendar />
            </div>

            <h3>Booking Help</h3>

            <p>
                Questions about rentals, bookings or cancellations.
            </p>
        </div>

        <div className="help-category-card">
            <div className="help-category-icon">
                <IndianRupee />
            </div>

            <h3>Payment Support</h3>

            <p>
                Issues with payments, refunds, deposits or Razorpay.
            </p>
        </div>

        <div className="help-category-card">
            <div className="help-category-icon">
                <Package />
            </div>

            <h3>Product Issues</h3>

            <p>
                Questions about products, availability or pricing.
            </p>
        </div>

        <div className="help-category-card">
            <div className="help-category-icon">
                <User />
            </div>

            <h3>Owner Support</h3>

            <p>
                Help for owners regarding listings, bookings or earnings.
            </p>
        </div>

        <div className="help-category-card">
            <div className="help-category-icon">
                <LockKeyhole />
            </div>

            <h3>Account Help</h3>

            <p>
                Login issues, profile updates or account related help.
            </p>
        </div>

        <div className="help-category-card">
            <div className="help-category-icon">
                <MessageCircle />
            </div>

            <h3>General Inquiry</h3>

            <p>
                Any other questions about our rental marketplace.
            </p>
        </div>

    </div>

</section>

      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="contact-cta">
        <div className="cta-headphone">
          <Headphones size={58} />
        </div>

        <div className="cta-content">
          <span>Still need help?</span>

          <h2>We’re happy to hear from you!</h2>

          <a href="#contact-form">
            Send Us a Message
            <ArrowRight size={18} />
          </a>
        </div>

        <div className="cta-mail">
          <Mail size={75} />
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
