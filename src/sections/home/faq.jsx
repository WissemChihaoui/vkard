import React, { useState } from "react";
import Section from "../../components/section/Section";
import { chevronDown, grid } from "../../assets";
import Heading from "../../components/heading/heading";

const faqs = [
  {
    question: "Y a t-il un abonnement avec ma carte de visite connectée ?",
    answer: `L’abonnement est facultatif. Il est utile aux entreprises qui ont le besoin d’avoir des services supplémentaires.

V-Carte est une plateforme SaaS, hébergeur de vos données et l’abonnement nous permet, en temps qu’éditeur logiciel d’innover et de maintenir un haut niveau de sécurité en permanence.`,
  },
  {
    question: "Puis-je modifier mes informations à tout moment ?",
    answer:
      "Absolument ! Vous avez une interface Cloud disponible gratuitement et à tout moment, qui vous permet de mettre à jour vos informations de contact.",
  },
  {
    question: "Est-il possible de traduire mes infos de contact ?",
    answer: `Oui, vous pouvez traduire vos informations de contact comme votre intitulé de poste, votre Bio, mais également vos liens externes.
V-Carte servira à vos prospects vos infos dans la bonne langue suivant celle de son smartphone.
Nous avons plus de 100 langues disponibles.`,
  },
];

export const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Section id="features">
      <div className="container relative z-2">
        <Heading
          tag="à propos des cartes de visites digitales et connectées"
          title="Questions fréquement posées"
        />

        <div className="flex flex-col gap-2">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="md:flex p-0.25 rounded-[2.5rem] bg-conic-gradient bg-n-6 cursor-pointer"
              onClick={() => toggleAccordion(index)}
            >
              <div className="relative p-4 bg-n-8 rounded-[2.4375rem] overflow-hidden xl:p-8 w-full">
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
                  <div className="flex flex-col w-full">
                    <div>
                      <div className="flex w-full justify-between">
                        <h6 className="h6">{faq.question}</h6>
                        <img
                          src={chevronDown}
                          alt=""
                          className={`duration-300  ${
                            openIndex === index ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                      <div
                        className={`transition-all duration-500 ease-in overflow-hidden ${
                          openIndex === index ? "max-h-40 mt-2" : "max-h-0"
                        }`}
                      >
                        <p className="body-2 text-n-4">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};
