"use client";
import { useState, useEffect } from "react";

const TEAL = "#0A8F8F";
const INK = "#0F1A2E";
const MINT = "#5CEACA";
const GRAY = "#5A6577";
const LIGHT_BG = "#F8F9FB";
const TEAL_LIGHT = "#E0F5F5";
const ACCENT = "#E8453C";
const PURPLE = "#6366F1";
const AMBER = "#D97706";
const GREEN = "#059669";

const CATEGORIES = ["All", "Grant", "Accelerator", "Pitch Competition"];
const STATUSES = ["Not Started", "Researching", "In Progress", "Submitted", "Accepted", "Rejected"];
const COUNTRIES = ["All", "US", "Canada", "UK", "Global"];

const SEED_OPPORTUNITIES = [
  // GRANTS
  { id: 1, name: "ACL Caregiver AI Challenge - Track 1", org: "Administration for Community Living", country: "US", category: "Grant", deadline: "2026-07-15", openDate: "2026-03-01", fundingAmount: 50000, fundingDisplay: "Up to $50K per phase", url: "https://acl.gov", appStatus: "Submitted", notes: "Track 1: AI Tools for Caregivers. TRL 3+ required. Multiple phases with increasing prizes." },
  { id: 2, name: "ACL Caregiver AI Challenge - Track 2", org: "Administration for Community Living", country: "US", category: "Grant", deadline: "2026-07-15", openDate: "2026-03-01", fundingAmount: 50000, fundingDisplay: "Up to $50K per phase", url: "https://acl.gov", appStatus: "Submitted", notes: "Track 2: AI for Extending Workforce. For organizations, agencies, co-ops." },
  { id: 3, name: "SBIR/STTR Phase I - NIH", org: "National Institutes of Health", country: "US", category: "Grant", deadline: "2026-09-05", openDate: "Rolling", fundingAmount: 275000, fundingDisplay: "Up to $275K", url: "https://seed.nih.gov/small-business-funding", appStatus: "Not Started", notes: "Small business innovation research. Health IT and aging topics eligible. 6-month award." },
  { id: 4, name: "NSF SBIR Phase I", org: "National Science Foundation", country: "US", category: "Grant", deadline: "2026-06-15", openDate: "Rolling", fundingAmount: 275000, fundingDisplay: "Up to $275K", url: "https://seedfund.nsf.gov", appStatus: "Not Started", notes: "AI/ML innovations. Smart Health and Biomedical track. Must be US small business." },
  { id: 5, name: "Duke I&E Melissa & Doug Grant", org: "Duke Innovation & Entrepreneurship", country: "US", category: "Grant", deadline: "Rolling", openDate: "Rolling", fundingAmount: 10000, fundingDisplay: "Up to $10K", url: "https://entrepreneurship.duke.edu", appStatus: "Accepted", notes: "Already received $11K. May be eligible for additional rounds." },
  { id: 6, name: "Caregiver Action Network Innovation Fund", org: "Caregiver Action Network", country: "US", category: "Grant", deadline: "TBA", openDate: "TBA", fundingAmount: 25000, fundingDisplay: "Up to $25K", url: "https://caregiveraction.org", appStatus: "Researching", notes: "Supports innovations that reduce caregiver burden. Check for 2026 cycle." },
  { id: 7, name: "AHRQ Digital Healthcare Research", org: "Agency for Healthcare Research and Quality", country: "US", category: "Grant", deadline: "2026-10-01", openDate: "2026-04-01", fundingAmount: 300000, fundingDisplay: "Up to $300K", url: "https://ahrq.gov/funding", appStatus: "Not Started", notes: "Digital health solutions for care coordination. Federal grant." },
  { id: 8, name: "Innovate UK Smart Grants", org: "Innovate UK", country: "UK", category: "Grant", deadline: "Rolling (quarterly)", openDate: "Rolling", fundingAmount: 375000, fundingDisplay: "£25K-£500K", url: "https://apply-for-innovation-funding.service.gov.uk", appStatus: "Not Started", notes: "Game-changing innovations. Must have UK entity or partner." },
  { id: 9, name: "Canada Digital Technology Supercluster", org: "Digital Technology Supercluster", country: "Canada", category: "Grant", deadline: "TBA", openDate: "TBA", fundingAmount: 200000, fundingDisplay: "Up to $200K CAD", url: "https://digitalsupercluster.ca", appStatus: "Not Started", notes: "Health and life sciences projects. Must have Canadian partner." },
  { id: 10, name: "FedDev Ontario Innovation Fund", org: "Federal Economic Dev. Agency", country: "Canada", category: "Grant", deadline: "Rolling", openDate: "Rolling", fundingAmount: 500000, fundingDisplay: "Up to $500K CAD", url: "https://feddevontario.gc.ca", appStatus: "Not Started", notes: "Innovative businesses in southern Ontario. Requires Canadian operations." },
  { id: 11, name: "Aging2.0 Alliance Grant", org: "Aging2.0", country: "US/Global", category: "Grant", deadline: "TBA", openDate: "TBA", fundingAmount: 20000, fundingDisplay: "$10K-$20K", url: "https://aging2.com", appStatus: "Not Started", notes: "AgeTech startups. Global network of 50+ chapters. Pilot partnerships." },

  // ACCELERATORS
  { id: 12, name: "Y Combinator", org: "Y Combinator", country: "US", category: "Accelerator", deadline: "Rolling batches", openDate: "Rolling", fundingAmount: 500000, fundingDisplay: "$500K (standard deal)", url: "https://ycombinator.com/apply", appStatus: "Not Started", notes: "Top accelerator. 7% equity. Remote-friendly. 3-month program." },
  { id: 13, name: "Techstars Future of Health", org: "Techstars + Cedars-Sinai", country: "US", category: "Accelerator", deadline: "Rolling", openDate: "Rolling", fundingAmount: 120000, fundingDisplay: "$120K", url: "https://techstars.com", appStatus: "Not Started", notes: "Healthcare-focused. 13-week program. 6% equity. LA-based." },
  { id: 14, name: "Google for Startups Accelerator: Health", org: "Google", country: "US", category: "Accelerator", deadline: "TBA", openDate: "TBA", fundingAmount: 0, fundingDisplay: "Equity-free (Cloud credits + mentorship)", url: "https://startup.google.com", appStatus: "Researching", notes: "AI/ML health startups. No equity taken. Google Cloud credits." },
  { id: 15, name: "Microsoft for Startups (Founders Hub)", org: "Microsoft", country: "US/Global", category: "Accelerator", deadline: "Rolling", openDate: "Rolling", fundingAmount: 150000, fundingDisplay: "Up to $150K Azure credits", url: "https://startups.microsoft.com", appStatus: "Not Started", notes: "Azure credits, technical support, co-sell opportunities. No equity." },
  { id: 16, name: "AARP Innovation Labs", org: "AARP", country: "US", category: "Accelerator", deadline: "TBA", openDate: "TBA", fundingAmount: 0, fundingDisplay: "Pilot access (38M+ members)", url: "https://aarpinnovationlabs.org", appStatus: "Researching", notes: "AgeTech focused. Access to massive user base for pilots." },
  { id: 17, name: "Plug and Play Health", org: "Plug and Play Tech Center", country: "US", category: "Accelerator", deadline: "Rolling", openDate: "Rolling", fundingAmount: 50000, fundingDisplay: "Investment + corporate pilots", url: "https://pnptc.com/health", appStatus: "Not Started", notes: "Corporate partnerships with health systems. Silicon Valley. No equity for program." },
  { id: 18, name: "MassChallenge HealthTech", org: "MassChallenge", country: "US", category: "Accelerator", deadline: "TBA (typically spring)", openDate: "TBA", fundingAmount: 100000, fundingDisplay: "Up to $100K (equity-free)", url: "https://masschallenge.org/programs/healthtech", appStatus: "Not Started", notes: "Zero equity taken. Boston-based. Cash awards to winners." },
  { id: 19, name: "Dreamit Health", org: "Dreamit Ventures", country: "US", category: "Accelerator", deadline: "Rolling", openDate: "Rolling", fundingAmount: 50000, fundingDisplay: "Investment + network", url: "https://dreamit.com/health", appStatus: "Not Started", notes: "Revenue-stage health startups. Philadelphia/NYC. Health system partnerships." },
  { id: 20, name: "Creative Destruction Lab - Health", org: "CDL", country: "Canada", category: "Accelerator", deadline: "TBA (typically fall)", openDate: "TBA", fundingAmount: 0, fundingDisplay: "Mentorship + investor access", url: "https://creativedestructionlab.com/streams/health", appStatus: "Not Started", notes: "Objective-based program. Toronto. No equity for program itself." },
  { id: 21, name: "DMZ (Toronto Metropolitan)", org: "DMZ", country: "Canada", category: "Accelerator", deadline: "Rolling", openDate: "Rolling", fundingAmount: 0, fundingDisplay: "Equity-free support", url: "https://dmz.torontomu.ca", appStatus: "Not Started", notes: "Top-ranked university accelerator globally. No equity taken." },
  { id: 22, name: "Bethnal Green Ventures", org: "BGV", country: "UK", category: "Accelerator", deadline: "TBA (biannual)", openDate: "TBA", fundingAmount: 37500, fundingDisplay: "£30K for 6% equity", url: "https://bethnalgreenventures.com", appStatus: "Not Started", notes: "Tech for good. Social impact focus. London." },
  { id: 23, name: "NHS Clinical Entrepreneur Programme", org: "NHS England", country: "UK", category: "Accelerator", deadline: "TBA (annual)", openDate: "TBA", fundingAmount: 0, fundingDisplay: "NHS network + pilot access", url: "https://nhscep.com", appStatus: "Not Started", notes: "Healthcare innovation within NHS. Massive distribution potential." },
  { id: 24, name: "Hatch Enterprise", org: "Hatch", country: "UK", category: "Accelerator", deadline: "Rolling", openDate: "Rolling", fundingAmount: 10000, fundingDisplay: "Grants + mentorship", url: "https://hatchenterprise.co.uk", appStatus: "Not Started", notes: "Underrepresented founders. London-based. Free programs." },
  { id: 25, name: "Health Foundry", org: "Guy's & St Thomas' NHS", country: "UK", category: "Accelerator", deadline: "TBA", openDate: "TBA", fundingAmount: 0, fundingDisplay: "Workspace + NHS access", url: "https://healthfoundry.org", appStatus: "Not Started", notes: "London-based health tech hub. NHS integration pathway." },

  // PITCH COMPETITIONS
  { id: 26, name: "Red Bull Basement 2026", org: "Red Bull", country: "Global", category: "Pitch Competition", deadline: "2026-08-01", openDate: "2026-05-01", fundingAmount: 0, fundingDisplay: "Mentorship + global stage", url: "https://redbullbasement.com", appStatus: "In Progress", notes: "Student-focused. Technology for positive change. Global finals." },
  { id: 27, name: "Texas A&M AI Venture Velocity", org: "Texas A&M University", country: "US", category: "Pitch Competition", deadline: "2026-06-30", openDate: "2026-04-01", fundingAmount: 100000, fundingDisplay: "Up to $100K non-dilutive", url: "https://mays.tamu.edu", appStatus: "Submitted", notes: "AI ventures. Venture snapshot format. Top 12 to campus." },
  { id: 28, name: "HLTH USA 2026 Startup Pitch", org: "HLTH", country: "US", category: "Pitch Competition", deadline: "TBA (Event: Nov 2026)", openDate: "TBA", fundingAmount: 25000, fundingDisplay: "$25,000", url: "https://hlth.com", appStatus: "Not Started", notes: "Healthcare startups <5 years old, <$8M raised. AgeTech track." },
  { id: 29, name: "TechCrunch Disrupt Startup Battlefield", org: "TechCrunch", country: "US", category: "Pitch Competition", deadline: "TBA (Event: Oct 2026)", openDate: "TBA", fundingAmount: 100000, fundingDisplay: "$100,000", url: "https://techcrunch.com/events/disrupt-2026", appStatus: "Not Started", notes: "All stages welcome. Massive visibility. San Francisco." },
  { id: 30, name: "ViVE 2026 AgeTech Pitch", org: "ViVE", country: "US", category: "Pitch Competition", deadline: "TBA", openDate: "TBA", fundingAmount: 0, fundingDisplay: "Visibility + passes", url: "https://viveevent.com", appStatus: "Not Started", notes: "AgeTech and digital health. MVP preferred. 5-min pitch." },
  { id: 31, name: "Xcelerate WHX Tech Startup Competition", org: "World Health Expo", country: "UK/Global", category: "Pitch Competition", deadline: "2026-08-01", openDate: "2026-04-01", fundingAmount: 10000, fundingDisplay: "Sponsorship package ~$10K", url: "https://worldhealthexpo.com", appStatus: "Not Started", notes: "International healthcare startups. Top 12 compete September." },
  { id: 32, name: "Rice Business Plan Competition", org: "Rice University", country: "US", category: "Pitch Competition", deadline: "TBA (Event: Spring 2027)", openDate: "TBA", fundingAmount: 350000, fundingDisplay: "Up to $350K in prizes", url: "https://rbpc.rice.edu", appStatus: "Not Started", notes: "World's largest student startup competition. Graduate teams." },
  { id: 33, name: "Duke Startup Challenge", org: "Duke I&E", country: "US", category: "Pitch Competition", deadline: "TBA (Spring 2027)", openDate: "TBA", fundingAmount: 50000, fundingDisplay: "Up to $50K", url: "https://entrepreneurship.duke.edu", appStatus: "Researching", notes: "Duke student ventures. Multiple tracks. Local advantage." },
  { id: 34, name: "Cartier Women's Initiative", org: "Cartier", country: "Global", category: "Pitch Competition", deadline: "TBA (typically June)", openDate: "TBA", fundingAmount: 100000, fundingDisplay: "$100K per winner", url: "https://cartierwomensinitiative.com", appStatus: "Not Started", notes: "Women-led social impact. Would need female co-founder eligibility." },
  { id: 35, name: "MIT Solve Global Challenges", org: "MIT", country: "US/Global", category: "Pitch Competition", deadline: "TBA", openDate: "TBA", fundingAmount: 50000, fundingDisplay: "Up to $50K", url: "https://solve.mit.edu", appStatus: "Not Started", notes: "Health Security & Pandemics track. Social enterprises." },
  { id: 36, name: "Aging Innovation Challenge", org: "Leading Age / CAST", country: "US", category: "Pitch Competition", deadline: "TBA", openDate: "TBA", fundingAmount: 10000, fundingDisplay: "$10K + pilot partners", url: "https://leadingage.org", appStatus: "Researching", notes: "AgeTech specific. Access to senior living communities." },
];

