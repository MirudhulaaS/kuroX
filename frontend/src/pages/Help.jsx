export default function Help() {
  return (
    <div className="space-y-8 fade-in max-w-3xl mx-auto">
      {/* Hero */}
      <div className="text-center py-8">
        <h1 className="text-4xl font-extrabold mb-3"
            style={{ background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Help Center
        </h1>
        <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
          Everything you need to know about using kuroX
        </p>
      </div>

      {/* Getting Started */}
      <Section title="🚀 Getting Started">
        <Step num="1" title="Create an Account">
          Click <strong>"Login / Register"</strong> in the sidebar, then switch to <strong>"Sign Up"</strong> mode. 
          Fill in your username, full name, select your district & assembly constituency, enter your 
          <strong> 12-digit Aadhaar ID</strong> for verification, and set a password. All fields are mandatory.
        </Step>
        <Step num="2" title="Login">
          Already registered? Simply enter your username and password to access the platform.
        </Step>
      </Section>

      {/* Filing a Petition */}
      <Section title="📝 How to File a Petition">
        <Step num="1" title='Click "+ New Petition"'>
          The red button in the top-right header opens the petition form.
        </Step>
        <Step num="2" title="Select Location">
          Choose the <strong>Affected District</strong> first. The <strong>Assembly Constituency</strong> dropdown 
          will auto-filter to show only constituencies under that district. The <strong>current MLA</strong> and 
          their <strong>party</strong> will auto-display.
        </Step>
        <Step num="3" title="Select Subject">
          Choose a category — Road & Transport, Water & Sanitation, Education, Medical & Healthcare, 
          Electricity, Agriculture, Housing, Environment, Law & Order, Social Welfare, Employment, or Other.
        </Step>
        <Step num="4" title="Describe the Problem">
          Write a clear, detailed problem statement explaining the issue that needs government attention.
        </Step>
        <Step num="5" title="Review & Confirm (2FA)">
          Since petitions <strong>cannot be edited or deleted</strong> after publishing, you'll see a 
          full preview of your submission. Click <strong>"← Edit"</strong> to go back and make changes, 
          or <strong>"✓ Confirm & Publish"</strong> to submit permanently.
        </Step>
      </Section>

      {/* Understanding Buttons */}
      <Section title="🎛️ Button Guide">
        <div className="space-y-4">
          <ButtonGuide icon="✊" name="Support" desc="Show your support for a petition. Each user can only support once per petition. When a petition reaches 10,000 supports, it's marked Important. At 50,000 — Urgent." />
          <ButtonGuide icon="👎" name="Unsupport" desc="Disagree with a petition. A mandatory comment/reason is required to prevent misuse. This ensures only genuine disagreements are recorded." />
          <ButtonGuide icon="💬" name="Discuss" desc="Opens the inline discussion thread for that petition. You can post comments to debate, suggest, or add context." />
          <ButtonGuide icon="↗️" name="Share" desc="Copies the petition link to your clipboard so you can share it on social media or messaging apps." />
          <ButtonGuide icon="🔍" name="Filter (funnel icon)" desc="Opens the advanced filter panel. Search by keyword, district, subject, status, date range, or support/unsupport count range." />
          <ButtonGuide icon="☀️🌙🖥️" name="Theme Toggle" desc="Cycles between Light mode, Dark mode, and Auto mode (follows your system preference). Located next to the + New Petition button." />
        </div>
      </Section>

      {/* Priority System */}
      <Section title="📊 Priority & Escalation System">
        <div className="space-y-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
          <div className="rounded-xl p-4" style={{ backgroundColor: 'var(--btn-ghost-bg)' }}>
            <p className="font-bold mb-1">Normal (0 – 9,999 supports)</p>
            <p style={{ color: 'var(--text-muted)' }}>The petition is visible to all citizens and can gather support, comments, and shares. It remains in the standard feed.</p>
          </div>
          <div className="rounded-xl p-4" style={{ backgroundColor: 'var(--badge-important-bg)', border: '1px solid var(--badge-important-border)' }}>
            <p className="font-bold mb-1" style={{ color: 'var(--badge-important-text)' }}>⭐ Important (10,000+ supports)</p>
            <p style={{ color: 'var(--text-muted)' }}>The petition is automatically escalated. It appears in the "Important" tab and triggers department awareness notifications.</p>
          </div>
          <div className="rounded-xl p-4" style={{ backgroundColor: 'var(--badge-urgent-bg)', border: '1px solid var(--badge-urgent-border)' }}>
            <p className="font-bold mb-1" style={{ color: 'var(--badge-urgent-text)' }}>🚨 Urgent (50,000+ supports)</p>
            <p style={{ color: 'var(--text-muted)' }}>The petition enters the "Urgent" queue. Government departments are assigned with SLA deadlines. Failure to respond triggers escalation alerts.</p>
          </div>
        </div>
      </Section>

      {/* Status Tracking */}
      <Section title="📋 Petition Status Lifecycle">
        <div className="text-sm space-y-3" style={{ color: 'var(--text-secondary)' }}>
          <StatusCard color="#EAB308" label="Open" desc="Newly filed petition. Awaiting support accumulation and initial review by the platform." />
          <StatusCard color="#F97316" label="Under Verification" desc="The petition is being reviewed by admins to confirm legitimacy — checking if the issue is real, not a duplicate, and within government jurisdiction." />
          <StatusCard color="#3B82F6" label="In Progress" desc="A government department has been assigned and is actively working on resolution within SLA deadlines." />
          <StatusCard color="#22C55E" label="Resolved" desc="The issue has been addressed by the assigned department. Resolution details are published." />
          <StatusCard color="#6B7280" label="Closed" desc="The petition lifecycle is complete. No further action is required." />
        </div>
        <div className="flex flex-wrap items-center gap-2 mt-4 text-xs" style={{ color: 'var(--text-muted)' }}>
          <span className="font-bold" style={{ color: '#EAB308' }}>Open</span>
          <span>→</span>
          <span className="font-bold" style={{ color: '#F97316' }}>Under Verification</span>
          <span>→</span>
          <span className="font-bold" style={{ color: '#3B82F6' }}>In Progress</span>
          <span>→</span>
          <span className="font-bold" style={{ color: '#22C55E' }}>Resolved</span>
          <span>→</span>
          <span className="font-bold" style={{ color: '#6B7280' }}>Closed</span>
        </div>
      </Section>

      {/* FAQ */}
      <Section title="❓ Frequently Asked Questions">
        <FAQ q="Can I edit or delete my petition after publishing?" a="No. Petitions are permanent to maintain integrity. That's why a confirmation step (2FA) is required before publishing." />
        <FAQ q="Why do I need Aadhaar to register?" a="Aadhaar verification ensures one person = one account. This prevents fake accounts, bot-driven support, and manipulation of petition counts." />
        <FAQ q="Why is a reason required to unsupport?" a="To prevent random or malicious unsupporting. Every unsupport is logged with a reason, ensuring accountability." />
        <FAQ q="How are petitions assigned to departments?" a="Once a petition reaches Important or Urgent status, the admin assigns it to the relevant government department (e.g., Highway Dept for road issues)." />
        <FAQ q="What happens if a department doesn't respond?" a="SLA deadlines are enforced. If a department fails to act within the deadline, escalation alerts are triggered to higher authorities." />
      </Section>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="rounded-2xl p-6 md:p-8" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
      <h2 className="text-xl font-bold mb-5" style={{ color: 'var(--accent-primary)' }}>{title}</h2>
      {children}
    </section>
  );
}

function Step({ num, title, children }) {
  return (
    <div className="flex gap-4 items-start mb-4">
      <div className="w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-white text-xs font-bold"
           style={{ background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))' }}>
        {num}
      </div>
      <div>
        <h3 className="font-semibold text-sm mb-0.5">{title}</h3>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{children}</p>
      </div>
    </div>
  );
}

function ButtonGuide({ icon, name, desc }) {
  return (
    <div className="flex gap-3 items-start p-3 rounded-xl" style={{ backgroundColor: 'var(--btn-ghost-bg)' }}>
      <span className="text-xl shrink-0">{icon}</span>
      <div>
        <p className="text-sm font-semibold">{name}</p>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{desc}</p>
      </div>
    </div>
  );
}

function StatusCard({ color, label, desc }) {
  return (
    <div className="flex gap-3 items-start">
      <div className="w-3 h-3 rounded-full shrink-0 mt-1" style={{ backgroundColor: color }} />
      <div>
        <p className="font-semibold text-sm" style={{ color }}>{label}</p>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{desc}</p>
      </div>
    </div>
  );
}

function FAQ({ q, a }) {
  return (
    <div className="mb-4">
      <p className="text-sm font-semibold mb-1">{q}</p>
      <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{a}</p>
    </div>
  );
}
