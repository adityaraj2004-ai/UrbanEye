import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar.jsx';

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarWidth = collapsed ? 80 : 260;

  return (
    <div className="min-h-screen" style={{ background: '#0B0B0B' }}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <main
        className="min-h-screen transition-all duration-300 pt-16"
        style={{ marginLeft: sidebarWidth }}
      >
        <Outlet />
      </main>
    </div>
  );
}
