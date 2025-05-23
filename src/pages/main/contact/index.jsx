import React from "react";
import ContactFormView from "../../../sections/contact/views/contact-form-view";

export default function Page() {
  return (
    <>
        <title>Contactez Speedigi - Votre Agence NFC & SEO</title>
        <meta
          name="description"
          content="Speedigi vous accompagne avec des cartes NFC innovantes et des services SEO sur mesure pour booster votre visibilité et moderniser votre communication."
        />
        <link rel="canonical" href="https://speedigi.ca/contact" />
        <meta name="robots" content="index, follow" />
      <ContactFormView />
    </>
  );
}
