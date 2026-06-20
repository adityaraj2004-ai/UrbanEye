import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth.js';
import { Button } from '../ui/button.jsx';

const CREAM = '#F5E9D7';
const BORDER = 'rgba(255,255,255,0.08)';

const citizenLinks = [
  { to: '/home', label: 'Home' },
  { to: '/map', label: 'Map' },
  { to: '/report', label: 'Report' },
  { to: '/nearby', label: 'Nearby' },
  { to: '/my-reports', label: 'My Reports' },
];

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <nav
      className="fixed top-0 inset-x-0 z-50 h-16 px-6 lg:px-10 flex items-center justify-between"
      style={{
        background: 'rgba(11,11,11,0.9)',
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${BORDER}`,
      }}
    >
      <Link to={isAuthenticated ? '/home' : '/'} className="font-bold text-xl tracking-tight shrink-0">
        <span style={{ color: '#F3F3F3' }}>Urban</span>
        <span style={{ color: CREAM }}>Eye</span>
      </Link>

      {isAuthenticated ? (
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="hidden md:flex items-center gap-1">
            {citizenLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm text-neutral-300 hover:text-white px-3 py-2 rounded-md transition-colors hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <Link
            to="/profile"
            className="hidden sm:inline text-sm text-neutral-400 hover:text-white px-3 py-2 transition-colors"
          >
            {user?.fullName?.split(' ')[0] || 'Profile'}
          </Link>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="text-sm text-neutral-200 hover:text-white px-4 py-2 rounded-md transition-colors hover:bg-white/5"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="text-sm font-medium px-4 py-2 rounded-md transition-all hover:opacity-90"
            style={{ background: CREAM, color: '#0B0B0B' }}
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}