function getStatusColor(status) {
  const map = { "Not Started": GRAY, "Researching": AMBER, "In Progress": "#2563EB", "Submitted": PURPLE, "Accepted": GREEN, "Rejected": ACCENT };
  return map[status] || GRAY;
}

function getCategoryColor(cat) {
  const map = { "Grant": "#059669", "Accelerator": "#6366F1", "Pitch Competition": "#D97706" };
  return map[cat] || GRAY;
}

function getCategoryIcon(cat) {
  const map = { "Grant": "💰", "Accelerator": "🚀", "Pitch Competition": "🏆" };
  return map[cat] || "📋";
}

function Badge({ text, color }) {
  return (
    <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 10, background: color + "15", color, whiteSpace: "nowrap" }}>
      {text}
    </span>
  );
}

function formatDeadline(d) {
  if (!d || d === "TBA" || d.startsWith("TBA") || d === "Rolling" || d.startsWith("Rolling")) return d;
  try {
    const date = new Date(d + "T00:00:00");
    const now = new Date();
    const diff = Math.ceil((date - now) / (1000 * 60 * 60 * 24));
    const formatted = date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    if (diff < 0) return `${formatted} (Passed)`;
    if (diff <= 14) return `${formatted} (${diff}d left!)`;
    if (diff <= 30) return `${formatted} (${diff}d left)`;
    return formatted;
  } catch { return d; }
}

