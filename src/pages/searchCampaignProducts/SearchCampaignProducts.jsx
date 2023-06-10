import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { getCampaignProducts } from '../../features/product';
import { toast } from 'react-toastify';
import Searchbar from '../../components/searchBar/Searchbar';
import './SearchCampaignProducts.scss'
import { Product } from '../../components/product/Product';

export default function SearchCampaignProducts() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('campaignId');
    const [products, setProducts] = useState()
    const [searchText, setSearchText] = useState("")
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCampaignProducts(id);
        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message);
        }
        setProducts(result.products)
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchData();
  }, [id]);
  const filteredProducts = products?.filter(product => product.name.toLowerCase().includes(searchText.toLowerCase()));
  return (
    <div className='scp-container'>
        {products && products.length > 0 ?
            <>
                <Searchbar searchText={searchText} setSearchText={setSearchText}/>
                {
                    filteredProducts.length > 0
                    ?
                    <div className='scp-products'>
                        {filteredProducts.map(product => <Product key={product._id} product={product}/>)}
                    </div>
                    :
                    <h3>Bu isimde ürün bulunamadı...</h3>

                }
                 
            </>
            :
            <h3>Bu kampanyaya ait ürün bulunamadı..</h3>
             
        }
    </div>
  )
}
