import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './Admin.css';
import ReusableTable from '../../components/ReusableTable/ReusatbleTable';
import User from './User';
import ProductEdit from './ProductEdit/ProductEdit';
import CategoryList from './CategoryList/CategoryList';
import CategoryEdit from './CategoryEdit/CategoryEdit';
import SubCategoryList from './SubcategoryList/SubcategoryList';
import SubCategoryEdit from './SubcategoryEdit/SubcategoryEdit';
import ProductList from './ProductList/ProductList';
import ReusableShowComp from '../../components/ReusableShowComponent/ReusableShowComponent';
import ProductView from './ProductShow/ProductShow';
import VariantEdit from './VariantEdit/VariantEdit';
import VariantAdd from './VariantAdd/VariantAdd';
import Dashboard from './Dashboard/Dashboard';
import UserList from './UsersList/UsersList';
import PaymentList from './PaymentList/PaymentList';
import OrderList from './OrderList/OrderList';
import { MyContext } from '../../context/MyContext';
import NewOrders from './NewOrders/NewOrders';
import AcceptOrder from './AcceptOrder/AcceptOrder';
import Shipping from './Shipping/Shipping';
import CouponList from './CouponList/CouponList';
import CouponEdit from './CouponEdit/CouponEdit';
import WalletHistoryList from './WalletList/Walletlist';

