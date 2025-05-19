import React from "react";
import Section from "../../../components/section/Section";
import Heading from "../../../components/heading/heading";
import Button from "../../../components/button/Button";
import { grid, vCardBlack } from "../../../assets";
import { Gradient } from "../../../components/UI/Roadmap";
import { useRouter } from "../../../routes/hooks";
import { paths } from "../../../routes/paths";

export default function ProductListView({ cards = [] }) {
    const router = useRouter()
  const isEmpty = cards.length === 0;

  return (
    <Section className="overflow-hidden xl:pt-4" id="products">
      <div className="container md:pb-10">
        <Heading
          tag="Découvrez nos produits"
          title="Commandez la carte qui vous correspond"
        />

        <div className="relative grid gap-6 grid-cols-1 lg:grid-cols-2 md:gap-4 justify-items-center">
          {isEmpty ? (
            <div className="lg:col-span-3 text-center text-n-4 text-xl py-20">
              Aucun produit disponible pour le moment.
            </div>
          ) : (
            cards.map((card) => (
              <div
                key={card.id}
                className={`md:flex p-0.25 rounded-[2.5rem] bg-conic-gradient bg-n-6 w-fit lg:w-full`}
              >
                <div className="relative bg-n-8 rounded-[2.4375rem] overflow-hidden lg:p-8 p-4">
                  <div className="absolute top-0 left-0 max-w-full">
                    <img
                      className="w-full"
                      src={grid}
                      width={550}
                      height={550}
                      alt="Grid"
                    />
                  </div>
                  <div className="relative z-1">
                    <div className="flex flex-col">
                      <img
                        src={card.image || vCardBlack}
                        className="max-w-80 mb-4 mx-auto"
                        alt={card.title}
                      />
                      <div>
                        <h4 className="h4 mb-4">{card.title}</h4>
                        <p className="body-2 text-n-4">{card.description}</p>
                        <Button className="mt-4" white onClick={()=>router.push(paths.products.view(card.id))}>
                          Commander
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
          <Gradient />
        </div>
      </div>
    </Section>
  );
}
