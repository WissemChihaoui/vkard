import React from 'react'
import OrdersListView from '../../../sections/admin/orders/views/orders-list-view'
import { useGetAllOrders } from '../../../actions/orders';

export default function Page() {
  const { orders } = useGetAllOrders();
  console.log(orders)
  return (
    <OrdersListView orders={orders}/>
  )
}
