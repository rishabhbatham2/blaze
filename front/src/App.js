import logo from './logo.svg';
import './App.css';


import { useContext, useState } from 'react';
import { UserContext } from './context/UserContext';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { UserProvider } from './context/UserContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import PrivacyPolicy from './Pages/PrivacyPolicy/PrivacyPolicy';
import TermsAndCondition from './Pages/TermsAndConditions/TermsAndConditions';
import Cancel from './Pages/Cancel/Cancel';
import ShirtView from './Pages/ViewShirt/ViewShirt';
import Collection from './Pages/Collection/Collection';
import Wishlist from './components/Wishlist/Wishlist';
import { Admin } from 'react-admin';
import AdminPanel from './Pages/admin/Admin';
import Cart from './Pages/Cart/Cart';
import Faq from './Pages/Faq/Faq';
import ContactUs from './Pages/ContactUs/ContactUs';
import Login from './Pages/Login/Login';
import 'react-toastify/dist/ReactToastify.css';
import { MyContext, MyContextProvider } from './context/MyContext';
import SignUp from './Pages/Signup/Signup';
import MyOrders from './Pages/MyOrders/MyOrders';
import OverlayCard from './components/OverlayCard/OverlayCard';
import SecureAdmin from './SecureAdmin/SecureAdmin';
import SearchResult from './Pages/SearchResult/SearchResult';
import SecureLogin from './SecureAdmin/SecuredLogin';
import SearchInput from './Pages/SearchInput/SearchInput';
import TrackOrder from './Pages/TrackOrder/TrackOrder';
import UserInfo from './Pages/UserInfo/UserInfo';
import InstantBuy from './Pages/InstantBuy/InstantBuy';
import ResetPass from './Pages/ResetPassword/ResetPassword';
const AppContent=()=>{

 /*  localStorage.clear() */

 


  const LayoutComp=({child,nf})=>{
    return(
      <>
    <Navbar/>
    {child}
    {!nf?<Footer/>:<></>}
      </>
    )

  }
/*   localStorage.clear() */



  return(     <div className="App">
 
    

   
    <Router>
   
     <Routes>
        <Route path='/' element={<LayoutComp child={<Home/>}/>} />
        <Route path='/privacy-policy' element={<LayoutComp child={<PrivacyPolicy/>}/>} />
        <Route path='/terms' element={<LayoutComp child={<TermsAndCondition/>} />} />
        <Route path='/refund-and-cancellation' element={<LayoutComp child={<Cancel/>}/>} />
        <Route path='/view/:product_id' element={<LayoutComp child={<ShirtView/>}/>} />
        <Route path='/wishlist' element={<LayoutComp child={<Wishlist/>}/>} />
     {/*    <Route path="/admin/*" element={<SecureAdmin />}>
                    <Route path="main/" element={<AdminPanel/>} />
                  
                </Route> */}
        <Route path='/admin/*' element={<SecureAdmin child={<AdminPanel/> } />} />
        <Route path='/category/:name/:subcategory' element={<LayoutComp child={<Collection/>}/>} />
        <Route path='/search/:keyword' element={<LayoutComp child={<SearchResult/>}/>} />
        <Route path='/track/:waybill' element={<LayoutComp child={<TrackOrder/>}/>} />
        <Route path='/instantbuy/*' element={<LayoutComp child={<InstantBuy/>}/>} />

        <Route path='/cart/*' element={<LayoutComp nf child={<Cart/>}/>} />
        <Route path='/faq' element={<LayoutComp child={<Faq/>}/>} />
        <Route path='/contact-us' element={<LayoutComp child={<ContactUs/>}/>} />
        <Route path='/log-in' element={<SecureLogin child={<LayoutComp nf child={<Login/>}/>}/>} />
        <Route path='/sign-up' element={<SecureLogin child={<LayoutComp nf child={<SignUp/>}/>}/>} />
        <Route path='/reset-password' element={<SecureLogin child={<LayoutComp nf child={<ResetPass/>}/>}/>} />
        <Route path='/orders' element={<LayoutComp child={<MyOrders/>}/>} />
        <Route path='/userinfo/*' element={<LayoutComp child={<UserInfo/>}/>} />
        <Route path='/search' element={<SearchInput/>} />
      {/*   <Route path='/category' element={<LayoutComp child={<Collection/>}/>} /> */}
     </Routes>
   
    </Router>



  
    <div style={{position:'absolute',zIndex:22}}><OverlayCard/></div>
    <div className='toastcont'> <ToastContainer /></div>
   
   </div>)
}

function App() {


 


  return (
    <MyContextProvider>
      <AppContent/>
    </MyContextProvider>
 /*   <UserProvider> */
   
  /*  </UserProvider> */
  );
}

export default App;
