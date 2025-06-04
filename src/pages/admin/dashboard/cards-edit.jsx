import { useGetProducts } from "../../../actions/products";
import EditCardList from "../../../sections/admin/editCards/view/edit-cards-list";

export default function Page() {
    const { products, productsLoading } = useGetProducts();
  return (
    <EditCardList products={products} loading={productsLoading}/>
  )
}
