import { Outlet } from 'react-router-dom';

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex" style={{ background: '#0B0B0B' }}>
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center p-12">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'linear-gradient(rgba(243,231,211,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(243,231,211,0.06) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            animation: 'gridShift 20s linear infinite',
          }}
        />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 30% 40%, rgba(243,231,211,0.05), transparent 60%)' }} />
        <div className="relative z-10 max-w-md">
          <h1 className="text-5xl font-light tracking-tight text-white mb-4">
            Urban<span style={{ color: '#F3E7D3' }}>Eye</span>
          </h1>
          <p className="text-lg text-neutral-400 font-light">
            Intelligence for safer cities
          </p>
        </div>
        <style>{`
          @keyframes gridShift {
            0% { transform: translate(0,0); }
            100% { transform: translate(48px,48px); }
          }
        `}</style>
      </div>
      <div
        className="w-full lg:w-1/2 flex items-center justify-center p-8"
        style={{ background: '#0B0B0B' }}
      >
        <div className="w-full max-w-md">
          {children ?? <Outlet />}
        </div>
      </div>
    </div>
  );
}