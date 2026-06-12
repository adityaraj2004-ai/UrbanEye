import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 px-8 py-5 flex items-center justify-between" style={{ background: 'rgba(11,11,11,0.9)', backdropFilter: 'blur(12px)' }}>
      <Link to="/" className="font-bold text-xl">
        <span style={{ color: '#F3F3F3' }}>Urban</span><span style={{ color: '#F5E9D7' }}>Eye</span>
      </Link>
    </nav>
  );
}