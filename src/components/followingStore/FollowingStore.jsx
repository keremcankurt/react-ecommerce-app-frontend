import React from 'react'
import { Link } from 'react-router-dom'
import './FollowingStore.scss'

export default function FollowingStore({store}) {
  return (
    <Link to={`/seller?id=${store._id}`} className='following-store'>
            <img className='company' src={`${process.env.REACT_APP_API_BASE_URL}/images/${store.profilePicture}`} alt='company'/>
            <div className='infos' >
                <h2 className='seller-name'>{store.seller.company}</h2>
                <p className='productCount'>Ürün Saıyısı: {store.seller.productCount}</p>
                <p className='followerCount'>Takipçi Saıyısı: {store.seller.followerCount}</p>
            </div>
        </Link>
  )
}
