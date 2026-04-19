import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import NewPetitionModal from './NewPetitionModal';

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { mode, cycleTheme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const themeIcon = mode === 'light' ? '☀️' : mode === 'dark' ? '🌙' : '🖥️';
  const themeLabel = mode === 'light' ? 'Light' : mode === 'dark' ? 'Dark' : 'Auto';

  const navItems = [
    { name: 'Dashboard', path: '/' },
    { name: 'All Petitions', path: '/petitions' },
    { name: 'Important (10k+)', path: '/important' },
    { name: 'Urgent (50k+)', path: '/urgent' },
    { name: 'About', path: '/about' },
    { name: 'Help', path: '/help' },
  ];

  // If logged out, show only the welcome + login screen
  if (!user) {
    return (
      <div className="min-h-screen w-full flex flex-col md:flex-row font-sans overflow-hidden"
           style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>

        {/* Sidebar — minimal, no nav */}
        <aside className="w-full md:w-64 flex flex-col z-20 shrink-0 h-auto md:h-screen"
               style={{ backgroundColor: 'var(--bg-sidebar)', borderRight: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
          <div className="p-6">
            <h1 className="text-3xl font-extrabold tracking-tighter cursor-pointer"
                onClick={() => navigate('/')}
                style={{ background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              kuroX
            </h1>
            <p className="text-xs mt-1 uppercase tracking-widest font-semibold" style={{ color: 'var(--text-muted)' }}>Your Voice. Amplified.</p>
          </div>

          <div className="flex-1" />

          <div className="p-4" style={{ borderTop: '1px solid var(--border-color)' }}>
            <button onClick={() => navigate('/login')} className="w-full py-3 rounded-xl text-sm font-medium transition-colors"
                    style={{ backgroundColor: 'var(--btn-ghost-bg)', color: 'var(--text-secondary)' }}>
              Login / Register
            </button>
          </div>
        </aside>

        {/* Main — Welcome + Login */}
        <main className="flex-1 flex flex-col relative h-screen overflow-y-auto w-full">
          <header className="sticky top-0 z-10 px-6 py-4 w-full flex flex-wrap gap-4 justify-between items-center backdrop-blur-md"
                  style={{ backgroundColor: 'var(--bg-overlay)', borderBottom: '1px solid var(--border-color)' }}>
            <h2 className="text-xl font-semibold">Welcome</h2>
            <button
              onClick={cycleTheme}
              className="px-3 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-1.5"
              style={{ backgroundColor: 'var(--btn-ghost-bg)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)' }}
            >
              {themeIcon} {themeLabel}
            </button>
          </header>

          <div className="p-4 md:p-8 max-w-5xl mx-auto w-full">
            {location.pathname === '/login' ? (
              <Outlet context={{ refreshTrigger }} />
            ) : (
              <div className="space-y-6 fade-in">
                {/* Hero Banner */}
                <div className="rounded-2xl p-8 md:p-12 relative overflow-hidden"
                     style={{ background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', boxShadow: '0 8px 32px var(--shadow-accent)' }}>
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, #fff 1px, transparent 1px), radial-gradient(circle at 80% 20%, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                  <div className="relative z-10 text-center">
                    <p className="text-white/60 text-xs uppercase tracking-[0.3em] mb-3 font-semibold">குரல் — Voice of the People</p>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">Welcome to kuroX</h1>
                    <p className="text-white/80 text-base md:text-lg max-w-xl mx-auto mb-6">
                      The civic engagement platform that turns citizen voices into government action across Tamil Nadu.
                    </p>
                    <button onClick={() => navigate('/login')}
                            className="px-8 py-3 text-sm font-bold rounded-full transition-all"
                            style={{ backgroundColor: '#fff', color: 'var(--accent-primary)', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
                      Get Started →
                    </button>
                  </div>
                </div>

                {/* How It Works */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { step: '01', icon: '📝', title: 'File a Petition', desc: 'Describe your issue, select your constituency, and publish with Aadhaar-verified identity.' },
                    { step: '02', icon: '✊', title: 'Rally Support', desc: '10,000 supports = Important. 50,000 = Urgent. The people decide what matters most.' },
                    { step: '03', icon: '⚡', title: 'Drive Action', desc: 'Government departments are assigned with SLA deadlines. Track progress in real time.' },
                  ].map(item => (
                    <div key={item.step} className="rounded-2xl p-6 text-center"
                         style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                      <p className="text-3xl mb-3">{item.icon}</p>
                      <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--accent-primary)' }}>Step {item.step}</p>
                      <h3 className="text-base font-bold mb-2">{item.title}</h3>
                      <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Feature Banners */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-2xl p-6 flex items-start gap-4"
                       style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                    <div className="w-12 h-12 shrink-0 rounded-xl flex items-center justify-center text-xl"
                         style={{ background: 'rgba(234,179,8,0.12)' }}>🔒</div>
                    <div>
                      <h3 className="text-sm font-bold mb-1">Aadhaar-Verified Identity</h3>
                      <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                        One person, one account. No bots, no fake supports. Every voice on kuroX is a real citizen of Tamil Nadu.
                      </p>
                    </div>
                  </div>
                  <div className="rounded-2xl p-6 flex items-start gap-4"
                       style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                    <div className="w-12 h-12 shrink-0 rounded-xl flex items-center justify-center text-xl"
                         style={{ background: 'rgba(59,130,246,0.12)' }}>📍</div>
                    <div>
                      <h3 className="text-sm font-bold mb-1">234 Constituencies Covered</h3>
                      <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                        Every petition is mapped to its exact district and assembly constituency with the current MLA auto-filled.
                      </p>
                    </div>
                  </div>
                  <div className="rounded-2xl p-6 flex items-start gap-4"
                       style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                    <div className="w-12 h-12 shrink-0 rounded-xl flex items-center justify-center text-xl"
                         style={{ background: 'rgba(239,68,68,0.12)' }}>📊</div>
                    <div>
                      <h3 className="text-sm font-bold mb-1">Priority-Driven Escalation</h3>
                      <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                        Petitions auto-escalate based on support count. Urgent issues trigger SLA deadlines for government departments.
                      </p>
                    </div>
                  </div>
                  <div className="rounded-2xl p-6 flex items-start gap-4"
                       style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                    <div className="w-12 h-12 shrink-0 rounded-xl flex items-center justify-center text-xl"
                         style={{ background: 'rgba(34,197,94,0.12)' }}>🔄</div>
                    <div>
                      <h3 className="text-sm font-bold mb-1">Full Lifecycle Tracking</h3>
                      <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                        Track every petition from Open → Under Verification → In Progress → Resolved → Closed. Total transparency.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quote Banner */}
                <div className="rounded-2xl p-6 text-center"
                     style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                  <p className="text-base md:text-lg italic leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    "Never doubt that a small group of thoughtful, committed citizens can change the world."
                  </p>
                  <p className="text-sm font-semibold mt-2" style={{ color: 'var(--accent-primary)' }}>— Margaret Mead</p>
                </div>

                {/* CTA */}
                <div className="text-center py-4">
                  <button onClick={() => navigate('/login')}
                          className="px-10 py-3.5 text-white text-base font-bold rounded-full transition-all"
                          style={{ backgroundColor: 'var(--btn-primary-bg)', boxShadow: '0 4px 14px var(--shadow-accent)' }}
                          onMouseEnter={e => e.target.style.backgroundColor = 'var(--btn-primary-hover)'}
                          onMouseLeave={e => e.target.style.backgroundColor = 'var(--btn-primary-bg)'}>
                    Login / Register →
                  </button>
                  <p className="text-xs mt-3" style={{ color: 'var(--text-muted)' }}>
                    Join thousands of citizens shaping Tamil Nadu's future.
                  </p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }

  // Logged in — full layout
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row font-sans overflow-hidden"
         style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 flex flex-col z-20 shrink-0 h-auto md:h-screen"
             style={{ backgroundColor: 'var(--bg-sidebar)', borderRight: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="p-6">
          <h1 className="text-3xl font-extrabold tracking-tighter cursor-pointer"
              onClick={() => navigate('/')}
              style={{ background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            kuroX
          </h1>
          <p className="text-xs mt-1 uppercase tracking-widest font-semibold" style={{ color: 'var(--text-muted)' }}>Your Voice. Amplified.</p>
        </div>

        <nav className="flex-1 px-4 pb-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.path} 
                to={item.path}
                className="block px-4 py-3 rounded-xl text-sm font-medium transition-all"
                style={isActive ? {
                  backgroundColor: 'var(--btn-primary-bg)',
                  color: '#FFFFFF',
                  boxShadow: '0 0 15px var(--shadow-accent)'
                } : {
                  color: 'var(--text-muted)',
                }}
                onMouseEnter={e => { if (!isActive) { e.target.style.backgroundColor = 'var(--btn-ghost-bg)'; e.target.style.color = 'var(--text-primary)'; }}}
                onMouseLeave={e => { if (!isActive) { e.target.style.backgroundColor = 'transparent'; e.target.style.color = 'var(--text-muted)'; }}}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4" style={{ borderTop: '1px solid var(--border-color)' }}>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>👋 {user.username}</span>
            <button onClick={logout} className="text-xs font-medium transition-colors" style={{ color: 'var(--accent-primary)' }}>Logout</button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative h-screen overflow-y-auto w-full">
        <header className="sticky top-0 z-10 px-6 py-4 w-full flex flex-wrap gap-4 justify-between items-center backdrop-blur-md"
                style={{ backgroundColor: 'var(--bg-overlay)', borderBottom: '1px solid var(--border-color)' }}>
          <h2 className="text-xl font-semibold">
            {navItems.find(i => i.path === location.pathname)?.name || 'kuroX'}
          </h2>
          <div className="flex items-center gap-3">
            <button 
              onClick={cycleTheme}
              className="px-3 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-1.5"
              style={{ backgroundColor: 'var(--btn-ghost-bg)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)' }}
            >
              {themeIcon} {themeLabel}
            </button>
            <button onClick={() => setIsModalOpen(true)} 
                    className="px-5 py-2 shrink-0 text-white text-sm font-medium rounded-full transition-all"
                    style={{ backgroundColor: 'var(--btn-primary-bg)', boxShadow: '0 4px 14px var(--shadow-accent)' }}
                    onMouseEnter={e => e.target.style.backgroundColor = 'var(--btn-primary-hover)'}
                    onMouseLeave={e => e.target.style.backgroundColor = 'var(--btn-primary-bg)'}>
              + New Petition
            </button>
          </div>
        </header>

        <div className="p-4 md:p-8 max-w-5xl mx-auto w-full">
          <Outlet context={{ refreshTrigger }} />
        </div>
      </main>

      <NewPetitionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onRefresh={() => setRefreshTrigger(prev => prev + 1)} 
      />
    </div>
  );
}
