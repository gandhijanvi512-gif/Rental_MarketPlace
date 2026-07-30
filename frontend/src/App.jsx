import { Routes, useLocation } from 'react-router-dom'
import { Route } from 'react-router-dom'
import './App.css'
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

function App() {
  const location=useLocation()

  const [user,setUser]=useState(null)

  const getUser=async()=>{
    try{
      const res=await api.get("/getme")
      setUser(res.data.user)
    }catch(err){
      console.log(err);
      
    }
  }

  useEffect(()=>{
    getUser();
  },[])

  const hidenavbar=location.pathname==="/signin" ||
                   location.pathname==="/signup";

  const hideFooter=location.pathname==="/signin" || location.pathname==="/signup"             

  return(
    <>
    {!hidenavbar && <Navbar user={user} setUser={setUser}/>}
    
    <Routes>
      <Route path='/signup' element={<Signup />}/>
      <Route path='/signin' element={<Signin />}/>
      <Route path='addProduct' element={<AddProduct />}/>
      <Route path='/home' element={<Home />}/>
      <Route path='updateproduct/:id' element={<Updateproduct />}/>
      <Route path='/myproducts' element={<MyProduct />}/>
      <Route path='/products/:id' element={<ProductDetails />}/>
      <Route path="/cart" element={<Cart />} />
      <Route path='/products' element={<Product />}/>
      <Route path='/checkout' element={<Checkout />}/>
      <Route path='/bookingconfirmed' element={<Bookingconfirmed />}/>
      <Route path='/categories' element={<Category />}/>
      
    </Routes>

    {!hideFooter && <Footer />}

    </>
  )
}

export default App

