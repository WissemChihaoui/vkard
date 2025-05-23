import React from "react";
import Section from "../../../components/section/Section";
import Heading from "../../../components/heading/heading";
import Button from "../../../components/button/Button";
import { useCheckoutContext } from "../context";
import { deleteIcon } from "../../../assets";
import { paths } from "../../../routes/paths";

export default function PanierPageView() {
  const {
    items,
    onIncreaseQuantity,
    onDecreaseQuantity,
    subtotal,
    total,
    tva,
    onDeleteCart,
  } = useCheckoutContext();

  const tvaRate = 0.2;

  const isCartEmpty = items.length === 0;

  return (
    <Section className="xl:py-12 lg:py-8">
      <div className="container relative z-2">

        {isCartEmpty ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold mb-4">Votre panier est vide</h2>
            <p className="text-n-4 mb-6">Découvrez nos produits et remplissez votre panier !</p>
            <Button href={paths.products.list}>Voir les produits</Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left - Cart Items */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row items-center gap-4 border p-4 rounded-xl"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  <div className="flex-1 w-full">
                    <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
                    <p className="text-n-4 mb-2">{item.price.toFixed(2)} € HT</p>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => onDecreaseQuantity(item.id)}
                        className="px-3 py-1 bg-n-7 text-white rounded hover:bg-n-6"
                      >
                        −
                      </button>
                      <span className="px-4">{item.quantity}</span>
                      <button
                        onClick={() => onIncreaseQuantity(item.id)}
                        className="px-3 py-1 bg-n-7 text-white rounded hover:bg-n-6"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-2">
                    <p className="font-bold text-lg">
                      {(item.price * item.quantity).toFixed(2)} €
                    </p>
                    <button
                      onClick={() => onDeleteCart(item.id)}
                      className="text-red-600 text-sm hover:underline"
                    >
                      <img src={deleteIcon} alt="Supprimer" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Right - Summary */}
            <div className="bg-n-1/5 border border-n-1/10 p-6 rounded-xl h-fit">
              <h4 className="text-xl font-bold mb-4">Résumé de la commande</h4>
              <div className="flex justify-between mb-2">
                <span>Total HT :</span>
                <span>{subtotal.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>TVA ({(tvaRate * 100).toFixed(0)}%) :</span>
                <span>{tva.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between font-semibold text-lg border-t pt-4 mt-4">
                <span>Total TTC :</span>
                <span>{total.toFixed(2)} €</span>
              </div>
              <Button className="mt-6 w-full" href={paths.panier.checkout}>
                Procéder au paiement
              </Button>
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}
