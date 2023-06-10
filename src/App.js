import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import Register from "./pages/register/Register";
import ConfirmAccount from "./pages/confirmAccount/ConfirmAccount";
import HomeLayout from "./layouts/homeLayout/HomeLayout";
import Home from "./pages/home/Home";
import AccountPageLayout from "./layouts/accountPageLayout/AccountPageLayout";
import Account from "./pages/account/Account";
import {useEffect, useState } from "react";
import Orders from "./pages/orders/Orders";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./features/user/userSlice";
import FollowingStores from "./pages/followingStores/FollowingStores";
import AccountTransactions from "./pages/accountTransactions/AccountTransactions";
import ConfirmSeller from "./pages/confirmSeller/ConfirmSeller";
import MyProducts from "./pages/myProducts/MyProducts";
import AddProduct from "./pages/addProduct/AddProduct";
import { getProducts } from "./features/seller/sellerSlice";
import AddCampaign from "./pages/addCampaign/AddCampaign";
import Product from "./pages/product/Product";
import OrderPage from "./pages/order/Order";
import FavProducts from "./pages/favProducts/FavProducts";
import Seller from "./pages/seller/Seller";
import ProductSearch from "./pages/productSearch/ProductSearch";
import SearchCampaignProducts from "./pages/searchCampaignProducts/SearchCampaignProducts";

function App() {
  const [selectedImage, setSelectedImage] = useState('');
  const {user} = useSelector(
    (state) => state.auth
  );

const dispatch = useDispatch();
useEffect(() => {
  if(user){
    dispatch(getUser());
    if(user.isSeller){
      dispatch(getProducts())
;    }
  }
},[dispatch,user])
  
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/forgotpassword' element={<ForgotPassword/>}/>
        <Route path='/forgotpassword/change/' element={<ForgotPassword/>}/>
        <Route path='/confirmaccount' element={<ConfirmAccount/>}/>
        <Route path='/confirmseller' element={<ConfirmSeller/>}/>
        <Route path= '/' element={<HomeLayout setSelectedImage={setSelectedImage} selectedImage={selectedImage}/>}>
        <Route index={true} element={<Home/>}/>
        <Route path='product' element={<Product/>}/>
        <Route path='order' element={<OrderPage/>}/>
        <Route path='favorites' element={<FavProducts/>}/>
        <Route path='seller' element={<Seller/>}/>
        <Route path='productsearch' element={<ProductSearch/>}/>
        <Route path='campaignproducts' element={<SearchCampaignProducts/>}/>
        <Route path="account" element={<AccountPageLayout/>}>
          <Route index={true} element={<Account selectedImage={selectedImage} setSelectedImage={setSelectedImage}/>}/>
          <Route path="orders" element={<Orders/>}/>
          <Route path="followingstores" element={<FollowingStores/>}/>
          <Route path="accounttransactions" element={<AccountTransactions/>}/>
          <Route path="products" element={<MyProducts/>}/>
          <Route path="addproduct" element={<AddProduct/>}/>
          <Route path="addcampaign" element={<AddCampaign/>}/>
        </Route>
        </Route>
      </Routes>
      <ToastContainer/>
    </>
  );
}

export default App;
