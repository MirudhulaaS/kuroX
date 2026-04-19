import { useState } from 'react';
import api from '../api';
import { TN_DISTRICTS, DISTRICT_CONSTITUENCIES, PARTY_INFO } from '../data/tnConstituencies';

const SUBJECT_OPTIONS = [
  { value: 'ROAD', label: 'Road & Transport' },
  { value: 'WATER', label: 'Water & Sanitation' },
  { value: 'EDUCATION', label: 'Education' },
  { value: 'MEDICAL', label: 'Medical & Healthcare' },
  { value: 'ELECTRICITY', label: 'Electricity & Power' },
  { value: 'AGRICULTURE', label: 'Agriculture' },
  { value: 'HOUSING', label: 'Housing & Urban Dev' },
  { value: 'ENVIRONMENT', label: 'Environment' },
  { value: 'LAW_ORDER', label: 'Law & Order' },
  { value: 'WELFARE', label: 'Social Welfare' },
  { value: 'EMPLOYMENT', label: 'Employment' },
  { value: 'OTHER', label: 'Other' },
];

export default function NewPetitionModal({ isOpen, onClose, onRefresh }) {
  const [area, setArea] = useState('');
  const [constituency, setConstituency] = useState('');
  const [subject, setSubject] = useState('');
  const [selectedConstituency, setSelectedConstituency] = useState(null);
  const [problem, setProblem] = useState('');
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const filteredConstituencies = area ? (DISTRICT_CONSTITUENCIES[area] || []) : [];

  if (!isOpen) return null;

  const handleDistrictChange = (e) => { setArea(e.target.value); setConstituency(''); setSelectedConstituency(null); };
  const handleConstituencyChange = (e) => {
    setConstituency(e.target.value);
    const match = filteredConstituencies.find(c => c.name === e.target.value);
    setSelectedConstituency(match || null);
  };

  const handleFormSubmit = (e) => { e.preventDefault(); setShowConfirm(true); };

  const handleConfirmPublish = async () => {
    setLoading(true);
    try {
      await api.post('posts/', { area: `${area} — ${constituency}`, subject, problem_statement: problem });
      setArea(''); setConstituency(''); setSubject(''); setSelectedConstituency(null); setProblem(''); setShowConfirm(false);
      onRefresh(); onClose();
    } catch (err) {
      console.error("Failed to create petition", err);
      alert("Error: Please login first!");
      setShowConfirm(false);
    } finally { setLoading(false); }
  };

  const inputStyle = { backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' };
  const subjectLabel = SUBJECT_OPTIONS.find(s => s.value === subject)?.label || '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
      <div className="w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col fade-in"
           style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
        <div className="p-5 flex justify-between items-center" style={{ backgroundColor: 'var(--bg-sidebar)', borderBottom: '1px solid var(--border-color)' }}>
          <h2 className="text-xl font-bold"
              style={{ background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            File New Petition
          </h2>
          <button onClick={() => { setShowConfirm(false); onClose(); }} className="w-8 h-8 rounded-full flex items-center justify-center text-lg"
                  style={{ backgroundColor: 'var(--btn-ghost-bg)', color: 'var(--text-muted)' }}>×</button>
        </div>
        
        {!showConfirm ? (
          <form onSubmit={handleFormSubmit} className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-muted)' }}>
                Affected District <span style={{ color: 'var(--accent-primary)' }}>*</span>
              </label>
              <select className="w-full rounded-lg p-3 focus:outline-none appearance-none" style={inputStyle} value={area} onChange={handleDistrictChange} required>
                <option value="" disabled>Select the affected district</option>
                {TN_DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-muted)' }}>
                Assembly Constituency <span style={{ color: 'var(--accent-primary)' }}>*</span>
              </label>
              <select className="w-full rounded-lg p-3 focus:outline-none appearance-none" style={{...inputStyle, opacity: area ? 1 : 0.5}} value={constituency} onChange={handleConstituencyChange} required disabled={!area}>
                <option value="" disabled>{area ? 'Select constituency' : '— Select a district first —'}</option>
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
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-muted)' }}>
                Subject <span style={{ color: 'var(--accent-primary)' }}>*</span>
              </label>
              <select className="w-full rounded-lg p-3 focus:outline-none appearance-none" style={inputStyle} value={subject} onChange={e => setSubject(e.target.value)} required>
                <option value="" disabled>Select a subject category</option>
                {SUBJECT_OPTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-muted)' }}>
                Problem Statement <span style={{ color: 'var(--accent-primary)' }}>*</span>
              </label>
              <textarea rows={4} placeholder="Describe the state infrastructure problem clearly..."
                        className="w-full rounded-lg p-3 focus:outline-none resize-none" style={inputStyle}
                        value={problem} onChange={e => setProblem(e.target.value)} required />
            </div>
            <div className="pt-2">
              <button type="submit" className="w-full py-3 text-white font-bold rounded-lg transition-all"
                      style={{ backgroundColor: 'var(--btn-primary-bg)', boxShadow: '0 4px 14px var(--shadow-accent)' }}>
                Review & Confirm →
              </button>
            </div>
          </form>
        ) : (
          <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto fade-in">
            <div className="rounded-xl p-4" style={{ backgroundColor: 'var(--badge-urgent-bg)', border: '1px solid var(--badge-urgent-border)' }}>
              <p className="text-sm font-semibold mb-1" style={{ color: 'var(--badge-urgent-text)' }}>⚠️ Confirmation Required</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Petitions cannot be edited or deleted once published.</p>
            </div>
            <div className="space-y-3">
              <div><p className="text-xs uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>District</p><p className="text-sm font-semibold">{area}</p></div>
              <div><p className="text-xs uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Constituency</p><p className="text-sm font-semibold">{selectedConstituency?.no}. {constituency}</p></div>
              {selectedConstituency && (
                <div>
                  <p className="text-xs uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Current MLA</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-semibold">{selectedConstituency.mla}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: PARTY_INFO[selectedConstituency.party]?.color, color: '#fff' }}>{selectedConstituency.party}</span>
                  </div>
                </div>
              )}
              <div><p className="text-xs uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Subject</p><p className="text-sm font-semibold">{subjectLabel}</p></div>
              <div><p className="text-xs uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Problem Statement</p><p className="text-sm mt-1 whitespace-pre-wrap" style={{ color: 'var(--text-secondary)' }}>{problem}</p></div>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setShowConfirm(false)} className="flex-1 py-3 font-bold rounded-lg" style={{ backgroundColor: 'var(--btn-ghost-bg)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)' }}>← Edit</button>
              <button onClick={handleConfirmPublish} disabled={loading} className="flex-1 py-3 text-white font-bold rounded-lg disabled:opacity-50" style={{ backgroundColor: 'var(--btn-primary-bg)', boxShadow: '0 4px 14px var(--shadow-accent)' }}>
                {loading ? "Publishing..." : "✓ Confirm & Publish"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
