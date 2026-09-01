import { Routes, useLocation } from 'react-router-dom'
import { Route } from 'react-router-dom'
import './App.css'
import {Toaster} from "react-hot-toast"
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import AddProduct from './pages/product/AddProduct'
import Updateproduct from './pages/product/EditProduct'
import MyProduct from './pages/product/MyProduct'
import ProductDetails from './pages/product/ProductDetails'
import Cart from './pages/Cart'
import Home from './pages/Home'
import './index.css'
import Navbar from './components/Navbar'
import Product from './pages/Product'
import Footer from './components/Footer'
import Checkout from './pages/Checkout'
import Bookingconfirmed from './pages/Bookingconfirmed'
import api from './service/api'
import { useState } from 'react'
import { useEffect } from 'react'
import Category from './pages/Category'
import CategoryProducts from './pages/CategoryProducts'
import Profile from './pages/Profile'
import MyRental from './pages/MyRental'
import RentalHistory from './pages/RentalHistory'
import Setting from './pages/Setting'
import ProfileLayout from './pages/ProfileLayout'
import EditProfile from './pages/EditProfile'
import Wishlist from './pages/Wishlist'
import OwnerSetup from './pages/OwnerSetup'
import OwnerLayout from './pages/OwnerLayout'
import OwnerDashboard from './pages/OwnerDahboard'
import ActiveRentals from './components/ActiveRentals'
import OwnerActiveRentals from './pages/OwnerActiveRentals'
import OwnerHistory from './pages/OwnerHistory'
import OwnerEarning from './pages/OwnerEarning'
import AdminSignin from './pages/Admin/AdminSignin'
import AdminDashboard from './pages/Admin/AdminDashboard'
import AdminLayout from './components/AdminLayout'
import AdminSidebar from './components/AdminSidebar'
import AdminUsers from './pages/Admin/AdminUser'
import AdminOwner from './pages/Admin/AdminOwner'
import AdminProducts from './pages/Admin/AdminProducts'
import AdminBooking from './pages/Admin/AdminBooking'
import AboutUs from './pages/AboutUs'
import AdminProtectedRoute from './pages/Admin/AdminProtected'
import ContactUs from './pages/ContactUs'
import AdminContact from './pages/Admin/AdminContacts'
import AdminContactDetails from './pages/Admin/AdminContactDetails'




function App() {
  const location=useLocation()

  const [user,setUser]=useState(()=>{
    try{
      const savedUser=localStorage.getItem("user");

      const token=localStorage.getItem("accesstoken");

      return(savedUser && token) ? JSON.parse(savedUser):null
    }catch(_){
      return null
    }
  })

console.log("user:", user)
  // const getUser=async()=>{
  //   try{
  //     const res=await api.get("/getme")
  //     setUser(res.data.user)
  //   }catch(err){
  //     console.log(err);
      
  //   }
  // }

  const getUser=async()=>{
    const token=localStorage.getItem("accesstoken")

    if(!token){
      setUser(null)
      localStorage.removeItem("user")
      return;
    }

    try{
      const res=await api.get("/getme");
      setUser(res.data.user);
      localStorage.setItem("user",JSON.stringify(res.data.user))
    }catch(err){
      console.log(err);
      setUser(null)
      localStorage.removeItem("user")
    }
  }


useEffect(() => {
  window.scrollTo(0,0)
    if (location.pathname.startsWith("/admin") ||
        location.pathname==="/signin" ||
        location.pathname==="/signup"
    ){
        return;
    }

    getUser();
}, [location.pathname]);

  const isAdminPage=location.pathname.startsWith("/admin")

  const hidenavbar=location.pathname==="/signin" ||
                   location.pathname==="/signup" ||
                   isAdminPage;

  const hideFooter=location.pathname==="/signin" || 
                   location.pathname==="/signup" ||
                   isAdminPage;
  

  return(
    <div className='app-layout'>
     <Toaster position="top-right" />
    {!hidenavbar && <Navbar user={user} setUser={setUser}/>}
    
    <Routes>
      
      <Route path='/signup' element={<Signup />}/>
      <Route path='/signin' element={<Signin setUser={setUser} />}/>
      <Route path='/' element={<Home />}/>
      {/* <Route path='addProduct' element={<AddProduct />}/> */}
      <Route path='/home' element={<Home />}/>
      {/* <Route path='updateproduct/:id' element={<Updateproduct />}/> */}
      {/* <Route path='/myproducts' element={<MyProduct />}/> */}
      <Route path='/productsdetails/:id' element={<ProductDetails />}/>
      <Route path="/cart" element={<Cart />} />
      <Route path='/products' element={<Product />}/>
      <Route path='/checkout' element={<Checkout />}/>
      <Route path='/bookingconfirmed' element={<Bookingconfirmed />}/>
      <Route path='/category' element={<Category />} />
      <Route path='/category/:category' element={<CategoryProducts />}/>
      <Route path='/editprofile' element={<EditProfile />}/>
      <Route path='/wishlist' element={<Wishlist />} />
      <Route path='/about' element={<AboutUs />}/>
      <Route path="/contact" element={<ContactUs />}/>
      <Route path='/aboutus' element={<AboutUs />}/>
      <Route path="/contactus" element={<ContactUs />}/>
      
      
      
      {/* <Route path='/profile' element={<Profile />}/>
      <Route path='/myrentals' element={<MyRental />}/>
      <Route path='/rentalhistory' element={<RentalHistory />}/>
      <Route path='/settings' element={<Setting />}/> */}

      <Route element={<ProfileLayout user={user} />}>
        <Route path='/profile' element={<Profile />}/>
        <Route path='/myrentals' element={<MyRental />}/>
        <Route path='/rentalhistory' element={<RentalHistory />}/>
        <Route path='/setting' element={<Setting />}/>
        {/* <Route path='/ownerdashboard'  element={<h1>Owner Dashboard</h1>}/> */}
        <Route path='/ownerSetup' element={<OwnerSetup />}/>
      </Route>

      <Route element={<OwnerLayout />}>
        <Route path='/ownerdashboard' element={<OwnerDashboard />}/>
        <Route path='/addProduct' element={<AddProduct />} />
        <Route path='/myproducts' element={<MyProduct />}/>
        <Route path="/updateproduct/:id" element={<Updateproduct />}/>
        <Route path='owner/activerentals' element={<OwnerActiveRentals />}/>
        <Route path='owner/rentalhistory' element={<OwnerHistory />}/>
        <Route path='owner/earnings' element={<OwnerEarning />}/>
      </Route> 

      <Route path='/admin/signin' element={<AdminSignin />}/>


      <Route element={<AdminProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          <Route path='/admin/users' element={<AdminUsers />} />
          <Route path='/admin/owners' element={<AdminOwner />} />
          <Route path='/admin/products' element={<AdminProducts />}/>
          <Route path='/admin/bookings' element={<AdminBooking />} />
          <Route path='/admin/contacts' element={<AdminContact />} />
          <Route path="/admin/contact/:id" element={<AdminContactDetails />} />
        </Route>
      </Route>
      
    </Routes>

    {!hideFooter && <Footer />}

    </div>
  )
}

export default App

