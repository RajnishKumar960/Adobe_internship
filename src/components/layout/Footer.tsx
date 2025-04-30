import { NavLink } from 'react-router-dom';
import { Home, User, LayoutDashboard, LogIn, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

function Footer() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <footer className="bg-white shadow-md py-3 sticky bottom-0">
      <nav className="max-w-screen-xl mx-auto px-4">
        <ul className="flex items-center justify-between">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex flex-col items-center p-2 transition-colors ${
                  isActive ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'
                }`
              }
            >
              <Home size={20} />
              <span className="text-xs mt-1">Home</span>
            </NavLink>
          </li>

          {isAuthenticated ? (
            <>
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `flex flex-col items-center p-2 transition-colors ${
                      isActive ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'
                    }`
                  }
                >
                  <LayoutDashboard size={20} />
                  <span className="text-xs mt-1">Dashboard</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `flex flex-col items-center p-2 transition-colors ${
                      isActive ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'
                    }`
                  }
                >
                  <User size={20} />
                  <span className="text-xs mt-1">Profile</span>
                </NavLink>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="flex flex-col items-center p-2 text-gray-600 hover:text-red-500 transition-colors"
                >
                  <LogOut size={20} />
                  <span className="text-xs mt-1">Logout</span>
                </button>
              </li>
            </>
          ) : (
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `flex flex-col items-center p-2 transition-colors ${
                    isActive ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'
                  }`
                }
              >
                <LogIn size={20} />
                <span className="text-xs mt-1">Login</span>
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </footer>
  );
}

export default Footer;