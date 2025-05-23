import React from "react";
import ContactFormView from "../../../sections/contact/views/contact-form-view";
import { Helmet } from "react-helmet-async";

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Contactez Speedigi - Votre Agence NFC & SEO</title>
        <meta
          name="description"
          content="Speedigi vous accompagne avec des cartes NFC innovantes et des services SEO sur mesure pour booster votre visibilité et moderniser votre communication."
        />
        <link rel="canonical" href="https://speedigi.ca/contact" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <ContactFormView />
    </>
  );
}
