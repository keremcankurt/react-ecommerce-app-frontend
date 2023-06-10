import React, { useEffect, useState } from 'react'
import './AddCampaign.scss'
import AddCampaignProduct from '../../components/addCampaignProduct/AddCampaignProduct'
import { useDispatch, useSelector } from 'react-redux';
import { addCampaign } from '../../features/seller/sellerSlice';
import { toast } from 'react-toastify';
import Searchbar from '../../components/searchBar/Searchbar';
import { useNavigate } from 'react-router-dom';

export default function AddCampaign() {
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
  const {products} = useSelector(
    (state) => state.seller
  );
  const [searchText, setSearchText] = useState('');
  const currentDate = new Date();
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchText.toLowerCase()) &&
    (!product.campaign?.endDate || new Date(product.campaign?.endDate) < currentDate)
  );
  const [data,setData] = useState({
    discountPercentage: undefined,
    endDate: undefined,
    img: 'https://www.nepalclimbing.com/public/images/no-image.jpg',
    campaign_image: ''

  })
 
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedProductsNames, setSelectedProductsNames] = useState([]);

  const handleInputChange = (e) => {
    setData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleImageChange = (e) => {
    if(e.target.files[0]){
      setData(prevState => ({
        ...prevState,
        img: URL.createObjectURL(e.target.files[0]),
        campaign_image: e.target.files[0]
      }));
  };
}
  const dispatch = useDispatch();
  const handleFormSubmit = (e) => {
    
    e.preventDefault();
    if(selectedProducts.length > 0) {
      const formData = new FormData();
      formData.append("campaign_image", data.campaign_image);
      const newData = {
        discountPercentage,
        endDate,
        products: selectedProducts
      }
      formData.append("campaign", JSON.stringify(newData));
      dispatch(addCampaign(formData));
      setData({
        discountPercentage: "",
        endDate: "",
        img: 'https://www.nepalclimbing.com/public/images/no-image.jpg',
        campaign_image: ''
    
      })
      
    }else{
        toast.error("En az 1 ürün seçmelisiniz.")
      }
    
    setSelectedProducts([]);
    setSelectedProductsNames([]);
  };
   const {discountPercentage, endDate, img} = data;
   const handleError = (e) => {
    e.target.onerror = null;
    
    setData(prevState => ({
      ...prevState,
      img: '/images/product.png',
      campaign_image: ''
    }));
  }
  
  return (
    <div className='add-campaign-container'>
      {products.length !== 0 ? 
        <div className='add-campaign-products'>
          <div className='add-campaign'>
            <form onSubmit={handleFormSubmit}>
              <div className='form-group'>
              <img className='campaignImg' src={img} onError={handleError}  alt='product' />
              <label htmlFor="inputFile" style={{ cursor: "pointer" }}>
              <button type="button" style={{ pointerEvents: "none"}}>
              <span>Fotoğraf Seç</span>
            </button>
          </label>
          <input
            type="file"
            id="inputFile"
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleImageChange}
          />
              </div>
              <div className='form-group'>
                <label htmlFor='name'>İndirim Yüzdesi</label>
                <input type='number' value={discountPercentage} name='discountPercentage' onChange={handleInputChange} min={1} max={99} required />
              </div>
              <div className='form-group'>
                <label htmlFor='name'>Bitiş Tarihi</label>
                <input type="datetime-local" value={endDate} name='endDate' onChange={handleInputChange} required/>
              </div>
              <div className='form-group'>
                <label htmlFor='name'>Seçilen Ürünler</label>
                <div className='selected-products'>{selectedProductsNames.map(selectedProductName => <p>{selectedProductName}</p>)}
                </div>
                
              </div>
              <button type='submit' className='btn-update'>
                Kampanyayı Başlat
              </button>
            </form>
          </div>
          <div className='campaign-products'>
          <Searchbar setSearchText={setSearchText} searchText={searchText}/>
          {filteredProducts.length !== 0 ?
            <div className='products-list'>
              {filteredProducts.map((product) =>  
                <AddCampaignProduct key={product._id} product={product}
                selectedProductsNames={selectedProductsNames}
                  setSelectedProducts={setSelectedProducts} selectedProducts={selectedProducts}
                  setSelectedProductsNames={setSelectedProductsNames}/>
              )}
            </div>
            :
            <h3>Bu isimde ürün bulunmamaktadır.</h3>
          }
            
          
          </div>
        </div> 
        :
        <p>İndirim uygulanacak ürününüz bulunmamaktadır</p>
      }  
    </div>
  )
}
