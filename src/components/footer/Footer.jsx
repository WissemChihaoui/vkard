import React from "react";
import { socials } from "../../constants";
import Section from "../section/Section";
import Button from "../button/Button";
import { Link } from "react-router-dom";
import { paths } from "../../routes/paths";
import { enablePageScroll } from "scroll-lock";

const Footer = () => {
  return (
    <Section crosses className="!px-0 !py-10">
      <div className="container flex flex-col gap-10">
        {/* Top grid with 3 columns */}
        <div className="grid md:grid-cols-3 gap-8 text-n-4">
          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-white mb-3">INFORMATIONS DE CONTACT</h4>
            <p>Email : speedigi.commercial@speedigi.ca</p>
            <p>Téléphone : +1 (438) 836-9520</p>
            <p>Adresse : 726 avenue du brabant app1 Québec</p>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="font-semibold text-white mb-3">LIENS UTILES</h4>
            <ul className="space-y-2">
              <li><Link to={paths.root}  onClick={enablePageScroll()} className="hover:text-white transition">Accueil</Link></li>
              <li><Link to={paths.products.list} onClick={enablePageScroll()} className="hover:text-white transition">Nos Services</Link></li>
              <li><Link to={paths.contact.root} onClick={enablePageScroll()} className="hover:text-white transition">Contact</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-white mb-3">Inscrivez-vous à la newsletter</h4>
            <form className="flex flex-col sm:flex-row items-center gap-2">
              <input
                type="email"
                placeholder="Votre email"
                className="px-4 py-2 rounded-md bg-n-7 text-white placeholder:text-n-4 focus:outline-none w-full"
              />
             
              <Button white>
                S'inscrire
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom row: copyright + socials */}
        <div className="flex sm:justify-between justify-center items-center gap-10 max-sm:flex-col mt-10 pt-8 border-t border-n-6">
          <p className="caption text-n-4 lg:block">
            © {new Date().getFullYear()}. Tous droits réservés.
          </p>

          <ul className="flex gap-5 flex-wrap">
            {socials.map((item) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 bg-n-7 rounded-full transition-colors hover:bg-n-6"
              >
                <img src={item.iconUrl} width={16} height={16} alt={item.title} />
              </a>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
};

export default Footer;
