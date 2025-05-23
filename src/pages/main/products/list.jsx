import React from "react";
import ProductListView from "../../../sections/products/view/product-list-view";
import { useGetProducts } from "../../../actions/products";

export default function Page() {
  const { products } = useGetProducts();

  // const [data, setData] = useS:

  console.log(products);

  return (
    <>
        <title>Carte de visite connectée NFC - 100 % Personnalisable</title>
        <meta
          name="description"
          content="Partagez vos coordonnées en un seul geste avec notre carte de visite NFC 100 % personnalisable. Moderne, pratique et écologique, elle reflète parfaitement votre image professionnelle."
        />
        <link rel="canonical" href="https://speedigi.ca/product" />
        <meta name="robots" content="index, follow" />
      <ProductListView cards={products} />
    </>
  );
}
