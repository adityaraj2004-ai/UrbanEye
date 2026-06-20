import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Map,
  FileWarning,
  BarChart3,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const CREAM = '#F5E9D7';
const BORDER = 'rgba(255,255,255,0.08)';

const adminLinks = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/incidents', label: 'Incidents', icon: FileWarning },
  { to: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
];

function NavLink({ to, label, icon: Icon, end = false, collapsed }) {
  const { pathname } = useLocation();
  const active = end ? pathname === to : pathname.startsWith(to);

  return (
    <Link
      to={to}
      title={collapsed ? label : undefined}
      className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors"
      style={{
        color: active ? CREAM : '#C8C8C8',
        background: active ? 'rgba(245,233,215,0.08)' : 'transparent',
        border: active ? `1px solid ${BORDER}` : '1px solid transparent',
      }}
    >
      <Icon className="w-4 h-4 shrink-0" />
      {!collapsed && <span>{label}</span>}
    </Link>
  );
}

export default function Sidebar({ collapsed, setCollapsed }) {
  return (
    <aside
      className="fixed top-0 left-0 z-40 h-screen flex flex-col transition-all duration-300"
      style={{
        width: collapsed ? 80 : 260,
        background: '#111111',
        borderRight: `1px solid ${BORDER}`,
      }}
    >
      <div
        className="flex items-center px-4 h-16 shrink-0"
        style={{ borderBottom: `1px solid ${BORDER}` }}
      >
        <Link to="/admin" className="font-bold text-lg tracking-tight truncate">
          <span style={{ color: '#F3F3F3' }}>Urban</span>
          <span style={{ color: CREAM }}>Eye</span>
        </Link>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {adminLinks.map((link) => (
          <NavLink key={link.to} {...link} collapsed={collapsed} />
        ))}
        <div className="pt-4 mt-4" style={{ borderTop: `1px solid ${BORDER}` }}>
          <NavLink to="/map" label="Citizen Map" icon={Map} collapsed={collapsed} />
        </div>
      </nav>

      <button
        type="button"
        onClick={() => setCollapsed((c) => !c)}
        className="flex items-center justify-center h-12 shrink-0 transition-colors hover:bg-white/5"
        style={{ borderTop: `1px solid ${BORDER}`, color: '#888' }}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
    </aside>
  );
}