const Admin = () => {
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const navigate = useNavigate();
  const {user,logoutUser}=useContext(MyContext)

  const leftMenuItems = [
    { label: 'Dashboard', path: '/admin/', icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 9H6C8 9 9 8 9 6V4C9 2 8 1 6 1H4C2 1 1 2 1 4V6C1 8 2 9 4 9Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M16 9H18C20 9 21 8 21 6V4C21 2 20 1 18 1H16C14 1 13 2 13 4V6C13 8 14 9 16 9Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M16 21H18C20 21 21 20 21 18V16C21 14 20 13 18 13H16C14 13 13 14 13 16V18C13 20 14 21 16 21Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M4 21H6C8 21 9 20 9 18V16C9 14 8 13 6 13H4C2 13 1 14 1 16V18C1 20 2 21 4 21Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      </svg> },
    { label: 'Users', path: '/admin/users', icon: <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.59 21C18.59 17.13 14.74 14 10 14C5.26 14 1.41 17.13 1.41 21M15 6C15 8.76142 12.7614 11 10 11C7.23858 11 5 8.76142 5 6C5 3.23858 7.23858 1 10 1C12.7614 1 15 3.23858 15 6Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
       },
    { label: 'Category', path: '/admin/category', icon:<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 9H6C8 9 9 8 9 6V4C9 2 8 1 6 1H4C2 1 1 2 1 4V6C1 8 2 9 4 9Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M16 9H18C20 9 21 8 21 6V4C21 2 20 1 18 1H16C14 1 13 2 13 4V6C13 8 14 9 16 9Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M16 21H18C20 21 21 20 21 18V16C21 14 20 13 18 13H16C14 13 13 14 13 16V18C13 20 14 21 16 21Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M4 21H6C8 21 9 20 9 18V16C9 14 8 13 6 13H4C2 13 1 14 1 16V18C1 20 2 21 4 21Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
       },
    { label: 'Sub Category', path: '/admin/subcategory', icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 9H6C8 9 9 8 9 6V4C9 2 8 1 6 1H4C2 1 1 2 1 4V6C1 8 2 9 4 9Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M16 9H18C20 9 21 8 21 6V4C21 2 20 1 18 1H16C14 1 13 2 13 4V6C13 8 14 9 16 9Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M16 21H18C20 21 21 20 21 18V16C21 14 20 13 18 13H16C14 13 13 14 13 16V18C13 20 14 21 16 21Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M4 21H6C8 21 9 20 9 18V16C9 14 8 13 6 13H4C2 13 1 14 1 16V18C1 20 2 21 4 21Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
       },
       
    { label: 'Product', path: '/admin/product', icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.17001 6.44L11 11.55L19.77 6.46997M11 20.61V11.54M16 12.24V8.58002L6.51001 3.09998M8.92999 1.48L3.59 4.45003C2.38 5.12003 1.39001 6.80001 1.39001 8.18001V13.83C1.39001 15.21 2.38 16.89 3.59 17.56L8.92999 20.53C10.07 21.16 11.94 21.16 13.08 20.53L18.42 17.56C19.63 16.89 20.62 15.21 20.62 13.83V8.18001C20.62 6.80001 19.63 5.12003 18.42 4.45003L13.08 1.48C11.93 0.84 10.07 0.84 8.92999 1.48Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
       },
       { label: 'Coupons', path: '/admin/coupons', icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.17001 6.44L11 11.55L19.77 6.46997M11 20.61V11.54M16 12.24V8.58002L6.51001 3.09998M8.92999 1.48L3.59 4.45003C2.38 5.12003 1.39001 6.80001 1.39001 8.18001V13.83C1.39001 15.21 2.38 16.89 3.59 17.56L8.92999 20.53C10.07 21.16 11.94 21.16 13.08 20.53L18.42 17.56C19.63 16.89 20.62 15.21 20.62 13.83V8.18001C20.62 6.80001 19.63 5.12003 18.42 4.45003L13.08 1.48C11.93 0.84 10.07 0.84 8.92999 1.48Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
         },
     /*   { label: 'Orders', path: '/admin/orders', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.00003 8V4.5C8.00003 3 9.00003 2 10.5 2H13.5C15 2 16 3 16 4.5V8M20.41 17.03H8.00003M8.40002 6.5H15.6C19 6.5 19.34 8.09 19.57 10.03L20.47 17.53C20.76 19.99 20 22 16.5 22H7.51003C4.00003 22 3.24002 19.99 3.54002 17.53L4.44003 10.03C4.66003 8.09 5.00002 6.5 8.40002 6.5Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        
        
         }, */
       { label: 'Payments', path: '/admin/payments', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.85712 7.63639C8.63218 4.62508 11.3657 2.40002 14.619 2.40002C18.4749 2.40002 21.6008 5.52589 21.6008 9.38184C21.6008 12.456 19.6139 15.0662 16.8542 15.9982M16.3628 14.6182C16.3628 18.4742 13.2369 21.6 9.38099 21.6C5.52504 21.6 2.39917 18.4742 2.39917 14.6182C2.39917 10.7623 5.52504 7.63639 9.38099 7.63639C13.2369 7.63639 16.3628 10.7623 16.3628 14.6182Z" stroke="#444444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        
         },
         { label: 'New Orders', path: '/admin/neworders', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.85712 7.63639C8.63218 4.62508 11.3657 2.40002 14.619 2.40002C18.4749 2.40002 21.6008 5.52589 21.6008 9.38184C21.6008 12.456 19.6139 15.0662 16.8542 15.9982M16.3628 14.6182C16.3628 18.4742 13.2369 21.6 9.38099 21.6C5.52504 21.6 2.39917 18.4742 2.39917 14.6182C2.39917 10.7623 5.52504 7.63639 9.38099 7.63639C13.2369 7.63639 16.3628 10.7623 16.3628 14.6182Z" stroke="#444444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          
           },
           { label: 'Shipped Orders', path: '/admin/shipping', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.85712 7.63639C8.63218 4.62508 11.3657 2.40002 14.619 2.40002C18.4749 2.40002 21.6008 5.52589 21.6008 9.38184C21.6008 12.456 19.6139 15.0662 16.8542 15.9982M16.3628 14.6182C16.3628 18.4742 13.2369 21.6 9.38099 21.6C5.52504 21.6 2.39917 18.4742 2.39917 14.6182C2.39917 10.7623 5.52504 7.63639 9.38099 7.63639C13.2369 7.63639 16.3628 10.7623 16.3628 14.6182Z" stroke="#444444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            
             },
             { label: 'Wallet History', path: '/admin/wallet-history', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.85712 7.63639C8.63218 4.62508 11.3657 2.40002 14.619 2.40002C18.4749 2.40002 21.6008 5.52589 21.6008 9.38184C21.6008 12.456 19.6139 15.0662 16.8542 15.9982M16.3628 14.6182C16.3628 18.4742 13.2369 21.6 9.38099 21.6C5.52504 21.6 2.39917 18.4742 2.39917 14.6182C2.39917 10.7623 5.52504 7.63639 9.38099 7.63639C13.2369 7.63639 16.3628 10.7623 16.3628 14.6182Z" stroke="#444444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              
               },
         { label: 'Logout', path: '/log-in', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.85712 7.63639C8.63218 4.62508 11.3657 2.40002 14.619 2.40002C18.4749 2.40002 21.6008 5.52589 21.6008 9.38184C21.6008 12.456 19.6139 15.0662 16.8542 15.9982M16.3628 14.6182C16.3628 18.4742 13.2369 21.6 9.38099 21.6C5.52504 21.6 2.39917 18.4742 2.39917 14.6182C2.39917 10.7623 5.52504 7.63639 9.38099 7.63639C13.2369 7.63639 16.3628 10.7623 16.3628 14.6182Z" stroke="#444444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          
           },
    /* { label: 'Settings', path: '/admin/settings', icon: 'fa-solid fa-gear' }, */
  ];

  const handleMenuClick = (menu) => {
    console.log('path thaaaaaaaaaaaaaaaaas',menu)
    if(menu.path=='/log-in'){
      
      navigate(menu.path);
     logoutUser()
     
      
    }else{
      setActiveMenu(menu.label);
      navigate(menu.path);
    }
    
  };

  return (
    <div className="adminpanel__container">
      {/* Left Sidebar */}
      <aside className="adminpanel__sidebar">
        <div className="sidebar__header">Admin Panel</div>
        <div className="sidebar__content">
          <div className='sidebarrr'>
            Navigation
          </div>
          <ul className="sidebar__menu">
            {leftMenuItems.map((menu) => (
              <li
                key={menu.label}
                className={`sidebar__menu-item ${
                  activeMenu === menu.label ? 'sidebar__menu-item--active' : ''
                }`}
                onClick={() => handleMenuClick(menu)}
              >
                {menu.icon}
                {menu.label}
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <div className="adminpanel__content">
        {/* Top Navbar */}
        <nav className="adminpanel__navbar">
          <div className="adminpanel__navbar-user">
            <span className="adminpanel__navbar-username">{user?.firstname}</span>
         {/*    <img
              src="/images/"
              alt="User Icon"
              className="adminpanel__navbar-icon"
            /> */}
          </div>
        </nav>
       

        {/* Dynamic Content */}
        <div className="adminpanel__main-content removebar">
          <Routes>
            <Route path="/" element={<Dashboard/>} />
            <Route path='category' element={<CategoryList/>}/>
            <Route path='category-edit' element={<CategoryEdit mode='edit'/>}/>
            <Route path='category-add' element={<CategoryEdit mode='add'/>}/>


            <Route path='coupons' element={<CouponList/>}/>
            <Route path='coupon-add' element={<CouponEdit mode='add'/>}/>
            <Route path='coupon-edit' element={<CouponEdit mode='edit'/>}/>

            <Route path='subcategory' element={<SubCategoryList/>}/>
            <Route path='subcategory-edit' element={<SubCategoryEdit mode='edit'/>}/>
            <Route path='subcategory-add' element={<SubCategoryEdit mode='add'/>}/>

            <Route path='product' element={<ProductList/>}/>
            <Route path='product-edit' element={<ProductEdit mode='edit'/>}/>
            <Route path='product-add' element={<ProductEdit mode='add'/>}/>

            <Route path='variant-edit' element={<VariantEdit mode='edit'/>}/>
            <Route path='variant-add' element={<VariantAdd/>}/>


            <Route path='payments' element={<PaymentList/>}/>
            <Route path='wallet-history' element={<WalletHistoryList/>}/>
            
            <Route path='orders' element={<OrderList/>}/>
            <Route path='acceptorder/:id' element={<AcceptOrder/>}/>
            <Route path='neworders' element={<NewOrders/>}/>

            <Route path='view-product' element={<ProductView/>}/>
            <Route path='shipping' element={<Shipping/>}/>

            <Route path="users" element={
             
             <UserList/>
          
          
          } />
          <Route path='edit' element={<ProductEdit/>}/>
            <Route path="settings" element={<div>Settings Content</div>} />
            <Route path="/" element={<div>Welcome! Select a menu option.</div>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Admin;
