import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import api from '../api';

const QUOTES = [
  { text: "The voice of the people is the voice of progress.", author: "kuroX Philosophy" },
  { text: "Every petition is a seed of change — water it with support.", author: "kuroX" },
  { text: "Democracy thrives when citizens act, not just vote.", author: "kuroX Mission" },
  { text: "One signature can spark a revolution. 10,000 can move a government.", author: "kuroX Vision" },
  { text: "Your constituency, your voice, your power.", author: "kuroX" },
];

const STATUS_COLORS = { Open: '#EAB308', 'Under Verification': '#F97316', 'In Progress': '#3B82F6', Resolved: '#22C55E', Closed: '#6B7280' };
const PRIORITY_COLORS = { Normal: '#6B7280', Important: '#EAB308', Urgent: '#EF4444' };

const ALL_DEPARTMENTS = [
  'Road & Transport', 'Water & Sanitation', 'Education', 'Medical & Healthcare',
  'Electricity & Power', 'Agriculture', 'Housing & Urban Dev', 'Environment',
  'Law & Order', 'Social Welfare', 'Employment', 'Other',
];

export default function Dashboard() {
  const [stats, setStats] = useState({ total: 0, important: 0, urgent: 0, resolved: 0, open: 0, underVerification: 0, inProgress: 0, closed: 0 });
  const [deptData, setDeptData] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [priorityData, setPriorityData] = useState([]);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [recentPosts, setRecentPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const resp = await api.get('posts/');
        const posts = resp.data;
        setRecentPosts(posts.slice(0, 5));

        const total = posts.length;
        const important = posts.filter(p => p.priority === 'IMPORTANT').length;
        const urgent = posts.filter(p => p.priority === 'URGENT').length;
        const resolved = posts.filter(p => p.status === 'RESOLVED').length;
        const closed = posts.filter(p => p.status === 'CLOSED').length;
        const open = posts.filter(p => p.status === 'OPEN').length;
        const underVerification = posts.filter(p => p.status === 'UNDER_VERIFICATION').length;
        const inProgress = posts.filter(p => p.status === 'IN_PROGRESS').length;

        setStats({ total, important, urgent, resolved, open, underVerification, inProgress, closed });

        // Status pie
        setStatusData([
          { name: 'Open', value: open },
          { name: 'Under Verification', value: underVerification },
          { name: 'In Progress', value: inProgress },
          { name: 'Resolved', value: resolved },
          { name: 'Closed', value: closed },
        ].filter(d => d.value > 0));

        // Priority pie
        setPriorityData([
          { name: 'Normal', value: total - important - urgent },
          { name: 'Important', value: important },
          { name: 'Urgent', value: urgent },
        ].filter(d => d.value > 0));

        // Department bar chart — always show all departments
        const deptMap = {};
        ALL_DEPARTMENTS.forEach(d => { deptMap[d] = 0; });
        posts.forEach(p => {
          const label = p.subject_display || 'Other';
          deptMap[label] = (deptMap[label] || 0) + 1;
        });
        setDeptData(ALL_DEPARTMENTS.map(name => ({ name, count: deptMap[name] || 0 })));

      } catch (err) { console.error(err); }
    };
    fetchStats();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setQuoteIndex(i => (i + 1) % QUOTES.length), 6000);
    return () => clearInterval(interval);
  }, []);

  const quote = QUOTES[quoteIndex];



  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg px-3 py-2 text-xs font-medium shadow-lg"
          style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>
          <p>{payload[0].name}: <strong>{payload[0].value}</strong></p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 fade-in">
      {/* Hero Quote Banner */}
      <div className="rounded-2xl p-8 md:p-10 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', boxShadow: '0 8px 32px var(--shadow-accent)' }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, #fff 1px, transparent 1px), radial-gradient(circle at 80% 20%, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 tracking-tight">Welcome to kuroX</h1>
          <p className="text-white/70 text-sm mb-6">Civic Engagement Platform for Tamil Nadu</p>
          <div className="min-h-[70px]" key={quoteIndex}>
            <p className="text-xl md:text-2xl font-medium text-white/95 italic leading-relaxed fade-in">"{quote.text}"</p>
            <p className="text-sm text-white/60 mt-2">— {quote.author}</p>
          </div>
        </div>
      </div>

      {/* Overview */}
      <div className="rounded-2xl p-5 md:p-6" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
        <div className="flex items-center gap-3 mb-1">
          <span className="text-2xl">📋</span>
          <div>
            <p className="text-sm font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Total Petitions</p>
            <p className="text-3xl font-extrabold" style={{ color: 'var(--accent-primary)' }}>{stats.total}</p>
          </div>
        </div>
      </div>

      {/* Priority Tracker */}
      <div className="rounded-2xl p-5 md:p-6" style={{ backgroundColor: 'var(--bg-card)', borderLeft: '4px solid var(--accent-primary)', border: '1px solid var(--border-color)', borderLeftColor: 'var(--accent-primary)', borderLeftWidth: '4px' }}>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { label: 'Normal', value: stats.total - stats.important - stats.urgent, icon: '📄', color: '#6B7280', bg: 'rgba(107,114,128,0.08)' },
            { label: 'Important', value: stats.important, icon: '⭐', color: '#EAB308', bg: 'rgba(234,179,8,0.08)' },
            { label: 'Urgent', value: stats.urgent, icon: '🚨', color: '#EF4444', bg: 'rgba(239,68,68,0.08)' },
          ].map(card => (
            <div key={card.label} className="rounded-xl p-4 text-center"
              style={{ backgroundColor: card.bg, border: `1px solid ${card.color}22` }}>
              <p className="text-xl mb-1">{card.icon}</p>
              <p className="text-2xl font-extrabold" style={{ color: card.color }}>{card.value}</p>
              <p className="text-[10px] font-semibold uppercase tracking-wider mt-1" style={{ color: card.color }}>{card.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Status Tracker */}
      <div className="rounded-2xl p-5 md:p-6" style={{ backgroundColor: 'var(--bg-card)', borderLeft: '4px solid #3B82F6', border: '1px solid var(--border-color)', borderLeftColor: '#3B82F6', borderLeftWidth: '4px' }}>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { label: 'Open', value: stats.open, icon: '📂', color: '#EAB308', bg: 'rgba(234,179,8,0.08)' },
            { label: 'Verifying', value: stats.underVerification, icon: '🔍', color: '#F97316', bg: 'rgba(249,115,22,0.08)' },
            { label: 'In Progress', value: stats.inProgress, icon: '🔄', color: '#3B82F6', bg: 'rgba(59,130,246,0.08)' },
            { label: 'Resolved', value: stats.resolved, icon: '✅', color: '#22C55E', bg: 'rgba(34,197,94,0.08)' },
            { label: 'Closed', value: stats.closed, icon: '🔒', color: '#6B7280', bg: 'rgba(107,114,128,0.08)' },
          ].map(card => (
            <div key={card.label} className="rounded-xl p-4 text-center"
              style={{ backgroundColor: card.bg, border: `1px solid ${card.color}22` }}>
              <p className="text-xl mb-1">{card.icon}</p>
              <p className="text-2xl font-extrabold" style={{ color: card.color }}>{card.value}</p>
              <p className="text-[10px] font-semibold uppercase tracking-wider mt-1" style={{ color: card.color }}>{card.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Status Pie Chart */}
        <div className="rounded-2xl p-6" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
          <h3 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--text-muted)' }}>Petition Status Distribution</h3>
          {statusData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={statusData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={4} dataKey="value" strokeWidth={0} isAnimationActive={false} activeIndex={-1}>
                  {statusData.map((entry) => (
                    <Cell key={entry.name} fill={STATUS_COLORS[entry.name]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend formatter={(value) => <span style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>{value}</span>} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[250px] flex items-center justify-center text-sm" style={{ color: 'var(--text-muted)' }}>No data yet</div>
          )}
        </div>

        {/* Priority Pie Chart */}
        <div className="rounded-2xl p-6" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
          <h3 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--text-muted)' }}>Priority Breakdown</h3>
          {priorityData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={priorityData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={4} dataKey="value" strokeWidth={0} isAnimationActive={false} activeIndex={-1}>
                  {priorityData.map((entry) => (
                    <Cell key={entry.name} fill={PRIORITY_COLORS[entry.name]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend formatter={(value) => <span style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>{value}</span>} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[250px] flex items-center justify-center text-sm" style={{ color: 'var(--text-muted)' }}>No data yet</div>
          )}
        </div>
      </div>

      {/* Department Bar Chart */}
      <div className="rounded-2xl p-6" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
        <h3 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--text-muted)' }}>Petitions by Department</h3>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={deptData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <XAxis dataKey="name" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} angle={-40} textAnchor="end" height={100} interval={0} />
            <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} allowDecimals={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="count" radius={[6, 6, 0, 0]} fill="var(--accent-primary)" maxBarSize={36} isAnimationActive={false} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button onClick={() => navigate('/petitions')} className="rounded-xl p-5 text-left transition-all"
          style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
          <p className="text-lg mb-1">📋 All Petitions</p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Browse and support community petitions</p>
        </button>
        <button onClick={() => navigate('/about')} className="rounded-xl p-5 text-left transition-all"
          style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
          <p className="text-lg mb-1">💡 About kuroX</p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Learn our mission and vision</p>
        </button>
        <button onClick={() => navigate('/help')} className="rounded-xl p-5 text-left transition-all"
          style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
          <p className="text-lg mb-1">❓ Help Center</p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>How to file and track petitions</p>
        </button>
      </div>

      {/* Recent Petitions */}
      {recentPosts.length > 0 && (
        <div>
          <h2 className="text-lg font-bold mb-4">Recent Petitions</h2>
          <div className="space-y-3">
            {recentPosts.map(post => (
              <div key={post.id} className="rounded-xl p-4 flex items-center justify-between gap-4 cursor-pointer transition-all"
                style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
                onClick={() => navigate('/petitions')}>
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 shrink-0 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    style={{ background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))' }}>
                    {post.author_name?.charAt(0).toUpperCase() || 'A'}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold truncate">{post.problem_statement}</p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>📍 {post.area} · ✊ {post.support_count} supports</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] px-2 py-1 rounded-full font-bold"
                    style={{
                      backgroundColor: STATUS_COLORS[post.status === 'IN_PROGRESS' ? 'In Progress' : post.status === 'OPEN' ? 'Open' : post.status === 'RESOLVED' ? 'Resolved' : 'Closed'] + '22',
                      color: STATUS_COLORS[post.status === 'IN_PROGRESS' ? 'In Progress' : post.status === 'OPEN' ? 'Open' : post.status === 'RESOLVED' ? 'Resolved' : 'Closed']
                    }}>
                    {post.status}
                  </span>
                  {post.priority === 'URGENT' && <span className="text-[10px] px-2 py-1 rounded-full font-bold" style={{ backgroundColor: 'var(--badge-urgent-bg)', color: 'var(--badge-urgent-text)' }}>URGENT</span>}
                  {post.priority === 'IMPORTANT' && <span className="text-[10px] px-2 py-1 rounded-full font-bold" style={{ backgroundColor: 'var(--badge-important-bg)', color: 'var(--badge-important-text)' }}>IMPORTANT</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