function isUrgent(d) {
  if (!d || d === "TBA" || d === "Rolling") return false;
  try {
    const diff = Math.ceil((new Date(d + "T00:00:00") - new Date()) / (1000 * 60 * 60 * 24));
    return diff >= 0 && diff <= 30;
  } catch { return false; }
}

function exportToCSV(data) {
  const headers = ["Name", "Organization", "Country", "Category", "Deadline", "Open Date", "Funding Amount", "Funding Display", "Application Status", "URL", "Notes"];
  const rows = data.map(d => [d.name, d.org, d.country, d.category, d.deadline, d.openDate, d.fundingAmount, d.fundingDisplay, d.appStatus, d.url, d.notes]);
  const csv = [headers.join(","), ...rows.map(r => r.map(c => `"${String(c || "").replace(/"/g, '""')}"`).join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "optimavia_opportunities.csv"; a.click();
}

export default function App() {
  const [opportunities, setOpportunities] = useState(SEED_OPPORTUNITIES);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [countryFilter, setCountryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("deadline");
  const [editingId, setEditingId] = useState(null);
  const [searching, setSearching] = useState(false);
  const [aiQuery, setAiQuery] = useState("");
  const [aiResults, setAiResults] = useState(null);
  const [view, setView] = useState("table");

  const filtered = opportunities.filter(o => {
    const matchesSearch = !search || [o.name, o.org, o.notes, o.country].some(v => (v || "").toLowerCase().includes(search.toLowerCase()));
    const matchesCat = catFilter === "All" || o.category === catFilter;
    const matchesCountry = countryFilter === "All" || (o.country || "").includes(countryFilter);
    const matchesStatus = statusFilter === "All" || o.appStatus === statusFilter;
    return matchesSearch && matchesCat && matchesCountry && matchesStatus;
  }).sort((a, b) => {
    if (sortBy === "deadline") {
      const aD = a.deadline && !a.deadline.startsWith("T") && !a.deadline.startsWith("R") ? new Date(a.deadline) : new Date("2099-01-01");
      const bD = b.deadline && !b.deadline.startsWith("T") && !b.deadline.startsWith("R") ? new Date(b.deadline) : new Date("2099-01-01");
      return aD - bD;
    }
    if (sortBy === "funding") return (b.fundingAmount || 0) - (a.fundingAmount || 0);
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return 0;
  });

  const stats = {
    total: opportunities.length,
    grants: opportunities.filter(o => o.category === "Grant").length,
    accelerators: opportunities.filter(o => o.category === "Accelerator").length,
    competitions: opportunities.filter(o => o.category === "Pitch Competition").length,
    submitted: opportunities.filter(o => o.appStatus === "Submitted").length,
    inProgress: opportunities.filter(o => o.appStatus === "In Progress").length,
    urgent: opportunities.filter(o => isUrgent(o.deadline)).length,
    totalFunding: opportunities.reduce((sum, o) => sum + (o.fundingAmount || 0), 0),
  };

  function updateStatus(id, newStatus) {
    setOpportunities(prev => prev.map(o => o.id === id ? { ...o, appStatus: newStatus } : o));
    setEditingId(null);
  }

  async function aiSearch() {
    if (!aiQuery.trim()) return;
    setSearching(true);
    setAiResults(null);
    try {
      const systemPrompt = "You are a research assistant. After searching, respond with ONLY a valid JSON array. No explanation, no markdown, no preamble. Just the raw JSON array.";
      const prompt = `Search the web for ${aiQuery}. These should be relevant to a healthcare AI startup building caregiver scheduling software for home care agencies. Return ONLY a JSON array with keys: name, org, country, category (must be "Grant", "Accelerator", or "Pitch Competition"), deadline, openDate, fundingAmount (number), fundingDisplay (string), url, notes. Return 5-10 results.`;
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 2000, system: systemPrompt, tools: [{ type: "web_search_20250305", name: "web_search" }], messages: [{ role: "user", content: prompt }] })
      });
      const data = await response.json();
      let allText = "";
      for (const block of (data.content || [])) {
        if (block.type === "text") allText += block.text + "\n";
        if (block.type === "mcp_tool_result" && block.content) for (const sub of block.content) if (sub.text) allText += sub.text + "\n";
      }
      let clean = allText.replace(/```json|```/g, "").trim();
      let parsed = null;
      try { parsed = JSON.parse(clean); } catch {}
      if (!parsed) { const m = clean.match(/\[[\s\S]*\]/); if (m) try { parsed = JSON.parse(m[0]); } catch {} }
      if (!parsed) {
        const r2 = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1500,
            messages: [{ role: "user", content: `Extract structured data from this text. Return ONLY a valid JSON array. Each item: {"name":"","org":"","country":"","category":"Grant","deadline":"","openDate":"","fundingAmount":0,"fundingDisplay":"","url":"","notes":""}. Text:\n${clean.substring(0, 2500)}` }] })
        });
        const d2 = await r2.json();
        const t2 = d2.content?.filter(b => b.type === "text").map(b => b.text).join("").replace(/```json|```/g, "").trim();
        const m2 = t2.match(/\[[\s\S]*\]/);
        if (m2) try { parsed = JSON.parse(m2[0]); } catch {}
      }
      if (parsed && Array.isArray(parsed)) setAiResults(parsed.map(r => ({ ...r, appStatus: "Not Started", fundingAmount: r.fundingAmount || 0 })));
      else setAiResults(null);
    } catch {}
    setSearching(false);
  }

  function addAiResults() {
    if (!aiResults) return;
    const existing = new Set(opportunities.map(o => o.name.toLowerCase()));
    const newItems = aiResults.filter(r => r.name && !existing.has(r.name.toLowerCase())).map((r, i) => ({ ...r, id: Date.now() + i }));
    setOpportunities(prev => [...prev, ...newItems]);
    setAiResults(null);
    setAiQuery("");
  }

  const cardStyle = (bg, border) => ({ background: bg, borderLeft: `4px solid ${border}`, borderRadius: 8, padding: "12px 16px", flex: 1, minWidth: 120 });

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#F0F2F5", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ background: INK, padding: "16px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 20, color: MINT, fontWeight: 800 }}>OptimaVia Opportunity Finder</h1>
            <p style={{ margin: "2px 0 0", fontSize: 12, color: GRAY }}>Grants · Accelerators · Pitch Competitions</p>
          </div>
          <button onClick={() => exportToCSV(filtered)} style={{ padding: "6px 14px", fontSize: 12, fontWeight: 600, background: "transparent", color: MINT, border: `1px solid ${MINT}`, borderRadius: 6, cursor: "pointer" }}>
            Export CSV ({filtered.length})
          </button>
        </div>
      </div>

      <div style={{ padding: "16px 24px" }}>
        {/* Stats Cards */}
        <div style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
          <div style={cardStyle("#fff", TEAL)}>
            <div style={{ fontSize: 22, fontWeight: 800, color: TEAL }}>{stats.total}</div>
            <div style={{ fontSize: 11, color: GRAY }}>Total Opportunities</div>
          </div>
          <div style={cardStyle("#fff", GREEN)}>
            <div style={{ fontSize: 22, fontWeight: 800, color: GREEN }}>💰 {stats.grants}</div>
            <div style={{ fontSize: 11, color: GRAY }}>Grants</div>
          </div>
          <div style={cardStyle("#fff", PURPLE)}>
            <div style={{ fontSize: 22, fontWeight: 800, color: PURPLE }}>🚀 {stats.accelerators}</div>
            <div style={{ fontSize: 11, color: GRAY }}>Accelerators</div>
          </div>
          <div style={cardStyle("#fff", AMBER)}>
            <div style={{ fontSize: 22, fontWeight: 800, color: AMBER }}>🏆 {stats.competitions}</div>
            <div style={{ fontSize: 11, color: GRAY }}>Competitions</div>
          </div>
          <div style={cardStyle("#fff", PURPLE)}>
            <div style={{ fontSize: 22, fontWeight: 800, color: PURPLE }}>{stats.submitted}</div>
            <div style={{ fontSize: 11, color: GRAY }}>Submitted</div>
          </div>
          <div style={cardStyle("#fff", ACCENT)}>
            <div style={{ fontSize: 22, fontWeight: 800, color: ACCENT }}>{stats.urgent}</div>
            <div style={{ fontSize: 11, color: GRAY }}>Due in 30 days</div>
          </div>
          <div style={cardStyle("#fff", TEAL)}>
            <div style={{ fontSize: 22, fontWeight: 800, color: TEAL }}>${(stats.totalFunding / 1000).toFixed(0)}K</div>
            <div style={{ fontSize: 11, color: GRAY }}>Total Available</div>
          </div>
        </div>

        {/* AI Search */}
        <div style={{ background: "#fff", borderRadius: 10, padding: 14, marginBottom: 12, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <p style={{ margin: "0 0 6px", fontSize: 12, fontWeight: 700, color: INK }}>🔍 AI-Powered Search</p>
          <div style={{ display: "flex", gap: 8 }}>
            <input value={aiQuery} onChange={e => setAiQuery(e.target.value)} onKeyDown={e => e.key === "Enter" && aiSearch()}
              placeholder='e.g. "healthcare AI grants 2026" or "AgeTech accelerators UK"'
              style={{ flex: 1, padding: "8px 12px", fontSize: 13, border: "1px solid #D4D9E2", borderRadius: 6, outline: "none" }} />
            <button onClick={aiSearch} disabled={searching}
              style={{ padding: "8px 18px", fontSize: 13, fontWeight: 700, background: TEAL, color: "#fff", border: "none", borderRadius: 6, cursor: searching ? "wait" : "pointer", opacity: searching ? 0.7 : 1 }}>
              {searching ? "Searching..." : "Search"}
            </button>
          </div>
          {aiResults && (
            <div style={{ marginTop: 10, padding: 10, background: TEAL_LIGHT, borderRadius: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: TEAL }}>Found {aiResults.length} results</span>
                <button onClick={addAiResults} style={{ padding: "4px 12px", fontSize: 11, fontWeight: 700, background: TEAL, color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }}>+ Add All</button>
              </div>
              {aiResults.map((r, i) => (
                <div key={i} style={{ fontSize: 12, padding: "3px 0", borderBottom: "1px solid #cde8e8" }}>
                  <strong>{r.name}</strong> — {r.org} ({r.country}) {r.fundingDisplay && `· ${r.fundingDisplay}`}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap", alignItems: "center" }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Filter..."
            style={{ padding: "6px 12px", fontSize: 12, border: "1px solid #D4D9E2", borderRadius: 6, width: 160, outline: "none" }} />
          {[["Category", catFilter, setCatFilter, CATEGORIES], ["Country", countryFilter, setCountryFilter, COUNTRIES]].map(([label, val, setter, opts]) => (
            <select key={label} value={val} onChange={e => setter(e.target.value)}
              style={{ padding: "6px 8px", fontSize: 12, border: "1px solid #D4D9E2", borderRadius: 6, outline: "none" }}>
              {opts.map(o => <option key={o} value={o}>{o === "All" ? `All ${label}` : o}</option>)}
            </select>
          ))}
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
            style={{ padding: "6px 8px", fontSize: 12, border: "1px solid #D4D9E2", borderRadius: 6, outline: "none" }}>
            <option value="All">All Statuses</option>
            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}
            style={{ padding: "6px 8px", fontSize: 12, border: "1px solid #D4D9E2", borderRadius: 6, outline: "none" }}>
            <option value="deadline">Sort: Deadline</option>
            <option value="funding">Sort: Funding ↓</option>
            <option value="name">Sort: Name</option>
          </select>
          <span style={{ fontSize: 11, color: GRAY, marginLeft: 4 }}>{filtered.length} results</span>
        </div>

        {/* Table */}
        <div style={{ background: "#fff", borderRadius: 10, overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead>
                <tr style={{ background: INK }}>
                  {["Category", "Opportunity", "Organization", "Country", "Deadline", "Funding", "Status", "Notes"].map(h => (
                    <th key={h} style={{ padding: "9px 10px", textAlign: "left", color: "#fff", fontWeight: 700, fontSize: 10.5, textTransform: "uppercase", letterSpacing: 0.5, whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((o, i) => (
                  <tr key={o.id || i} style={{ borderBottom: "1px solid #F0F2F5", background: isUrgent(o.deadline) ? "#FEF3C7" : i % 2 === 0 ? "#fff" : LIGHT_BG }}>
                    <td style={{ padding: "8px 10px" }}>
                      <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 10, background: getCategoryColor(o.category) + "15", color: getCategoryColor(o.category) }}>
                        {getCategoryIcon(o.category)} {o.category}
                      </span>
                    </td>
                    <td style={{ padding: "8px 10px", fontWeight: 600, maxWidth: 220 }}>
                      {o.url ? <a href={o.url.startsWith("http") ? o.url : `https://${o.url}`} target="_blank" rel="noopener noreferrer" style={{ color: TEAL, textDecoration: "none" }}>{o.name}</a> : o.name}
                    </td>
                    <td style={{ padding: "8px 10px", color: INK }}>{o.org}</td>
                    <td style={{ padding: "8px 10px", color: GRAY }}>{o.country}</td>
                    <td style={{ padding: "8px 10px", whiteSpace: "nowrap", fontWeight: isUrgent(o.deadline) ? 700 : 400, color: isUrgent(o.deadline) ? ACCENT : INK }}>
                      {formatDeadline(o.deadline)}
                    </td>
                    <td style={{ padding: "8px 10px", color: INK, fontWeight: 600, whiteSpace: "nowrap" }}>{o.fundingDisplay || "—"}</td>
                    <td style={{ padding: "8px 10px" }}>
                      {editingId === o.id ? (
                        <select autoFocus value={o.appStatus} onChange={e => updateStatus(o.id, e.target.value)} onBlur={() => setEditingId(null)}
                          style={{ fontSize: 11, padding: "2px 4px", borderRadius: 6, border: "1px solid #D4D9E2" }}>
                          {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      ) : (
                        <span onClick={() => setEditingId(o.id)} style={{ cursor: "pointer" }} title="Click to change status">
                          <Badge text={o.appStatus} color={getStatusColor(o.appStatus)} />
                        </span>
                      )}
                    </td>
                    <td style={{ padding: "8px 10px", color: GRAY, fontSize: 11, maxWidth: 250 }}>{o.notes}</td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={8} style={{ padding: 32, textAlign: "center", color: GRAY }}>No opportunities match your filters.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <p style={{ fontSize: 10, color: GRAY, textAlign: "center", margin: "12px 0 0" }}>
          Click any status badge to update · Urgent deadlines highlighted in yellow · Use AI Search to discover more opportunities
        </p>
      </div>
    </div>
  );
}
