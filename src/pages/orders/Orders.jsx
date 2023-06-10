import React from 'react'
import Order from '../../components/order/Order'
import { useSelector } from 'react-redux';
import './Orders.scss'

export default function Orders() {
  const { user, isSuccess } = useSelector((state) => state.user);

  const sortOrdersByCreatedAt = (orders) => {
    const sortedOrders = [...orders];

    return sortedOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };

  return (
    <div className="orders-container">
      {isSuccess && user.orders.length !== 0 ? (
        sortOrdersByCreatedAt(user.orders).map((order) => (
          <Order key={order._id} order={order} />
        ))
      ) : (
        <h2>Siparişiniz bulunmamaktadır...</h2>
      )}
    </div>
  );
}
