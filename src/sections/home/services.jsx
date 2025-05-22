import React from "react";
import Section from "../../components/section/Section";
import { grid, service0, service1, service2, service3 } from "../../assets";
import Heading from "../../components/heading/heading";
import { Gradient } from "../../components/UI/Roadmap";
import Button from "../../components/button/Button";
import { paths } from "../../routes/paths";

export default function Services() {
  return (
    <Section className="overflow-hidden xl:pt-4" id="roadmap">
      <div className="container md:pb-10">
        <Heading
          tag="Il est temps de transformer vos rencontres en prospects."
          title="Notre solutions"
        />

        <div className="relative grid gap-6 grid-cols-1 lg:grid-cols-3 md:gap-4 md:pb-[7rem]">
          <div className="md:flex even:lg:translate-y-[7rem] p-0.25 rounded-[2.5rem] bg-conic-gradient lg:col-span-3">
            <div className="relative p-8 bg-n-8 rounded-[2.4375rem] overflow-hidden xl:p-15">
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
                <div className="flex flex-col-reverse lg:flex-row">
                  <div>
                    <h4 className="h4 mb-4">Carte nfc</h4>
                    <p className="body-1 text-n-3 font-bold">
                      Modernisez votre manière de faire des rencontres
                      professionnelles grâce à une carte NFC intelligente et
                      innovante.
                    </p>
                    <p className="body-2 text-n-4">
                      Fini les cartes de visite en papier que l'on perd, jette
                      ou oublie. Grâce à notre carte NFC professionnelle, vous
                      partagez en un seul geste toutes vos informations
                      essentielles : coordonnées, site web, réseaux sociaux,
                      portfolio, lien vers votre agenda ou même une vidéo de
                      présentation. Il suffit d’un contact ou d’un simple scan
                      avec un smartphone compatible pour que vos données
                      s’affichent instantanément, sans aucune application à
                      installer. Notre plateforme, sécurisée et fiable, vous
                      permet de mettre à jour vos informations à tout moment.
                      Vous changez de numéro ou de poste ? Votre carte reste
                      valable : vous n’avez plus à réimprimer des centaines de
                      cartes. Elle devient un outil de networking durable,
                      pratique et éco-responsable.
                    </p>

                    <p className="body-2 text-n-3 font-bold">
                      Adoptez dès aujourd’hui la carte de visite du futur.
                    </p>
                    <Button className="mt-4" white href={paths.products.list}>
                      Commandez la vôtre
                    </Button>
                  </div>
                  <img
                    src={service0}
                    className="max-w-100 h-full  mx-auto"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="md:flex even:lg:translate-y-[7rem] p-0.25 rounded-[2.5rem] bg-conic-gradient bg-n-6">
            <div className="relative p-8 bg-n-8 rounded-[2.4375rem] overflow-hidden xl:p-15">
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
                    src={service1}
                    className="max-w-80 mb-4 mx-auto w-full"
                    alt=""
                  />
                  <div>
                    <h4 className="h4 mb-4">Création site Web</h4>
                    <p className="body-2 text-n-4">
                      Nous réalisons des sites sur mesure pensés pour booster
                      votre visibilité en ligne. Un design soigné, une
                      navigation fluide, et des performances au service de votre
                      image
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:flex even:lg:translate-y-[7rem] p-0.25 rounded-[2.5rem] bg-conic-gradient bg-n-6">
            <div className="relative p-8 bg-n-8 rounded-[2.4375rem] overflow-hidden xl:p-15">
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
                    src={service2}
                    className="max-w-80 mb-4 mx-auto w-full"
                    alt=""
                  />
                  <div>
                    <h4 className="h4 mb-4">Fiche google my business</h4>
                    <p className="body-2 text-n-4">
                      Améliorez votre visibilité locale grâce à une fiche GMB
                      optimisée : description SEO, mots-clés locaux, photos pro,
                      gestion des avis et services bien présentés. Attirez plus
                      de clients près de chez vous et boostez votre
                      référencement local.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:flex even:lg:translate-y-[7rem] p-0.25 rounded-[2.5rem] bg-conic-gradient bg-n-6">
            <div className="relative p-4 bg-n-8 rounded-[2.4375rem] overflow-hidden xl:p-15">
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
                    src={service3}
                    className="max-w-80 mb-4 mx-auto w-full"
                    alt=""
                  />
                  <div>
                    <h4 className="h4 mb-4">Optimisation seo</h4>
                    <p className="body-2 text-n-4">
                      Boostez la visibilité de votre site web grâce à une
                      stratégie SEO sur mesure. Analyse technique, optimisation
                      des mots-clés, contenu, vitesse de chargement et
                      netlinking : nous améliorons votre positionnement pour
                      générer plus de trafic qualifié et durable.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Gradient />
        </div>
      </div>
    </Section>
  );
}
