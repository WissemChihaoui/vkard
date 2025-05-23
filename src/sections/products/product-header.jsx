import React, { useState } from "react";
import Section from "../../components/section/Section";
import ImageCarousel from "../../components/image-carousel/ImageCarousel";
import Button from "../../components/button/Button";
import { curve } from "../../assets";
import { useCheckoutContext } from "../panier/context";

export default function ProductHeader({ card = {}}) {

  console.log(card)
  const {onAddToCart} = useCheckoutContext()
  const [quantity, setQuantity] = useState(1);

  const increase = () => setQuantity((prev) => prev + 1);
  const decrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    const item = {
      id: card?.id,
      name: card?.title,
      image:card?.image,
      price: parseFloat(card?.price),
      quantity: quantity,
    };
    
    onAddToCart(item); // ✅ Add to cart
  };
  return (
    <Section className="overflow-hidden xl:pt-4" id="">
      <div className="container">
        <div className="gap-6 flex-col md:flex-row grid grid-cols-3">
          <ImageCarousel
            images={[
              card?.image,
              // ...card?.gallery
            ]}
          />
          <div className="col-span-2">
            <h2 className="h2 mb-2 md:mb-4">
              {card?.title}
            </h2>
            <h3 className="h3 font-bold mb-12 relative inline-block">
              <span className="relative inline-block">
                {card.price} € HT{" "}
                <img
                  src={curve}
                  className="absolute top-full left-0 w-full xl:-mt-2"
                  width={624}
                  height={28}
                  alt="Curve"
                />
              </span>
            </h3>

            {/* Quantity Input */}
            <div className="flex gap-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-sm font-medium text-n-3">Quantité:</span>
                  <div className="flex items-center border border-n-3 rounded-lg overflow-hidden">
                    <button
                      onClick={decrease}
                      className="px-3 py-2 text-lg font-bold bg-n-7 text-white hover:bg-n-6"
                    >
                      −
                    </button>
                    <span className="px-4 py-2 min-w-[3rem] text-center text-white">
                      {quantity}
                    </span>
                    <button
                      onClick={increase}
                      className="px-3 py-2 text-lg font-bold bg-n-7 text-white hover:bg-n-6"
                    >
                      +
                    </button>
                  </div>
                </div>
                <Button onClick={handleAddToCart}>Ajouter au panier</Button>
            </div>

            <p class="body-2 mb-6 text-n-3">{card ?.description}</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
