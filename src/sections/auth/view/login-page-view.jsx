import React, { useState } from 'react';
import Input from '../../../components/input/input';
import Button from '../../../components/button/Button';

export default function LoginPageView() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex items-center justify-center  p-4">
      <div className="shadow-lg rounded-lg max-w-4xl w-full flex overflow-hidden">
        
        {/* Sidebar Switch */}
        <div className="w-1/3 p-6 border-r">
          <h2 className="text-2xl font-semibold mb-6 text-center">Bienvenue</h2>
          <div className="flex flex-col space-y-4">
            <Button
              white={isLogin}
              onClick={() => setIsLogin(true)}
            >
              Se connecter
            </Button>
            <Button
              white={!isLogin}
              onClick={() => setIsLogin(false)}
            >
              S’enregistrer
            </Button>
          </div>
        </div>

        {/* Form Section */}
        <div className="w-2/3 p-8">
          {isLogin ? (
            <form className="space-y-6">
              <h3 className="text-xl font-semibold">Connexion</h3>
              <div>
                {/* <label className="block mb-1 text-sm font-medium">E-mail</label>
                <input type="email" className="w-full border p-2 rounded" required /> */}
                <Input name="email" required type="email" placeholder='Email'/>
              </div>
              <div>
              <Input name="email" required type="password" placeholder='Mot de passe'/>

              </div>
              <Button type="submit" >Connexion</Button>
            </form>
          ) : (
            <form className="space-y-6">
              <h3 className="text-xl font-semibold">S’enregistrer</h3>
              <div>
              <Input name="email" required type="email" placeholder='Email'/>
              </div>
              <p className="text-sm text-gray-600">
                Un lien permettant de définir un nouveau mot de passe sera envoyé à votre adresse e-mail.
              </p>
              <p className="text-sm text-gray-600">
                Vos données personnelles seront utilisées pour vous accompagner au cours de votre visite du site web,
                gérer l’accès à votre compte, et pour d’autres raisons décrites dans notre Politique de confidentialité.
              </p>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="updates" className="w-4 h-4" />
                <label htmlFor="updates" className="text-sm">Je veux recevoir des mises à jour sur les produits et les promotions.</label>
              </div>
              <Button type="submit" >S'enregistrer</Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
