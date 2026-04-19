import { useState, useEffect, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import api from '../api';

const SUBJECT_OPTIONS = [
  { value: '', label: 'All Subjects' },
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

const STATUS_STYLES = {
  OPEN: { label: 'Open', bg: 'rgba(234,179,8,0.15)', text: '#EAB308', border: 'rgba(234,179,8,0.3)' },
  UNDER_VERIFICATION: { label: 'Under Verification', bg: 'rgba(249,115,22,0.15)', text: '#F97316', border: 'rgba(249,115,22,0.3)' },
  IN_PROGRESS: { label: 'In Progress', bg: 'rgba(59,130,246,0.15)', text: '#3B82F6', border: 'rgba(59,130,246,0.3)' },
  RESOLVED: { label: 'Resolved', bg: 'rgba(34,197,94,0.15)', text: '#22C55E', border: 'rgba(34,197,94,0.3)' },
  CLOSED: { label: 'Closed', bg: 'rgba(107,114,128,0.15)', text: '#6B7280', border: 'rgba(107,114,128,0.3)' },
};

export default function Feed({ filter = 'ALL' }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedCommentsId, setExpandedCommentsId] = useState(null);
  const [commentInput, setCommentInput] = useState('');
  const [copiedPostId, setCopiedPostId] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  // Filter state
  const [filterKeyword, setFilterKeyword] = useState('');
  const [filterSubject, setFilterSubject] = useState('');
  const [filterArea, setFilterArea] = useState('');
  const [filterDateFrom, setFilterDateFrom] = useState('');
  const [filterDateTo, setFilterDateTo] = useState('');
  const [filterMinSupport, setFilterMinSupport] = useState('');
  const [filterMaxUnsupport, setFilterMaxUnsupport] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  // Unsupport modal
  const [unsupportPostId, setUnsupportPostId] = useState(null);
  const [unsupportReason, setUnsupportReason] = useState('');
  
  const { refreshTrigger } = useOutletContext() || { refreshTrigger: 0 };

  const fetchPosts = async () => {
    try {
      const resp = await api.get('posts/');
      setPosts(resp.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchPosts(); }, [refreshTrigger]);

  const handleReact = async (postId, reactionType, reason = '') => {
    try {
      const resp = await api.post(`posts/${postId}/react/`, { reaction_type: reactionType, reason });
      if (resp.status === 200) fetchPosts();
    } catch (err) {
      const msg = err.response?.data?.error || "Please login to interact!";
      alert(msg);
    }
  };

  const handleUnsupportSubmit = () => {
    if (!unsupportReason.trim()) { alert('Please provide a reason for unsupporting.'); return; }
    handleReact(unsupportPostId, 'UNSUPPORT', unsupportReason);
    setUnsupportPostId(null);
    setUnsupportReason('');
  };

  const submitComment = async (e, postId) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    try {
      await api.post('comments/', { post: postId, content: commentInput });
      setCommentInput(''); fetchPosts();
    } catch (err) { alert("Error: Please login to comment."); }
  };

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      if (filter === 'IMPORTANT' && post.priority !== 'IMPORTANT') return false;
      if (filter === 'URGENT' && post.priority !== 'URGENT') return false;
      if (filterKeyword && !post.problem_statement.toLowerCase().includes(filterKeyword.toLowerCase()) && !post.area.toLowerCase().includes(filterKeyword.toLowerCase())) return false;
      if (filterSubject && post.subject !== filterSubject) return false;
      if (filterArea && !post.area.toLowerCase().includes(filterArea.toLowerCase())) return false;
      if (filterStatus && post.status !== filterStatus) return false;
      if (filterDateFrom && new Date(post.created_at) < new Date(filterDateFrom)) return false;
      if (filterDateTo && new Date(post.created_at) > new Date(filterDateTo + 'T23:59:59')) return false;
      if (filterMinSupport && post.support_count < parseInt(filterMinSupport)) return false;
      if (filterMaxUnsupport && post.unsupport_count > parseInt(filterMaxUnsupport)) return false;
      return true;
    });
  }, [posts, filter, filterKeyword, filterSubject, filterArea, filterStatus, filterDateFrom, filterDateTo, filterMinSupport, filterMaxUnsupport]);

  const clearFilters = () => {
    setFilterKeyword(''); setFilterSubject(''); setFilterArea(''); setFilterDateFrom(''); setFilterDateTo(''); setFilterMinSupport(''); setFilterMaxUnsupport(''); setFilterStatus('');
  };

  const inputStyle = { backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' };

  if (loading) return <div className="text-center py-20" style={{ color: 'var(--text-muted)' }}>Loading petitions...</div>;

  return (
    <div className="space-y-6 fade-in">
      {/* Filter Toggle */}
      <div className="flex items-center justify-end gap-3">
        {(filterKeyword || filterSubject || filterArea || filterDateFrom || filterStatus) && (
          <button onClick={clearFilters} className="text-xs font-medium px-3 py-1.5 rounded-lg" style={{ color: 'var(--accent-primary)', backgroundColor: 'var(--badge-urgent-bg)' }}>
            ✕ Clear
          </button>
        )}
        <button onClick={() => setShowFilters(!showFilters)}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-all"
                style={{ backgroundColor: showFilters ? 'var(--btn-primary-bg)' : 'var(--btn-ghost-bg)', color: showFilters ? '#fff' : 'var(--text-secondary)', border: '1px solid var(--border-color)' }}
                title="Filter petitions">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
          </svg>
        </button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="rounded-2xl p-5 space-y-4 fade-in" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Keyword</label>
              <input type="text" placeholder="Search petitions..." className="w-full rounded-lg p-2.5 text-sm focus:outline-none" style={inputStyle} value={filterKeyword} onChange={e => setFilterKeyword(e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>District / Area</label>
              <input type="text" placeholder="e.g. Chennai" className="w-full rounded-lg p-2.5 text-sm focus:outline-none" style={inputStyle} value={filterArea} onChange={e => setFilterArea(e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Subject</label>
              <select className="w-full rounded-lg p-2.5 text-sm focus:outline-none appearance-none" style={inputStyle} value={filterSubject} onChange={e => setFilterSubject(e.target.value)}>
                {SUBJECT_OPTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Status</label>
              <select className="w-full rounded-lg p-2.5 text-sm focus:outline-none appearance-none" style={inputStyle} value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                <option value="">All Statuses</option>
                <option value="OPEN">Open</option>
                <option value="UNDER_VERIFICATION">Under Verification</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="RESOLVED">Resolved</option>
                <option value="CLOSED">Closed</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Date From</label>
              <input type="date" className="w-full rounded-lg p-2.5 text-sm focus:outline-none" style={inputStyle} value={filterDateFrom} onChange={e => setFilterDateFrom(e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Date To</label>
              <input type="date" className="w-full rounded-lg p-2.5 text-sm focus:outline-none" style={inputStyle} value={filterDateTo} onChange={e => setFilterDateTo(e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Min. Supports</label>
              <input type="number" placeholder="0" min="0" className="w-full rounded-lg p-2.5 text-sm focus:outline-none" style={inputStyle} value={filterMinSupport} onChange={e => setFilterMinSupport(e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Max. Unsupports</label>
              <input type="number" placeholder="∞" min="0" className="w-full rounded-lg p-2.5 text-sm focus:outline-none" style={inputStyle} value={filterMaxUnsupport} onChange={e => setFilterMaxUnsupport(e.target.value)} />
            </div>
          </div>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Showing {filteredPosts.length} of {posts.length} petitions</p>
        </div>
      )}

      {/* Posts */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-20" style={{ color: 'var(--text-muted)' }}>No petitions found.</div>
      ) : (
        filteredPosts.map(post => {
          const st = STATUS_STYLES[post.status] || STATUS_STYLES.OPEN;
          return (
          <div key={post.id} className="rounded-2xl p-5 md:p-6 transition-colors"
               style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
            
            {/* Header */}
            <div className="flex flex-wrap gap-4 justify-between items-start mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 shrink-0 rounded-full flex items-center justify-center text-white text-xl font-bold"
                     style={{ background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', boxShadow: '0 4px 12px var(--shadow-accent)' }}>
                  {post.author_name ? post.author_name.charAt(0).toUpperCase() : 'A'}
                </div>
                <div className="flex flex-col">
                  <h3 className="font-semibold text-lg">{post.author_name || 'Anonymous User'}</h3>
                  <p className="text-xs font-medium tracking-wide" style={{ color: 'var(--accent-primary)' }}>📍 {post.area}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 shrink-0">
                {/* Subject Badge */}
                {post.subject_display && (
                  <span className="px-2.5 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider"
                        style={{ backgroundColor: 'var(--btn-ghost-bg)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)' }}>
                    {post.subject_display}
                  </span>
                )}
                {/* Status Badge */}
                <span className="px-2.5 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider"
                      style={{ backgroundColor: st.bg, color: st.text, border: `1px solid ${st.border}` }}>
                  {st.label}
                </span>
                {/* Priority Badge */}
                {post.priority === 'URGENT' && (
                  <span className="px-2.5 py-1 text-[10px] font-bold rounded-full" style={{ backgroundColor: 'var(--badge-urgent-bg)', color: 'var(--badge-urgent-text)', border: '1px solid var(--badge-urgent-border)' }}>
                    🚨 URGENT
                  </span>
                )}
                {post.priority === 'IMPORTANT' && (
                  <span className="px-2.5 py-1 text-[10px] font-bold rounded-full" style={{ backgroundColor: 'var(--badge-important-bg)', color: 'var(--badge-important-text)', border: '1px solid var(--badge-important-border)' }}>
                    ⭐ IMPORTANT
                  </span>
                )}
              </div>
            </div>

            {/* Body */}
            <p className="text-[15px] leading-relaxed mb-6 whitespace-pre-wrap break-words" style={{ color: 'var(--text-secondary)' }}>
              {post.problem_statement}
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between pt-4 gap-4" style={{ borderTop: '1px solid var(--border-color)' }}>
              <div className="flex flex-wrap gap-6">
                <button onClick={() => handleReact(post.id, 'SUPPORT')}
                        className="flex items-center gap-2 text-sm font-medium transition-colors"
                        style={{ color: 'var(--text-muted)' }}>
                  ✊ {post.support_count.toLocaleString()} Support
                </button>
                <button onClick={() => { setUnsupportPostId(post.id); setUnsupportReason(''); }}
                        className="flex items-center gap-2 text-sm font-medium transition-colors"
                        style={{ color: 'var(--text-muted)' }}>
                  👎 {post.unsupport_count.toLocaleString()} Unsupport
                </button>
                <button onClick={() => setExpandedCommentsId(expandedCommentsId === post.id ? null : post.id)}
                        className="flex items-center gap-2 text-sm font-medium transition-colors"
                        style={{ color: expandedCommentsId === post.id ? 'var(--accent-secondary)' : 'var(--text-muted)' }}>
                  💬 Discuss ({post.comments?.length || 0})
                </button>
              </div>
              <button onClick={() => {
                        navigator.clipboard.writeText(`${window.location.origin}/post/${post.id}`);
                        setCopiedPostId(post.id); setTimeout(() => setCopiedPostId(null), 2000);
                      }}
                      className="text-sm font-medium flex items-center gap-2 ml-auto md:ml-0" style={{ color: 'var(--text-muted)' }}>
                {copiedPostId === post.id ? '✅ Copied!' : '↗️ Share'}
              </button>
            </div>

            {/* Comments */}
            {expandedCommentsId === post.id && (
              <div className="mt-6 pt-4 fade-in" style={{ borderTop: '1px solid var(--border-color)' }}>
                <h4 className="text-sm font-semibold mb-4 uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Discussion</h4>
                <div className="space-y-4 mb-4 max-h-60 overflow-y-auto pr-2">
                  {(!post.comments || post.comments.length === 0) ? (
                    <p className="text-sm italic" style={{ color: 'var(--text-muted)' }}>No comments yet. Start the discussion!</p>
                  ) : (
                    post.comments.map(c => (
                      <div key={c.id} className="p-3 rounded-xl" style={{ backgroundColor: 'var(--comment-bg)', border: '1px solid var(--border-color)' }}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold">{c.author_name}</span>
                          <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{new Date(c.created_at).toLocaleString()}</span>
                        </div>
                        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{c.content}</p>
                      </div>
                    ))
                  )}
                </div>
                <form onSubmit={(e) => submitComment(e, post.id)} className="flex gap-2">
                  <input type="text" placeholder="Contribute to the petition..." className="flex-1 rounded-lg px-4 py-2 text-sm focus:outline-none" style={inputStyle}
                         value={commentInput} onChange={e => setCommentInput(e.target.value)} />
                  <button type="submit" className="px-4 py-2 text-white text-sm font-medium rounded-lg" style={{ backgroundColor: 'var(--btn-primary-bg)' }}>Post</button>
                </form>
              </div>
            )}
          </div>
          );
        })
      )}

      {/* Unsupport Reason Modal */}
      {unsupportPostId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
          <div className="w-full max-w-md rounded-2xl p-6 fade-in" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Unsupport this petition?</h3>
              <button onClick={() => setUnsupportPostId(null)}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-lg transition-colors"
                      style={{ backgroundColor: 'var(--btn-ghost-bg)', color: 'var(--text-muted)' }}>×</button>
            </div>
            <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>
              To prevent misuse, a reason is <strong>mandatory</strong> for unsupporting a petition.
            </p>
            <textarea rows={3} placeholder="Why do you disagree with this petition?"
                      className="w-full rounded-lg p-3 text-sm mb-4 focus:outline-none resize-none" style={inputStyle}
                      value={unsupportReason} onChange={e => setUnsupportReason(e.target.value)} />
            <div className="flex gap-3">
              <button onClick={() => setUnsupportPostId(null)}
                      className="flex-1 py-2.5 rounded-lg text-sm font-medium"
                      style={{ backgroundColor: 'var(--btn-ghost-bg)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)' }}>
                Cancel
              </button>
              <button onClick={handleUnsupportSubmit}
                      className="flex-1 py-2.5 rounded-lg text-sm font-bold text-white"
                      style={{ backgroundColor: 'var(--btn-primary-bg)' }}>
                Submit Unsupport
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
