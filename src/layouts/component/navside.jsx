import React from 'react';
// import { X } from 'lucide-react'; // optional
import { navData } from '../config/admin-config-nav';
import { NavLink } from 'react-router-dom';
import { x } from '../../assets/admin';

export default function NavSide({ onClose }) {
  return (
    <aside className="w-64 h-full bg-n-7 shadow-lg p-4 relative">
      {/* Close button on mobile */}
      {onClose && (
        <button
          className="absolute top-4 right-4 text-white md:hidden"
          onClick={onClose}
          aria-label="Close Sidebar"
        >
          {/* <X size={20} /> */}<img src={x} />
        </button>
      )}

      {navData.map((section, idx) => (
        <div key={idx} className="mb-6">
          <h4 className="text-gray-400 uppercase text-xs font-bold mb-2">
            {section.subheader}
          </h4>
          <ul className="space-y-1">
            {section.items.map((item, i) => (
              <li key={i}>
                <NavLink
                  to={item.path}
                  end={item.path === '/admin'}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2 rounded text-sm text-white hover:bg-n-4 ${
                      isActive ? 'bg-n-5 font-semibold' : 'hover:bg-n-4'
                    }`
                  }
                >
                  {item.icon && item.icon}
                  <span>{item.title}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
}
