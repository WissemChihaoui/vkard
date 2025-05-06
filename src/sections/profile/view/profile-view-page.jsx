import React from "react";
import { paths } from "../../../routes/paths";
import { GradientLight } from "../../../components/UI/Benefits";
import ClipPath from "../../../assets/svg/ClipPath";
import Arrow from "../../../assets/svg/Arrow";
import {
  profileDownloads,
  profileFav,
  profileLocation,
  profileLogout,
  profileOrders,
  profileUser,
} from "../../../assets";
import { Link } from "react-router-dom";
const cardLinks = [
  {
    id: 1,
    title: "Commandes",
    link: paths.profile.orders,
    backgroundUrl: "./src/assets/benefits/card-1.svg",
    iconUrl: profileOrders,
  },
  {
    id: 2,
    title: "Téléchargement",
    link: paths.profile.downloads,
    backgroundUrl: "./src/assets/benefits/card-1.svg",
    iconUrl: profileDownloads,
  },
  {
    id: 3,
    title: "Adresses",
    link: paths.profile.address,
    backgroundUrl: "./src/assets/benefits/card-1.svg",
    iconUrl: profileLocation,
  },
  {
    id: 4,
    title: "Détails Compte",
    link: paths.profile.editAccount,
    backgroundUrl: "./src/assets/benefits/card-1.svg",
    iconUrl: profileUser,
  },
  {
    id: 5,
    title: "Liste de souhaits",
    link: paths.profile.editAccount,
    backgroundUrl: "./src/assets/benefits/card-1.svg",
    iconUrl: profileFav,
  },
  {
    id: 5,
    title: "Déconnexion",
    link: paths.profile.editAccount,
    backgroundUrl: "./src/assets/benefits/card-1.svg",
    iconUrl: profileLogout,
  },
];
export default function ProfileViewPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
      {cardLinks.map((item) => (
        <Link
          to={item.link}
          className="block relative p-0.5 bg-no-repeat bg-[length:100%_100%] md:max-w-[24rem]"
          style={{
            backgroundImage: `url(${item.backgroundUrl})`,
          }}
          key={item.id}
        >
          <div className="relative z-2 flex items-center flex-col  p-[2rem] pointer-events-none">
            <h5 className="h5 mb-2 text-center">{item.title}</h5>
            {/* <p className="body-2 mb-6 text-n-3 text-center">{item.text}</p> */}
            <img src={item.iconUrl} alt={item.title} className="w-24 mb-2" />
            <div className="flex items-center mt-auto">
              <p className="ml-auto font-code text-xs font-bold text-n-1 uppercase tracking-wider">
                Voir
              </p>
              <Arrow />
            </div>
          </div>

          <GradientLight />

          <ClipPath />
        </Link>
      ))}
    </div>
  );
}
