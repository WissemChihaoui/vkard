import React, { useCallback } from 'react';
import { logout, menu } from '../../assets/admin';
import { useAuthContext } from '../../auth/hooks';
import { signOut } from '../../actions/auth';

export default function Header({ onToggleSidebar }) {
  const { user, checkUserSession } = useAuthContext();
   const handleLogout = useCallback(async () => {
      try {
        await signOut();
        await checkUserSession?.();
    
        // router.refresh();
      } catch (error) {
        console.error(error);
      }
    }, [checkUserSession]);
  return (
    <header className="h-16 bg-n-8 border-b flex items-center justify-between px-4 md:px-6 shadow-sm">
      {/* Mobile Hamburger */}
      <button
        className="md:hidden text-white"
        onClick={onToggleSidebar}
        aria-label="Toggle Sidebar"
      >
        <img src={menu} />
      </button>

      <h1 className="text-lg font-bold text-white">Admin Dashboard</h1>

      <div className="flex items-center gap-4">
        <span className="text-sm text-white hidden lg:block">Bienvenue, {user?.name} </span>
        <button onClick={()=>handleLogout()} className="text-sm text-red-500 hover:underline"><img src={logout} /></button>
      </div>
    </header>
  );
}
