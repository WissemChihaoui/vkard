import React from "react";
import Section from "../../components/section/Section";
import { grid, vCardBlack } from "../../assets";
import Heading from "../../components/heading/heading";
import TagLine from "../../components/tagline/tagline";
import { Gradient } from "../../components/UI/Roadmap";
import Button from "../../components/button/Button";

export default function Services() {
  return (
    <Section className="overflow-hidden" id="roadmap">
      <div className="container md:pb-10">
        <Heading tag="Il est temps de transformer vos rencontres en prospects." title="Notre solutions" />

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
                    <h4 className="h4 mb-4">
                      Pourquoi la carte de visite NFC va révolutionner votre vie
                      professionnelle
                    </h4>
                    <p className="body-2 text-n-4">
                      Grâce à la technologie Near Field Communication (NFC) la
                      carte connectée est reliée à votre profil digital en
                      ligne. Ce profil est modifiable gratuitement et sans
                      limite, sur une plateforme sécurisée et auditée
                      régulièrement.
                    </p>
                    <Button className="mt-4" white>
                      Commandez la vôtre
                    </Button>
                  </div>
                  <img src={vCardBlack} className="max-w-80 mb-4 mx-auto" alt="" />
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
                  <img src={vCardBlack} className="max-w-80 mb-4 mx-auto" alt="" />
                  <div>
                    <h4 className="h4 mb-4">
                      1 - Badgez en NFC ou flashez le QRCode
                    </h4>
                    <p className="body-2 text-n-4">
                      Les VKARD fonctionnent avec iOS & Android sans avoir
                      besoin d’application. Vous badgez en sans-contact ou
                      scannez le Qr Code.
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
                  <img src={vCardBlack} className="max-w-80 mb-4 mx-auto" alt="" />
                  <div>
                    <h4 className="h4 mb-4">2 - Créez de l'engagement</h4>
                    <p className="body-2 text-n-4">
                      Faites une impression mémorable en partageant vos infos de
                      contact mais aussi prise de rendez-vous en ligne,
                      brochures et landing pages.
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
                  <img src={vCardBlack} className="max-w-80 mb-4 mx-auto" alt="" />
                  <div>
                    <h4 className="h4 mb-4">3 - Echangez et synchronisez</h4>
                    <p className="body-2 text-n-4">
                      Récupérez les coordonnées de vos prospects grâce à
                      l’échange synchronisable avec votre suite CRM préférée.
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
