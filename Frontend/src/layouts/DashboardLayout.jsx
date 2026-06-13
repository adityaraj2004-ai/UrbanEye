import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar.jsx';

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="min-h-screen flex" style={{ background: '#0B0B0B' }}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <main
        className="flex-1 transition-all duration-300"
        style={{ marginLeft: collapsed ? 80 : 260 }}
      >
        <Outlet />
      </main>
    </div>
  );
}
