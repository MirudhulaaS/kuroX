export default function About() {
  const quotes = [
    { text: "The measure of a society is found in how they treat their weakest and most helpless citizens.", author: "Jimmy Carter" },
    { text: "Never doubt that a small group of thoughtful, committed citizens can change the world.", author: "Margaret Mead" },
    { text: "In a democracy, the well-being of the people is the ultimate measure of governance.", author: "kuroX Principle" },
  ];

  return (
    <div className="space-y-8 fade-in max-w-3xl mx-auto">
      {/* Hero */}
      <div className="text-center py-8">
        <h1 className="text-4xl font-extrabold mb-3"
          style={{ background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          About kuroX
        </h1>
        <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
          Empowering Citizens. Enabling Governance. Evolving Democracy.
        </p>
      </div>

      {/* Mission */}
      <section className="rounded-2xl p-6 md:p-8" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--accent-primary)' }}>🎯 Our Mission</h2>
        <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          kuroX is a <strong>civic engagement platform</strong> built to bridge the gap between the people of Tamil Nadu and
          the state government. We believe that every citizen's voice matters — whether it's a pothole on a village road
          or a systemic failure in urban healthcare. kuroX provides a <strong>structured, transparent, and accountable </strong>
          channel for citizens to raise issues, rally community support, and push for government action.
        </p>
      </section>

      {/* Vision */}
      <section className="rounded-2xl p-6 md:p-8" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--accent-secondary)' }}>🔭 Our Vision</h2>
        <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          To create a <strong>digital democracy</strong> where no grievance goes unheard. We envision a Tamil Nadu where
          state departments actively respond to citizen petitions within defined SLA timelines, where data drives
          policy decisions, and where the people hold the power to prioritise what matters most to their communities.
        </p>
      </section>

      {/* How it works */}
      <section className="rounded-2xl p-6 md:p-8" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--accent-primary)' }}>⚙️ How kuroX Works</h2>
        <div className="space-y-4">
          {[
            { step: '1', title: 'File a Petition', desc: 'Select your district, constituency, department, and describe the issue. Your Aadhaar-verified identity ensures authenticity.' },
            { step: '2', title: 'Rally Support', desc: 'Share your petition. When it reaches 10,000 supports, it\'s marked Important. At 50,000 — it\'s Urgent, triggering government SLA timelines.' },
            { step: '3', title: 'Verification', desc: 'Admins review each petition to confirm legitimacy — checking if it\'s genuine, not a duplicate, and within government jurisdiction.' },
            { step: '4', title: 'Department Assignment', desc: 'Once verified, petitions are assigned to the relevant government department (e.g., Highway Dept for road issues) with SLA deadlines.' },
            { step: '5', title: 'Track Resolution', desc: 'Petitions are tracked through Open → Under Verification → In Progress → Resolved → Closed. Full transparency at every step.' },
            { step: '6', title: 'Democracy in Action', desc: 'Resolved petitions are closed. Unresolved ones escalate. The people\'s voice becomes the government\'s priority.' },
          ].map(item => (
            <div key={item.step} className="flex gap-4 items-start">
              <div className="w-10 h-10 shrink-0 rounded-full flex items-center justify-center text-white text-sm font-bold"
                style={{ background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))' }}>
                {item.step}
              </div>
              <div>
                <h3 className="font-semibold mb-0.5">{item.title}</h3>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quotes */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>💬 Words That Inspire Us</h2>
        {quotes.map((q, i) => (
          <div key={i} className="rounded-xl p-5" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
            <p className="text-base italic leading-relaxed" style={{ color: 'var(--text-secondary)' }}>"{q.text}"</p>
            <p className="text-sm font-semibold mt-2" style={{ color: 'var(--accent-primary)' }}>— {q.author}</p>
          </div>
        ))}
      </section>

      {/* Core Values */}
      <section className="rounded-2xl p-6 md:p-8" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--accent-secondary)' }}>🏛️ Core Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: '🔒', title: 'Verified Identity', desc: 'Aadhaar-linked accounts ensure every petition and vote is from a real citizen.' },
            { icon: '📍', title: 'Location-Aware', desc: 'Petitions are mapped to actual districts and assembly constituencies for targeted action.' },
            { icon: '📊', title: 'Data-Driven', desc: 'Support counts and priority thresholds ensure the most pressing issues rise to the top.' },
            { icon: '⏰', title: 'Accountable', desc: 'SLA deadlines hold government departments responsible for timely resolutions.' },
          ].map(v => (
            <div key={v.title} className="p-4 rounded-xl" style={{ backgroundColor: 'var(--btn-ghost-bg)' }}>
              <p className="text-xl mb-1">{v.icon}</p>
              <h3 className="font-semibold text-sm mb-1">{v.title}</h3>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
