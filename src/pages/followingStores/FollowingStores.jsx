import React, { useEffect } from 'react'
import './FollowingStores.scss'
import FollowingStore from '../../components/followingStore/FollowingStore'
import { useDispatch, useSelector } from 'react-redux';
import { getAllFollowingSellers } from '../../features/user/userSlice';

export default function FollowingStores() {
  const {followingStores} = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(getAllFollowingSellers());
  },[dispatch])
  return (
    <div className='following-stores-container'>
      {
        followingStores?.length !== 0 ?
        followingStores?.map((store) =>(<FollowingStore key={store._id} store={store}/>))
        : <h3>Takip ettiğiniz mağaza bulunmamaktadır.</h3>
      }
    </div>
  )
}
