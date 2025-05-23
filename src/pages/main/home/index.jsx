import { Helmet } from "react-helmet-async";
import HomePageView from "../../../sections/home/view/home-page-view";

export default function Page() {
  return (
    <>
      <Helmet>
        <title>
          Speedigi - Communication NFC & Experts en Optimisation SEO
        </title>
        <meta
          name="description"
          content="Speedigi vous accompagne avec des cartes NFC innovantes et des services SEO sur mesure pour booster votre visibilité et moderniser votre communication."
        />
        <link rel="canonical" href="https://speedigi.ca/" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <HomePageView />
    </>
  );
}
