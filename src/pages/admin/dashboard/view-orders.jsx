import React, { useEffect, useState } from "react";
import OrdersDetailsView from "../../../sections/admin/orders/views/orders-details-view";
import { useParams } from "../../../routes/hooks";
import { useGetOrder } from "../../../actions/orders";

export default function Page() {
  const { id } = useParams();

  console.log(id);
  const { order } = useGetOrder(id);
  const [vcards, setVcards] = useState([]);
  //   const vcards = order?.data?.order_items
  //   .map(item => item.vcard)

  // console.log(vcards);
  useEffect(() => {
    if (order?.data?.order_items) {
      const allVcards = order.data.order_items.flatMap(
        (item) => item.vcard || []
      );
      setVcards(allVcards);
    }
  }, [order]);

  console.log(order);
  return <OrdersDetailsView order={order?.data} vcards={vcards} />;
}
