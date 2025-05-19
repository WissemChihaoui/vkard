import { useGetProduct } from "../../../actions/products";
import { useParams } from "../../../routes/hooks";
import ProductViewPage from "../../../sections/products/view/product-view-page";

export default function Page() {
    const {id} = useParams()
    const { product } = useGetProduct(id)
    return(
        <>
            <ProductViewPage card={product}/>
        </>
    )
}