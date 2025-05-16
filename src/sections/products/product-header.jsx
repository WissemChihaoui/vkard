import React, { useState } from "react";
import Section from "../../components/section/Section";
import ImageCarousel from "../../components/image-carousel/ImageCarousel";
import Button from "../../components/button/Button";
import { curve } from "../../assets";
import { useCheckoutContext } from "../panier/context";

export default function ProductHeader() {
  const {onAddToCart} = useCheckoutContext()
  const [quantity, setQuantity] = useState(1);

  const increase = () => setQuantity((prev) => prev + 1);
  const decrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    const item = {
      id: 2,
      name: "Carte de visite NFC - VKARD Bamboo Custom",
      image:
        "https://vkard.io/wp-content/uploads/2021/12/carte-de-visite-nfc-VKARD-bois.jpg",
      price: 70.0,
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
              "https://vkard.io/wp-content/uploads/2021/12/carte-de-visite-nfc-VKARD-bois.jpg",
              "https://vkard.io/wp-content/uploads/2021/12/bamboo.jpg",
              "https://vkard.io/wp-content/uploads/2021/12/cartes-de-visite-NFC-en-Bois-VKARD.gif",
            ]}
          />
          <div className="col-span-2">
            <h2 className="h2 mb-2 md:mb-4">
              Carte de visite NFC - VKARD Bamboo Custom
            </h2>
            <h3 className="h3 font-bold mb-12 relative inline-block">
              <span className="relative inline-block">
                54,00 € HT{" "}
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

            <p class="body-2 mb-6 text-n-3">L’époque des cartes de visite classiques est terminée. Voici VKARD, la carte de visite digitale et Sans-Contact pensée pour les entreprises modernes. Fabriquée en Bois naturel, dotée d’une fonction de mise à jour à distance, elle combine innovation technologique et responsabilité écologique.</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
