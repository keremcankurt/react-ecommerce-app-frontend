import React, { useEffect, useState } from 'react'
import './MyProducts.scss'
import { useSelector } from 'react-redux';
import SellerProduct from '../../components/sellerProduct/SellerProduct';
import Searchbar from '../../components/searchBar/Searchbar';
import { useNavigate } from 'react-router-dom';

export default function MyProducts() {
  const {products} = useSelector(
    (state) => state.seller
  );
  const {user, isSuccess} = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();
  useEffect(() => {
    if(isSuccess) {
      if(!user.seller.isSeller){
        navigate("/");
      }
    }
  }, [navigate, isSuccess, user])
  const [searchText, setSearchText] = useState('');
  const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchText.toLowerCase()));
  return (
    <div className='myproducts-container'>
    <Searchbar searchText={searchText} setSearchText={setSearchText}/>
    {filteredProducts.length ?
      <>
        
        <div className='products'>
          {filteredProducts.map((product) => (<SellerProduct key={product._id} product={product} />))}
        </div>
      </>
      :
      <h2>Ürününüz bulunmamaktadır.</h2>
    } 
    </div>
  )
}
