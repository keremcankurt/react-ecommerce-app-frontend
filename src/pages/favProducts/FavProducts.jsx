import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Searchbar from '../../components/searchBar/Searchbar';
import './FavProducts.scss'
import { getFavProducts } from '../../features/product';
import { toast } from 'react-toastify';
import { Product } from '../../components/product/Product';

export default function FavProducts() {
    const [products, setProducts] = useState();
    const {user, isSuccess: userIsSuccess} = useSelector(
        (state) => state.user
    );
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await getFavProducts();
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message);
            }
            setProducts(result.data)
          } catch (error) {
            toast.error(error.message);
          }
        };
        fetchData();
        
      }, [user?.favCount]);
      
  const [searchText, setSearchText] = useState('');
  const filteredProducts = products?.filter(product => product.name.toLowerCase().includes(searchText.toLowerCase()));
  return (
    <div className='favProducts-container'>
        {userIsSuccess &&
            user.favCount !== 0 ?
            <>
                <Searchbar searchText={searchText} setSearchText={setSearchText}/>
                <span className='title'>Favorileriniz</span>
                <div className='products'>
                    {filteredProducts?.length !== 0 ? 
                      filteredProducts?.map(product => <Product key={product._id} product={product}/>)
                      :
                      <span>Aramanıza uygun ürün bulunmamaktadır.</span>
                    }
                </div>
            </>
            :
            <span>Favorilerinizde ürün bulunmamaktadır.</span>
        }
    </div>
  )
}
