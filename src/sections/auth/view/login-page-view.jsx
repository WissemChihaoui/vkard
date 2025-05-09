import React, { useState } from 'react';
import Button from '../../../components/button/Button';
import LoginSection from '../login-section';
import RegisterSection from '../register-section';
import { Link } from 'react-router-dom';
import { paths } from '../../../routes/paths';

export default function LoginPageView() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex items-center justify-center p-4 ">
      <div className="shadow-lg rounded-lg max-w-4xl w-full flex overflow-hidden ">
        
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
            <Link to={paths.admin.auth} className='text-sm text-center underline'>Se connecter en tant qu’admin</Link>
          </div>
        </div>

        <div className="w-2/3 p-8">
          {isLogin ? (
            <LoginSection />
          ) : (
            <RegisterSection setIsLogin={setIsLogin} />
          )}
        </div>
      </div>
    </div>
  );
}
