import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { TN_DISTRICTS, DISTRICT_CONSTITUENCIES, PARTY_INFO } from '../data/tnConstituencies';

export default function Login() {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [formData, setFormData] = useState({
    username: '', password: '', name: '', area: '', constituency: '', aadhaar_id: ''
  });
  const [selectedConstituency, setSelectedConstituency] = useState(null);
  const [error, setError] = useState('');
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const updated = {...formData, [e.target.name]: e.target.value};
    if (e.target.name === 'area') { updated.constituency = ''; setSelectedConstituency(null); }
    if (e.target.name === 'constituency') {
      const match = (DISTRICT_CONSTITUENCIES[formData.area] || []).find(c => c.name === e.target.value);
      setSelectedConstituency(match || null);
    }
    setFormData(updated);
  };

  const filteredConstituencies = formData.area ? (DISTRICT_CONSTITUENCIES[formData.area] || []) : [];

  const handleSubmit = async (e) => {
    e.preventDefault(); setError('');
    if (isRegisterMode) {
      if (formData.aadhaar_id.length !== 12 || !/^\d+$/.test(formData.aadhaar_id)) { setError('Aadhaar ID must be exactly 12 numeric digits.'); return; }
      const result = await register(formData);
      if (result === true) navigate('/');
      else setError(typeof result === 'object' ? JSON.stringify(result) : 'Registration failed.');
    } else {
      if (await login(formData.username, formData.password)) navigate('/');
      else setError('Invalid credentials.');
    }
  };

  const inputStyle = { backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' };

  return (
    <div className="flex h-full w-full items-center justify-center p-4">
      <div className="backdrop-blur-xl p-8 rounded-2xl w-full max-w-md max-h-[85vh] overflow-y-auto fade-in"
           style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', boxShadow: '0 0 40px rgba(0,0,0,0.15)' }}>
        <h2 className="text-3xl font-extrabold text-center mb-6"
            style={{ background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          {isRegisterMode ? 'Create Account' : 'Welcome Back'}
        </h2>
        
        {error && <p className="text-sm mb-4 text-center" style={{ color: 'var(--accent-primary)' }}>{error}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
              Username <span style={{ color: 'var(--accent-primary)' }}>*</span>
            </label>
            <input type="text" name="username" className="w-full rounded-lg p-3 focus:outline-none transition-colors" style={inputStyle}
                   value={formData.username} onChange={handleChange} required />
          </div>
          
          {isRegisterMode && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
                  Full Name <span style={{ color: 'var(--accent-primary)' }}>*</span>
                </label>
                <input type="text" name="name" className="w-full rounded-lg p-3 focus:outline-none transition-colors" style={inputStyle}
                       value={formData.name} onChange={handleChange} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
                  District <span style={{ color: 'var(--accent-primary)' }}>*</span>
                </label>
                <select name="area" className="w-full rounded-lg p-3 focus:outline-none transition-colors appearance-none" style={inputStyle}
                        value={formData.area} onChange={handleChange} required>
                  <option value="" disabled>Select your district</option>
                  {TN_DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
                  Assembly Constituency <span style={{ color: 'var(--accent-primary)' }}>*</span>
                </label>
                <select name="constituency" className="w-full rounded-lg p-3 focus:outline-none transition-colors appearance-none" style={{...inputStyle, opacity: formData.area ? 1 : 0.5}}
                        value={formData.constituency} onChange={handleChange} required disabled={!formData.area}>
                  <option value="" disabled>{formData.area ? 'Select your constituency' : '— Select a district first —'}</option>
                  {filteredConstituencies.map(c => <option key={c.no} value={c.name}>{c.no}. {c.name}</option>)}
                </select>
              </div>
              {selectedConstituency && (
                <div className="rounded-lg p-3 fade-in" style={{ backgroundColor: 'var(--badge-important-bg)', border: '1px solid var(--badge-important-border)' }}>
                  <p className="text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)' }}>Current MLA</p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold" style={{ color: 'var(--accent-secondary)' }}>{selectedConstituency.mla}</p>
                    <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: PARTY_INFO[selectedConstituency.party]?.color || '#888', color: '#fff' }}>{selectedConstituency.party}</span>
                  </div>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
                  Aadhaar ID (12 Digits) <span style={{ color: 'var(--accent-primary)' }}>*</span>
                </label>
                <input type="text" name="aadhaar_id" placeholder="XXXX XXXX XXXX" maxLength={12}
                       className="w-full rounded-lg p-3 focus:outline-none transition-colors tracking-widest font-mono" style={inputStyle}
                       value={formData.aadhaar_id} onChange={handleChange} required />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
              Password <span style={{ color: 'var(--accent-primary)' }}>*</span>
            </label>
            <input type="password" name="password" className="w-full rounded-lg p-3 focus:outline-none transition-colors" style={inputStyle}
                   value={formData.password} onChange={handleChange} required />
          </div>

          <button type="submit" className="w-full py-3 mt-4 text-white font-bold rounded-lg transition-all"
                  style={{ backgroundColor: 'var(--btn-primary-bg)', boxShadow: '0 4px 14px var(--shadow-accent)' }}>
            {isRegisterMode ? 'Register & Verify Aadhaar' : 'Login'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            {isRegisterMode ? "Already have an account?" : "Don't have an account?"}
            <button onClick={() => { setIsRegisterMode(!isRegisterMode); setError(''); setSelectedConstituency(null); }}
                    className="ml-2 font-semibold" style={{ color: 'var(--accent-primary)' }}>
              {isRegisterMode ? 'Log In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
