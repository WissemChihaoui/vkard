import React, { useEffect, useState } from "react";
import OrderDetailsPage from "../../sections/profile/view/order-details-page";
import { useGetOrder } from "../../actions/orders";
import { useParams } from "../../routes/hooks";

export default function Page() {
  const [vcards, setVcards] = useState([]);
  const { id } = useParams();

  const { order, isLoading } = useGetOrder(id);

  useEffect(() => {
    if (order?.data?.order_items) {
      const allVcards = order.data.order_items.flatMap(
        (item) => item.vcard || []
      );
      setVcards(allVcards);
    }
  }, [order]);

  console.log("orders", order);
  console.log("vcards", vcards);
  return <OrderDetailsPage order={order?.data} vcards={vcards} loading={isLoading} />;
}
