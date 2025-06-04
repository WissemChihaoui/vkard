import React, { useCallback, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { paths } from '../routes/paths';
import { signOut } from '../actions/auth';
import { useAuthContext } from '../auth/hooks';




export default function AccountLayout({ children }) {
  const menuItems = [
    { label: 'Tableau de bord', link: paths.profile.root },
    { label: 'Commandes', link: paths.profile.orders },
    { label: 'Détails du compte', link: paths.profile.editAccount },
    { label: 'Administrer mes V-Cartes', link: paths.profile.cards },
    { label: 'Se déconnecter', link: paths.root, action: ()=>handleLogout() },
  ];
  const { checkUserSession } = useAuthContext();
  const handleLogout = useCallback(async () => {
    try {
      await signOut();
      await checkUserSession?.();
  
      // router.refresh();
    } catch (error) {
      console.error(error);
    }
  }, [checkUserSession]);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // 👈 Get current URL path

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="flex items-center justify-between p-4 bg-n-6 shadow-md md:hidden">
        <h2 className="text-lg font-semibold">Mon espace</h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-600 focus:outline-none"
        >
          {isOpen ? 'Fermer' : 'Menu'}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={` border-r text-white w-full md:w-64 space-y-4 transform z-0 ${
          isOpen ? 'block' : 'hidden'
        } md:block md:relative md:translate-x-0 absolute transition-all duration-300 ease-in-out`}
      >
        {/* Mobile header inside sidebar */}
        <div className="flex items-center justify-between p-4 bg-n-6 shadow-md md:hidden">
          <h2 className="text-lg font-semibold">Mon espace</h2>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-600 focus:outline-none"
          >
            {isOpen ? 'Fermer' : 'Menu'}
          </button>
        </div>

        <nav className="flex flex-col space-y-2 px-6">
          {menuItems.map(({ label, link, action }) => {
            const isActive = location.pathname === link;

            return (
              <Link
              onClick={action}

                key={link}
                to={link}
                className={`px-4 py-2 rounded transition ${
                  isActive
                    ? 'bg-white text-gray-800'
                    : 'text-gray-300 hover:bg-blue-100 hover:text-gray-800'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8">{children}</main>
    </div>
  );
}
