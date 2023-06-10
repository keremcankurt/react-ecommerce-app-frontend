import React, { useEffect, useState } from 'react'
import './AddProduct.scss'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct } from '../../features/seller/sellerSlice'
import { useNavigate } from 'react-router-dom';

export default function AddProduct()  {
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
  const [formData, setFormData] = useState({
    img:'/images/product.png',
    name: '',
    desc: '',
    stock: '',
    price: '',
    product_image: '',
    category: '',

  })
  const {img, name, desc, price, stock, product_image, category} = formData

  const handleChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
    
}
const handleChangePP = (e) => {
  if(e.target.files[0]){
    setFormData(prevState => ({
      ...prevState,
      img: URL.createObjectURL(e.target.files[0]),
      product_image: e.target.files[0]
    }));
    
  }
  
}
const handleError = (e) => {
  e.target.onerror = null;
  
  setFormData(prevState => ({
    ...prevState,
    img: '/images/product.png',
    product_image: ''
  }));
}

const dispatch = useDispatch();
const handleSubmit = (e) => {
  e.preventDefault();
  const data = new FormData();
  data.append("product_image", product_image);
  const productData = {
    name,
    desc,
    price,
    stock,
    category: category
  }
  data.append("productData", JSON.stringify(productData));
  dispatch(addProduct(data));
  setFormData({
    img:'/images/product.png',
    name: '',
    desc: '',
    stock: '',
    price: '',
    product_image: '',
    category: '',

  })
}
const formatPrice = (price) => {
  const parts = price.toString().split('.');
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const decimalPart = parts[1] ? `,${parts[1]}` : '';
  return `${integerPart}${decimalPart}`;
};
  return (
    <div className='add-product'>
        <div className='product'>
            <p className='createdAt'>{new Date().toLocaleDateString()}</p>
            <img src={img} onError={handleError} alt='product' />
            <div className='product-infos'>
                <h2 className='product-name'>{name}</h2>
                 <p className='price'>{price && formatPrice(price) + " TL"}</p>
            </div>
        </div>
        <form onSubmit={handleSubmit} className='add-product-form'>
          <img src={img} onError={handleError} alt='product' />
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
            onChange={handleChangePP}
          />
          <select className='category' name="category" value={category}  onChange={handleChange} required>
            <option value="">Kategori Seçiniz</option>
            <option value="Bilgisayar">Bilgisayar</option>
            <option value="Telefon">Telefon</option>
            <option value="Tablet">Tablet</option>
            <option value="Kadın Giyim">Kadın Giyim</option>
            <option value="Erkek Giyim">Erkek Giyim</option>
            <option value="Çocuk Giyim">Çocuk Giyim</option>
        </select>
          <input type='text' placeholder='Ürün Adı' name='name' value={name} onChange={handleChange} required/>
          <textarea placeholder="Ürün bilgisi" name='desc' value={desc} onChange={handleChange} required />
          <div className='numeric-inputs'>
            <input type='number' placeholder='Fiyat' name='price' value={price} min={1} onChange={handleChange} required/>
            <input type='number' placeholder='Stok' name='stock' value={stock} min={1} onChange={handleChange} required/>
          </div>
          
          <button type='submit'>Ekle</button>
        </form>
    </div>
  )
}
