"use client";
import { useState, useEffect } from "react";

const SUPA_URL = "https://wberijojmlbldbasubqp.supabase.co";
const SUPA_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndiZXJpam9qbWxibGRiYXN1YnFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwNTY1NjUsImV4cCI6MjA5NTYzMjU2NX0._ut_9gUtLz5YESEfEuf6E2bSOkuTUomhub5XRYE-HhM";
const HEADERS = { apikey: SUPA_KEY, Authorization: `Bearer ${SUPA_KEY}`, "Content-Type": "application/json" };

const TEAL = "#0A8F8F", INK = "#0F1A2E", MINT = "#5CEACA", GRAY = "#5A6577", LIGHT_BG = "#F8F9FB", TEAL_LIGHT = "#E0F5F5", ACCENT = "#E8453C", PURPLE = "#6366F1", AMBER = "#D97706", GREEN = "#059669";
const CATEGORIES = ["All", "Grant", "Accelerator", "Pitch Competition"];
const STATUSES = ["Not Started", "Researching", "In Progress", "Submitted", "Accepted", "Rejected"];
const COUNTRIES = ["All", "US", "Canada", "UK", "Global"];
const SIZES = ["All", "SMB", "Mid-Size", "Enterprise"];
const OUTREACH_STATUSES = ["Not Started", "Researching", "Email Sent", "Call Scheduled", "In Conversation", "Pilot Agreed", "Not Interested"];

// Seed data
const SEED_OPPS = [
  { name: "ACL Caregiver AI Challenge - Track 1", org: "Administration for Community Living", country: "US", category: "Grant", deadline: "2026-07-15", open_date: "2026-03-01", funding_amount: 50000, funding_display: "Up to $50K per phase", url: "https://acl.gov", app_status: "Submitted", notes: "Track 1: AI Tools for Caregivers. TRL 3+ required." },
  { name: "ACL Caregiver AI Challenge - Track 2", org: "Administration for Community Living", country: "US", category: "Grant", deadline: "2026-07-15", open_date: "2026-03-01", funding_amount: 50000, funding_display: "Up to $50K per phase", url: "https://acl.gov", app_status: "Submitted", notes: "Track 2: AI for Extending Workforce." },
  { name: "SBIR/STTR Phase I - NIH", org: "National Institutes of Health", country: "US", category: "Grant", deadline: "2026-09-05", open_date: "Rolling", funding_amount: 275000, funding_display: "Up to $275K", url: "https://seed.nih.gov/small-business-funding", app_status: "Not Started", notes: "Health IT and aging topics eligible." },
  { name: "NSF SBIR Phase I", org: "National Science Foundation", country: "US", category: "Grant", deadline: "2026-06-15", open_date: "Rolling", funding_amount: 275000, funding_display: "Up to $275K", url: "https://seedfund.nsf.gov", app_status: "Not Started", notes: "AI/ML innovations. Smart Health track." },
  { name: "Duke I&E Melissa & Doug Grant", org: "Duke Innovation & Entrepreneurship", country: "US", category: "Grant", deadline: "Rolling", open_date: "Rolling", funding_amount: 10000, funding_display: "Up to $10K", url: "https://entrepreneurship.duke.edu", app_status: "Accepted", notes: "Already received $11K." },
  { name: "Caregiver Action Network Fund", org: "Caregiver Action Network", country: "US", category: "Grant", deadline: "TBA", open_date: "TBA", funding_amount: 25000, funding_display: "Up to $25K", url: "https://caregiveraction.org", app_status: "Researching", notes: "Reduces caregiver burden." },
  { name: "AHRQ Digital Healthcare Research", org: "AHRQ", country: "US", category: "Grant", deadline: "2026-10-01", open_date: "2026-04-01", funding_amount: 300000, funding_display: "Up to $300K", url: "https://ahrq.gov/funding", app_status: "Not Started", notes: "Digital health for care coordination." },
  { name: "Innovate UK Smart Grants", org: "Innovate UK", country: "UK", category: "Grant", deadline: "Rolling (quarterly)", open_date: "Rolling", funding_amount: 375000, funding_display: "£25K-£500K", url: "https://apply-for-innovation-funding.service.gov.uk", app_status: "Not Started", notes: "Must have UK entity or partner." },
  { name: "Canada Digital Technology Supercluster", org: "Digital Technology Supercluster", country: "Canada", category: "Grant", deadline: "TBA", open_date: "TBA", funding_amount: 200000, funding_display: "Up to $200K CAD", url: "https://digitalsupercluster.ca", app_status: "Not Started", notes: "Must have Canadian partner." },
  { name: "FedDev Ontario Innovation Fund", org: "Federal Economic Dev. Agency", country: "Canada", category: "Grant", deadline: "Rolling", open_date: "Rolling", funding_amount: 500000, funding_display: "Up to $500K CAD", url: "https://feddevontario.gc.ca", app_status: "Not Started", notes: "Requires Canadian operations." },
  { name: "Aging2.0 Alliance Grant", org: "Aging2.0", country: "US/Global", category: "Grant", deadline: "TBA", open_date: "TBA", funding_amount: 20000, funding_display: "$10K-$20K", url: "https://aging2.com", app_status: "Not Started", notes: "AgeTech startups." },
  { name: "Y Combinator", org: "Y Combinator", country: "US", category: "Accelerator", deadline: "Rolling batches", open_date: "Rolling", funding_amount: 500000, funding_display: "$500K (standard deal)", url: "https://ycombinator.com/apply", app_status: "Not Started", notes: "7% equity. 3-month program." },
  { name: "Techstars Future of Health", org: "Techstars + Cedars-Sinai", country: "US", category: "Accelerator", deadline: "Rolling", open_date: "Rolling", funding_amount: 120000, funding_display: "$120K", url: "https://techstars.com", app_status: "Not Started", notes: "13-week program. 6% equity." },
  { name: "Google for Startups: Health", org: "Google", country: "US", category: "Accelerator", deadline: "TBA", open_date: "TBA", funding_amount: 0, funding_display: "Equity-free (Cloud credits)", url: "https://startup.google.com", app_status: "Researching", notes: "No equity taken." },
  { name: "Microsoft for Startups", org: "Microsoft", country: "US/Global", category: "Accelerator", deadline: "Rolling", open_date: "Rolling", funding_amount: 150000, funding_display: "Up to $150K Azure credits", url: "https://startups.microsoft.com", app_status: "Not Started", notes: "No equity." },
  { name: "AARP Innovation Labs", org: "AARP", country: "US", category: "Accelerator", deadline: "TBA", open_date: "TBA", funding_amount: 0, funding_display: "Pilot access (38M+ members)", url: "https://aarpinnovationlabs.org", app_status: "Researching", notes: "AgeTech focused." },
  { name: "Plug and Play Health", org: "Plug and Play", country: "US", category: "Accelerator", deadline: "Rolling", open_date: "Rolling", funding_amount: 50000, funding_display: "Investment + pilots", url: "https://pnptc.com/health", app_status: "Not Started", notes: "Corporate partnerships." },
  { name: "MassChallenge HealthTech", org: "MassChallenge", country: "US", category: "Accelerator", deadline: "TBA", open_date: "TBA", funding_amount: 100000, funding_display: "Up to $100K (equity-free)", url: "https://masschallenge.org/programs/healthtech", app_status: "Not Started", notes: "Zero equity taken." },
  { name: "Dreamit Health", org: "Dreamit Ventures", country: "US", category: "Accelerator", deadline: "Rolling", open_date: "Rolling", funding_amount: 50000, funding_display: "Investment + network", url: "https://dreamit.com/health", app_status: "Not Started", notes: "Revenue-stage startups." },
  { name: "Creative Destruction Lab", org: "CDL", country: "Canada", category: "Accelerator", deadline: "TBA", open_date: "TBA", funding_amount: 0, funding_display: "Mentorship + investors", url: "https://creativedestructionlab.com/streams/health", app_status: "Not Started", notes: "Toronto. No equity for program." },
  { name: "DMZ (Toronto Metropolitan)", org: "DMZ", country: "Canada", category: "Accelerator", deadline: "Rolling", open_date: "Rolling", funding_amount: 0, funding_display: "Equity-free support", url: "https://dmz.torontomu.ca", app_status: "Not Started", notes: "Top-ranked globally." },
  { name: "Bethnal Green Ventures", org: "BGV", country: "UK", category: "Accelerator", deadline: "TBA", open_date: "TBA", funding_amount: 37500, funding_display: "£30K for 6% equity", url: "https://bethnalgreenventures.com", app_status: "Not Started", notes: "Tech for good. London." },
  { name: "NHS Clinical Entrepreneur", org: "NHS England", country: "UK", category: "Accelerator", deadline: "TBA", open_date: "TBA", funding_amount: 0, funding_display: "NHS network + pilots", url: "https://nhscep.com", app_status: "Not Started", notes: "Massive distribution." },
  { name: "Hatch Enterprise", org: "Hatch", country: "UK", category: "Accelerator", deadline: "Rolling", open_date: "Rolling", funding_amount: 10000, funding_display: "Grants + mentorship", url: "https://hatchenterprise.co.uk", app_status: "Not Started", notes: "Underrepresented founders." },
  { name: "Health Foundry", org: "Guy's & St Thomas' NHS", country: "UK", category: "Accelerator", deadline: "TBA", open_date: "TBA", funding_amount: 0, funding_display: "Workspace + NHS access", url: "https://healthfoundry.org", app_status: "Not Started", notes: "London health tech hub." },
  { name: "Red Bull Basement 2026", org: "Red Bull", country: "Global", category: "Pitch Competition", deadline: "2026-08-01", open_date: "2026-05-01", funding_amount: 0, funding_display: "Mentorship + global stage", url: "https://redbullbasement.com", app_status: "In Progress", notes: "Student-focused." },
  { name: "Texas A&M AI Venture Velocity", org: "Texas A&M University", country: "US", category: "Pitch Competition", deadline: "2026-06-30", open_date: "2026-04-01", funding_amount: 100000, funding_display: "Up to $100K non-dilutive", url: "https://mays.tamu.edu", app_status: "Submitted", notes: "Top 12 to campus." },
  { name: "HLTH USA 2026 Startup Pitch", org: "HLTH", country: "US", category: "Pitch Competition", deadline: "TBA (Nov 2026)", open_date: "TBA", funding_amount: 25000, funding_display: "$25,000", url: "https://hlth.com", app_status: "Not Started", notes: "Healthcare <5 years, <$8M raised." },
  { name: "TechCrunch Disrupt Battlefield", org: "TechCrunch", country: "US", category: "Pitch Competition", deadline: "TBA (Oct 2026)", open_date: "TBA", funding_amount: 100000, funding_display: "$100,000", url: "https://techcrunch.com/events/disrupt-2026", app_status: "Not Started", notes: "Massive visibility." },
  { name: "Rice Business Plan Competition", org: "Rice University", country: "US", category: "Pitch Competition", deadline: "TBA (Spring 2027)", open_date: "TBA", funding_amount: 350000, funding_display: "Up to $350K", url: "https://rbpc.rice.edu", app_status: "Not Started", notes: "World's largest student competition." },
  { name: "Duke Startup Challenge", org: "Duke I&E", country: "US", category: "Pitch Competition", deadline: "TBA (Spring 2027)", open_date: "TBA", funding_amount: 50000, funding_display: "Up to $50K", url: "https://entrepreneurship.duke.edu", app_status: "Researching", notes: "Local advantage." },
  { name: "MIT Solve Global Challenges", org: "MIT", country: "US/Global", category: "Pitch Competition", deadline: "TBA", open_date: "TBA", funding_amount: 50000, funding_display: "Up to $50K", url: "https://solve.mit.edu", app_status: "Not Started", notes: "Health Security track." },
  { name: "Aging Innovation Challenge", org: "Leading Age / CAST", country: "US", category: "Pitch Competition", deadline: "TBA", open_date: "TBA", funding_amount: 10000, funding_display: "$10K + pilots", url: "https://leadingage.org", app_status: "Researching", notes: "AgeTech specific." },
];

const SEED_AGENCIES = [
  { name: "HomeChoice Home Care Solutions", city: "Raleigh/Durham", state: "NC", country: "US", phone: "Contact via website", email: "Contact via website", website: "homechoicehomecare.com", size: "SMB", outreach: "Not Started", notes: "Family-owned, serves Wake/Durham." },
  { name: "Comfort Keepers Durham", city: "Durham/Chapel Hill", state: "NC", country: "US", phone: "(919) 504-2473", email: "Contact via website", website: "comfortkeepers.com", size: "Mid-Size", outreach: "Not Started", notes: "Award-winning." },
  { name: "Right at Home Durham", city: "Durham", state: "NC", country: "US", phone: "(919) 237-2333", email: "Contact via website", website: "rightathome.net", size: "Mid-Size", outreach: "Not Started", notes: "ACHC accredited." },
  { name: "Visiting Angels Chapel Hill", city: "Chapel Hill", state: "NC", country: "US", phone: "Contact via website", email: "Contact via website", website: "visitingangels.com", size: "Mid-Size", outreach: "Not Started", notes: "Est. 2003." },
  { name: "Wisdom Senior Care", city: "Durham", state: "NC", country: "US", phone: "Contact via website", email: "Contact via website", website: "Care.com", size: "SMB", outreach: "Not Started", notes: "Durham-based." },
  { name: "A Place At Home Raleigh", city: "Raleigh", state: "NC", country: "US", phone: "Contact via website", email: "Contact via website", website: "aplaceathome.com", size: "SMB", outreach: "Not Started", notes: "Nurse-led." },
  { name: "HomeWell Care Services", city: "Raleigh", state: "NC", country: "US", phone: "Contact via website", email: "Contact via website", website: "homewellcares.com", size: "SMB", outreach: "Not Started", notes: "Expert Care Manager model." },
  { name: "Home Instead Durham", city: "Durham", state: "NC", country: "US", phone: "Contact via website", email: "Contact via website", website: "homeinstead.com", size: "Mid-Size", outreach: "Not Started", notes: "10+ years in Triangle." },
  { name: "Personal Home Care of NC", city: "Charlotte", state: "NC", country: "US", phone: "(704) 522-6149", email: "Contact via website", website: "phcnc.com", size: "Mid-Size", outreach: "Not Started", notes: "Medicare-certified." },
  { name: "ComForCare Charlotte", city: "Charlotte", state: "NC", country: "US", phone: "(704) 543-0630", email: "Contact via website", website: "comforcare.com", size: "Mid-Size", outreach: "Not Started", notes: "National network." },
  { name: "Promise To Care Home", city: "Greensboro", state: "NC", country: "US", phone: "Contact via website", email: "Contact via website", website: "Care.com", size: "SMB", outreach: "Not Started", notes: "14+ counties." },
  { name: "ComForCare Greensboro", city: "Greensboro", state: "NC", country: "US", phone: "(336) 617-6001", email: "Contact via website", website: "comforcare.com", size: "Mid-Size", outreach: "Not Started", notes: "National network." },
  { name: "BrightSpring Health", city: "Louisville", state: "KY", country: "US", phone: "Contact via website", email: "Contact via website", website: "brightspringhealth.com", size: "Enterprise", outreach: "Not Started", notes: "Major US provider." },
  { name: "Amedisys", city: "Baton Rouge", state: "LA", country: "US", phone: "(888) 838-8851", email: "Contact via website", website: "amedisys.com", size: "Enterprise", outreach: "Not Started", notes: "Publicly traded." },
  { name: "Bayada Home Health Care", city: "Moorestown", state: "NJ", country: "US", phone: "(800) 305-3000", email: "Contact via website", website: "bayada.com", size: "Enterprise", outreach: "Not Started", notes: "23 states." },
  { name: "Interim HealthCare", city: "Sunrise", state: "FL", country: "US", phone: "Contact via website", email: "Contact via website", website: "interimhealthcare.com", size: "Enterprise", outreach: "Not Started", notes: "350+ locations." },
  { name: "Elara Caring", city: "Dallas", state: "TX", country: "US", phone: "Contact via website", email: "Contact via website", website: "elara.com", size: "Enterprise", outreach: "Not Started", notes: "200K+ patients." },
  { name: "CarePartners", city: "Kitchener", state: "ON", country: "Canada", phone: "(519) 743-1028", email: "Contact via website", website: "carepartners.ca", size: "Mid-Size", outreach: "Not Started", notes: "Ontario-based." },
  { name: "Bayshore HealthCare", city: "Mississauga", state: "ON", country: "Canada", phone: "(855) 581-4746", email: "Contact via website", website: "bayshore.ca", size: "Enterprise", outreach: "Not Started", notes: "Largest Canadian provider." },
  { name: "SE Health", city: "Markham", state: "ON", country: "Canada", phone: "(888) 228-1999", email: "Contact via website", website: "sehc.com", size: "Enterprise", outreach: "Not Started", notes: "9,000+ employees." },
  { name: "VON Canada", city: "Ottawa", state: "ON", country: "Canada", phone: "(888) 866-2273", email: "Contact via website", website: "von.ca", size: "Enterprise", outreach: "Not Started", notes: "125+ years." },
  { name: "ParaMed Home Health Care", city: "Toronto", state: "ON", country: "Canada", phone: "Contact via website", email: "Contact via website", website: "paramed.com", size: "Enterprise", outreach: "Not Started", notes: "Part of Extendicare." },
  { name: "Home Instead UK", city: "Warrington", state: "", country: "UK", phone: "Contact via website", email: "Contact via website", website: "homeinstead.co.uk", size: "Enterprise", outreach: "Not Started", notes: "230+ offices." },
  { name: "Bluebird Care", city: "Petersfield", state: "", country: "UK", phone: "Contact via website", email: "Contact via website", website: "bluebirdcare.co.uk", size: "Enterprise", outreach: "Not Started", notes: "200+ franchises." },
  { name: "Cera Care", city: "London", state: "", country: "UK", phone: "Contact via website", email: "Contact via website", website: "ceracare.co.uk", size: "Enterprise", outreach: "Not Started", notes: "Tech-enabled care." },
  { name: "Radfield Home Care", city: "Shrewsbury", state: "", country: "UK", phone: "Contact via website", email: "Contact via website", website: "radfieldhomecare.co.uk", size: "Mid-Size", outreach: "Not Started", notes: "Premium franchise." },
  { name: "Right at Home UK", city: "London", state: "", country: "UK", phone: "Contact via website", email: "Contact via website", website: "rightathomeuk.com", size: "Mid-Size", outreach: "Not Started", notes: "70+ offices." },
  { name: "Heritage Healthcare", city: "Nationwide", state: "", country: "UK", phone: "Contact via website", email: "Contact via website", website: "heritagehealthcare.co.uk", size: "Mid-Size", outreach: "Not Started", notes: "CQC Outstanding." },
  { name: "Caremark", city: "Worthing", state: "", country: "UK", phone: "Contact via website", email: "Contact via website", website: "caremark.co.uk", size: "Enterprise", outreach: "Not Started", notes: "115+ offices." },
];

// Supabase helpers
async function supaFetch(table, method, body, query) {
  const url = `${SUPA_URL}/rest/v1/${table}${query || ""}`;
  const opts = { method, headers: { ...HEADERS, ...(method !== "GET" ? { Prefer: "return=representation" } : {}) } };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(url, opts);
  return res.json();
}

function getStatusColor(s) { return { "Not Started": GRAY, Researching: AMBER, "In Progress": "#2563EB", Submitted: PURPLE, Accepted: GREEN, Rejected: ACCENT }[s] || GRAY; }
function getCategoryColor(c) { return { Grant: GREEN, Accelerator: PURPLE, "Pitch Competition": AMBER }[c] || GRAY; }
function getCategoryIcon(c) { return { Grant: "\u{1F4B0}", Accelerator: "\u{1F680}", "Pitch Competition": "\u{1F3C6}" }[c] || "\u{1F4CB}"; }
function getOutreachColor(s) { return { "Not Started": GRAY, Researching: AMBER, "Email Sent": "#2563EB", "Call Scheduled": PURPLE, "In Conversation": TEAL, "Pilot Agreed": GREEN, "Not Interested": ACCENT }[s] || GRAY; }
function getSizeColor(s) { return { SMB: TEAL, "Mid-Size": AMBER, Enterprise: PURPLE }[s] || GRAY; }
function Badge({ text, color }) { return <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 10, background: color + "15", color, whiteSpace: "nowrap" }}>{text}</span>; }

function formatDeadline(d) {
  if (!d || d === "TBA" || d.startsWith("TBA") || d === "Rolling" || d.startsWith("Rolling")) return d;
  try { const date = new Date(d + "T00:00:00"); const diff = Math.ceil((date - new Date()) / 864e5); const f = date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }); if (diff < 0) return f + " (Passed)"; if (diff <= 14) return f + " (" + diff + "d!)"; if (diff <= 30) return f + " (" + diff + "d)"; return f; } catch { return d; }
}
function isUrgent(d) { if (!d || d === "TBA" || d === "Rolling") return false; try { return Math.ceil((new Date(d + "T00:00:00") - new Date()) / 864e5) <= 30 && Math.ceil((new Date(d + "T00:00:00") - new Date()) / 864e5) >= 0; } catch { return false; } }

function exportCSV(data, headers, filename) {
  const csv = [headers.join(","), ...data.map(r => headers.map(h => '"' + String(r[h] || "").replace(/"/g, '""') + '"').join(","))].join("\n");
  const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" })); a.download = filename; a.click();
}

export default function App() {
  const [tab, setTab] = useState("opportunities");
  const [opps, setOpps] = useState([]);
  const [agencies, setAgencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [countryFilter, setCountryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sizeFilter, setSizeFilter] = useState("All");
  const [sortBy, setSortBy] = useState("deadline");
  const [editingId, setEditingId] = useState(null);
  const [aiQuery, setAiQuery] = useState("");
  const [aiResults, setAiResults] = useState(null);
  const [searching, setSearching] = useState(false);
  const [saving, setSaving] = useState(false);

  // Load data from Supabase on mount
  useEffect(() => {
    async function loadData() {
      try {
        let oppData = await supaFetch("opportunities", "GET", null, "?select=*&order=id");
        let agencyData = await supaFetch("agencies", "GET", null, "?select=*&order=id");
        // Seed if empty
        if (!oppData || oppData.length === 0) {
          oppData = await supaFetch("opportunities", "POST", SEED_OPPS);
        }
        if (!agencyData || agencyData.length === 0) {
          agencyData = await supaFetch("agencies", "POST", SEED_AGENCIES);
        }
        setOpps(Array.isArray(oppData) ? oppData : []);
        setAgencies(Array.isArray(agencyData) ? agencyData : []);
      } catch (e) { console.error("Load error:", e); }
      setLoading(false);
    }
    loadData();
  }, []);

  const filteredOpps = opps.filter(o => {
    const ms = !search || [o.name, o.org, o.notes, o.country].some(v => (v || "").toLowerCase().includes(search.toLowerCase()));
    return ms && (catFilter === "All" || o.category === catFilter) && (countryFilter === "All" || (o.country || "").includes(countryFilter)) && (statusFilter === "All" || o.app_status === statusFilter);
  }).sort((a, b) => {
    if (sortBy === "deadline") { const aD = a.deadline && !a.deadline.startsWith("T") && !a.deadline.startsWith("R") ? new Date(a.deadline) : new Date("2099-01-01"); const bD = b.deadline && !b.deadline.startsWith("T") && !b.deadline.startsWith("R") ? new Date(b.deadline) : new Date("2099-01-01"); return aD - bD; }
    if (sortBy === "funding") return (b.funding_amount || 0) - (a.funding_amount || 0);
    return (a.name || "").localeCompare(b.name || "");
  });

  const filteredAgencies = agencies.filter(a => {
    const ms = !search || [a.name, a.city, a.state, a.notes, a.country].some(v => (v || "").toLowerCase().includes(search.toLowerCase()));
    return ms && (countryFilter === "All" || (a.country || "").includes(countryFilter)) && (sizeFilter === "All" || a.size === sizeFilter) && (statusFilter === "All" || a.outreach === statusFilter);
  });

  const stats = { total: opps.length, grants: opps.filter(o => o.category === "Grant").length, accelerators: opps.filter(o => o.category === "Accelerator").length, competitions: opps.filter(o => o.category === "Pitch Competition").length, submitted: opps.filter(o => o.app_status === "Submitted").length, urgent: opps.filter(o => isUrgent(o.deadline)).length, totalFunding: opps.reduce((s, o) => s + (o.funding_amount || 0), 0) };
  const agencyStats = { total: agencies.length, us: agencies.filter(a => a.country === "US").length, canada: agencies.filter(a => a.country === "Canada").length, uk: agencies.filter(a => a.country === "UK").length, contacted: agencies.filter(a => a.outreach !== "Not Started").length, pilots: agencies.filter(a => a.outreach === "Pilot Agreed").length };

  async function updateOppStatus(id, val) {
    setSaving(true);
    setOpps(prev => prev.map(o => o.id === id ? { ...o, app_status: val } : o));
    await supaFetch("opportunities", "PATCH", { app_status: val }, `?id=eq.${id}`);
    setEditingId(null); setSaving(false);
  }

  async function updateAgencyOutreach(id, val) {
    setSaving(true);
    setAgencies(prev => prev.map(a => a.id === id ? { ...a, outreach: val } : a));
    await supaFetch("agencies", "PATCH", { outreach: val }, `?id=eq.${id}`);
    setEditingId(null); setSaving(false);
  }

  async function aiSearch() {
    if (!aiQuery.trim()) return;
    setSearching(true); setAiResults(null);
    try {
      const sys = "You are a research assistant. After searching, respond with ONLY a valid JSON array. No markdown, no preamble.";
      const prompt = tab === "opportunities"
        ? `Search the web for ${aiQuery}. Relevant to healthcare AI startup for home care. Return ONLY JSON array with keys: name, org, country, category (Grant/Accelerator/Pitch Competition), deadline, open_date, funding_amount (number), funding_display, url, notes. 5-10 results.`
        : `Search the web for home health care agencies: ${aiQuery}. Return ONLY JSON array with keys: name, city, state, country, phone, email, website, size (SMB/Mid-Size/Enterprise), notes. 5-10 results.`;
      const res = await fetch("/api/search", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ prompt, system: sys }) });
      let allText = ""; for (const b of (data.content || [])) { if (b.type === "text") allText += b.text + "\n"; if (b.type === "mcp_tool_result" && b.content) for (const s of b.content) if (s.text) allText += s.text + "\n"; }
      let clean = allText.replace(/```json|```/g, "").trim(); let parsed = null;
      try { parsed = JSON.parse(clean); } catch {}
      if (!parsed) { const m = clean.match(/\[[\s\S]*\]/); if (m) try { parsed = JSON.parse(m[0]); } catch {} }
      if (!parsed) { const r2 = await fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1500, messages: [{ role: "user", content: `Extract structured data. Return ONLY valid JSON array. Text:\n${clean.substring(0, 2500)}` }] }) }); const d2 = await r2.json(); const t2 = d2.content?.filter(b => b.type === "text").map(b => b.text).join("").replace(/```json|```/g, "").trim(); const m2 = t2.match(/\[[\s\S]*\]/); if (m2) try { parsed = JSON.parse(m2[0]); } catch {} }
      if (parsed && Array.isArray(parsed)) setAiResults(parsed); else setAiResults(null);
    } catch {} setSearching(false);
  }

  async function addAiResults() {
    if (!aiResults) return; setSaving(true);
    if (tab === "opportunities") {
      const ex = new Set(opps.map(o => (o.name || "").toLowerCase()));
      const nw = aiResults.filter(r => r.name && !ex.has(r.name.toLowerCase())).map(r => ({ ...r, app_status: r.app_status || "Not Started", funding_amount: r.funding_amount || 0 }));
      if (nw.length > 0) { const inserted = await supaFetch("opportunities", "POST", nw); if (Array.isArray(inserted)) setOpps(p => [...p, ...inserted]); }
    } else {
      const ex = new Set(agencies.map(a => (a.name || "").toLowerCase()));
      const nw = aiResults.filter(r => r.name && !ex.has(r.name.toLowerCase())).map(r => ({ ...r, outreach: r.outreach || "Not Started" }));
      if (nw.length > 0) { const inserted = await supaFetch("agencies", "POST", nw); if (Array.isArray(inserted)) setAgencies(p => [...p, ...inserted]); }
    }
    setAiResults(null); setAiQuery(""); setSaving(false);
  }

  function resetFilters() { setSearch(""); setCatFilter("All"); setCountryFilter("All"); setStatusFilter("All"); setSizeFilter("All"); }
  const cs = (bg, border) => ({ background: bg, borderLeft: `4px solid ${border}`, borderRadius: 8, padding: "12px 16px", flex: 1, minWidth: 110 });
  const tabBtn = (t) => ({ padding: "10px 24px", cursor: "pointer", fontWeight: 700, fontSize: 14, border: "none", background: tab === t ? TEAL : "transparent", color: tab === t ? "#fff" : GRAY, borderRadius: "8px 8px 0 0" });

  if (loading) return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", fontFamily: "system-ui", background: "#F0F2F5" }}><div style={{ textAlign: "center" }}><div style={{ fontSize: 24, fontWeight: 800, color: TEAL, marginBottom: 8 }}>OptimaVia</div><div style={{ color: GRAY }}>Loading from database...</div></div></div>;

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#F0F2F5", minHeight: "100vh" }}>
      <div style={{ background: INK, padding: "16px 24px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 20, color: MINT, fontWeight: 800 }}>OptimaVia Command Center</h1>
            <p style={{ margin: "2px 0 0", fontSize: 12, color: GRAY }}>Opportunities · Agencies · Outreach {saving && <span style={{ color: MINT }}> · Saving...</span>}</p>
          </div>
          <button onClick={() => tab === "opportunities" ? exportCSV(filteredOpps, ["name","org","country","category","deadline","funding_display","app_status","url","notes"], "opportunities.csv") : exportCSV(filteredAgencies, ["name","city","state","country","phone","email","website","size","outreach","notes"], "agencies.csv")} style={{ padding: "6px 14px", fontSize: 12, fontWeight: 600, background: "transparent", color: MINT, border: `1px solid ${MINT}`, borderRadius: 6, cursor: "pointer" }}>Export CSV</button>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          <button style={tabBtn("opportunities")} onClick={() => { setTab("opportunities"); resetFilters(); setAiResults(null); }}>{"\u{1F4B0}"} Opportunities ({opps.length})</button>
          <button style={tabBtn("agencies")} onClick={() => { setTab("agencies"); resetFilters(); setAiResults(null); }}>{"\u{1F3E5}"} Agencies ({agencies.length})</button>
        </div>
      </div>

      <div style={{ padding: "16px 24px" }}>
        <div style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
          {tab === "opportunities" ? (<>
            <div style={cs("#fff", TEAL)}><div style={{ fontSize: 22, fontWeight: 800, color: TEAL }}>{stats.total}</div><div style={{ fontSize: 11, color: GRAY }}>Total</div></div>
            <div style={cs("#fff", GREEN)}><div style={{ fontSize: 22, fontWeight: 800, color: GREEN }}>{stats.grants}</div><div style={{ fontSize: 11, color: GRAY }}>Grants</div></div>
            <div style={cs("#fff", PURPLE)}><div style={{ fontSize: 22, fontWeight: 800, color: PURPLE }}>{stats.accelerators}</div><div style={{ fontSize: 11, color: GRAY }}>Accelerators</div></div>
            <div style={cs("#fff", AMBER)}><div style={{ fontSize: 22, fontWeight: 800, color: AMBER }}>{stats.competitions}</div><div style={{ fontSize: 11, color: GRAY }}>Competitions</div></div>
            <div style={cs("#fff", PURPLE)}><div style={{ fontSize: 22, fontWeight: 800, color: PURPLE }}>{stats.submitted}</div><div style={{ fontSize: 11, color: GRAY }}>Submitted</div></div>
            <div style={cs("#fff", ACCENT)}><div style={{ fontSize: 22, fontWeight: 800, color: ACCENT }}>{stats.urgent}</div><div style={{ fontSize: 11, color: GRAY }}>Due 30d</div></div>
            <div style={cs("#fff", TEAL)}><div style={{ fontSize: 22, fontWeight: 800, color: TEAL }}>${(stats.totalFunding / 1000).toFixed(0)}K</div><div style={{ fontSize: 11, color: GRAY }}>Available</div></div>
          </>) : (<>
            <div style={cs("#fff", TEAL)}><div style={{ fontSize: 22, fontWeight: 800, color: TEAL }}>{agencyStats.total}</div><div style={{ fontSize: 11, color: GRAY }}>Total</div></div>
            <div style={cs("#fff", "#2563EB")}><div style={{ fontSize: 22, fontWeight: 800, color: "#2563EB" }}>{agencyStats.us}</div><div style={{ fontSize: 11, color: GRAY }}>US</div></div>
            <div style={cs("#fff", ACCENT)}><div style={{ fontSize: 22, fontWeight: 800, color: ACCENT }}>{agencyStats.canada}</div><div style={{ fontSize: 11, color: GRAY }}>Canada</div></div>
            <div style={cs("#fff", PURPLE)}><div style={{ fontSize: 22, fontWeight: 800, color: PURPLE }}>{agencyStats.uk}</div><div style={{ fontSize: 11, color: GRAY }}>UK</div></div>
            <div style={cs("#fff", AMBER)}><div style={{ fontSize: 22, fontWeight: 800, color: AMBER }}>{agencyStats.contacted}</div><div style={{ fontSize: 11, color: GRAY }}>Contacted</div></div>
            <div style={cs("#fff", GREEN)}><div style={{ fontSize: 22, fontWeight: 800, color: GREEN }}>{agencyStats.pilots}</div><div style={{ fontSize: 11, color: GRAY }}>Pilots</div></div>
          </>)}
        </div>

        <div style={{ background: "#fff", borderRadius: 10, padding: 14, marginBottom: 12, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <p style={{ margin: "0 0 6px", fontSize: 12, fontWeight: 700, color: INK }}>{"\u{1F50D}"} AI-Powered Search</p>
          <div style={{ display: "flex", gap: 8 }}>
            <input value={aiQuery} onChange={e => setAiQuery(e.target.value)} onKeyDown={e => e.key === "Enter" && aiSearch()} placeholder={tab === "opportunities" ? 'e.g. "healthcare AI grants 2026"' : 'e.g. "home care agencies in Texas"'} style={{ flex: 1, padding: "8px 12px", fontSize: 13, border: "1px solid #D4D9E2", borderRadius: 6, outline: "none" }} />
            <button onClick={aiSearch} disabled={searching} style={{ padding: "8px 18px", fontSize: 13, fontWeight: 700, background: TEAL, color: "#fff", border: "none", borderRadius: 6, cursor: searching ? "wait" : "pointer", opacity: searching ? 0.7 : 1 }}>{searching ? "Searching..." : "Search"}</button>
          </div>
          {aiResults && (<div style={{ marginTop: 10, padding: 10, background: TEAL_LIGHT, borderRadius: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: TEAL }}>Found {aiResults.length} results</span>
              <button onClick={addAiResults} disabled={saving} style={{ padding: "4px 12px", fontSize: 11, fontWeight: 700, background: TEAL, color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }}>{saving ? "Saving..." : "+ Add All to Database"}</button>
            </div>
            {aiResults.map((r, i) => (<div key={i} style={{ fontSize: 12, padding: "3px 0", borderBottom: "1px solid #cde8e8" }}><strong>{r.name}</strong> {r.org && ` \u2014 ${r.org}`} {r.city && ` \u2014 ${r.city}`} ({r.country})</div>))}
          </div>)}
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap", alignItems: "center" }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Filter..." style={{ padding: "6px 12px", fontSize: 12, border: "1px solid #D4D9E2", borderRadius: 6, width: 160, outline: "none" }} />
          <select value={countryFilter} onChange={e => setCountryFilter(e.target.value)} style={{ padding: "6px 8px", fontSize: 12, border: "1px solid #D4D9E2", borderRadius: 6 }}>{COUNTRIES.map(o => <option key={o} value={o}>{o === "All" ? "All Countries" : o}</option>)}</select>
          {tab === "opportunities" && (<>
            <select value={catFilter} onChange={e => setCatFilter(e.target.value)} style={{ padding: "6px 8px", fontSize: 12, border: "1px solid #D4D9E2", borderRadius: 6 }}>{CATEGORIES.map(o => <option key={o} value={o}>{o === "All" ? "All Types" : o}</option>)}</select>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ padding: "6px 8px", fontSize: 12, border: "1px solid #D4D9E2", borderRadius: 6 }}><option value="All">All Statuses</option>{STATUSES.map(s => <option key={s} value={s}>{s}</option>)}</select>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ padding: "6px 8px", fontSize: 12, border: "1px solid #D4D9E2", borderRadius: 6 }}><option value="deadline">Sort: Deadline</option><option value="funding">Sort: Funding</option><option value="name">Sort: Name</option></select>
          </>)}
          {tab === "agencies" && (<>
            <select value={sizeFilter} onChange={e => setSizeFilter(e.target.value)} style={{ padding: "6px 8px", fontSize: 12, border: "1px solid #D4D9E2", borderRadius: 6 }}>{SIZES.map(o => <option key={o} value={o}>{o === "All" ? "All Sizes" : o}</option>)}</select>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ padding: "6px 8px", fontSize: 12, border: "1px solid #D4D9E2", borderRadius: 6 }}><option value="All">All Outreach</option>{OUTREACH_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}</select>
          </>)}
          <span style={{ fontSize: 11, color: GRAY }}>{tab === "opportunities" ? filteredOpps.length : filteredAgencies.length} results</span>
        </div>

        <div style={{ background: "#fff", borderRadius: 10, overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <div style={{ overflowX: "auto" }}>
            {tab === "opportunities" ? (
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                <thead><tr style={{ background: INK }}>{["Category","Opportunity","Organization","Country","Deadline","Funding","Status","Notes"].map(h => <th key={h} style={{ padding: "9px 10px", textAlign: "left", color: "#fff", fontWeight: 700, fontSize: 10.5, textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>)}</tr></thead>
                <tbody>
                  {filteredOpps.map((o, i) => (
                    <tr key={o.id} style={{ borderBottom: "1px solid #F0F2F5", background: isUrgent(o.deadline) ? "#FEF3C7" : i % 2 === 0 ? "#fff" : LIGHT_BG }}>
                      <td style={{ padding: "8px 10px" }}><Badge text={getCategoryIcon(o.category) + " " + o.category} color={getCategoryColor(o.category)} /></td>
                      <td style={{ padding: "8px 10px", fontWeight: 600, maxWidth: 220 }}>{o.url ? <a href={o.url.startsWith("http") ? o.url : "https://" + o.url} target="_blank" rel="noopener noreferrer" style={{ color: TEAL, textDecoration: "none" }}>{o.name}</a> : o.name}</td>
                      <td style={{ padding: "8px 10px", color: INK }}>{o.org}</td>
                      <td style={{ padding: "8px 10px", color: GRAY }}>{o.country}</td>
                      <td style={{ padding: "8px 10px", whiteSpace: "nowrap", fontWeight: isUrgent(o.deadline) ? 700 : 400, color: isUrgent(o.deadline) ? ACCENT : INK }}>{formatDeadline(o.deadline)}</td>
                      <td style={{ padding: "8px 10px", color: INK, fontWeight: 600, whiteSpace: "nowrap" }}>{o.funding_display || "\u2014"}</td>
                      <td style={{ padding: "8px 10px" }}>{editingId === o.id ? <select autoFocus value={o.app_status} onChange={e => updateOppStatus(o.id, e.target.value)} onBlur={() => setEditingId(null)} style={{ fontSize: 11, padding: "2px 4px", borderRadius: 6, border: "1px solid #D4D9E2" }}>{STATUSES.map(s => <option key={s} value={s}>{s}</option>)}</select> : <span onClick={() => setEditingId(o.id)} style={{ cursor: "pointer" }}><Badge text={o.app_status} color={getStatusColor(o.app_status)} /></span>}</td>
                      <td style={{ padding: "8px 10px", color: GRAY, fontSize: 11, maxWidth: 250 }}>{o.notes}</td>
                    </tr>
                  ))}
                  {filteredOpps.length === 0 && <tr><td colSpan={8} style={{ padding: 32, textAlign: "center", color: GRAY }}>No results.</td></tr>}
                </tbody>
              </table>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                <thead><tr style={{ background: INK }}>{["Agency","City","State","Country","Phone","Website","Size","Outreach","Notes"].map(h => <th key={h} style={{ padding: "9px 10px", textAlign: "left", color: "#fff", fontWeight: 700, fontSize: 10.5, textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>)}</tr></thead>
                <tbody>
                  {filteredAgencies.map((a, i) => (
                    <tr key={a.id} style={{ borderBottom: "1px solid #F0F2F5", background: i % 2 === 0 ? "#fff" : LIGHT_BG }}>
                      <td style={{ padding: "8px 10px", fontWeight: 600, color: INK }}>{a.name}</td>
                      <td style={{ padding: "8px 10px", color: GRAY }}>{a.city}</td>
                      <td style={{ padding: "8px 10px", color: GRAY }}>{a.state}</td>
                      <td style={{ padding: "8px 10px", color: GRAY }}>{a.country}</td>
                      <td style={{ padding: "8px 10px", color: TEAL, fontWeight: 500, whiteSpace: "nowrap" }}>{a.phone}</td>
                      <td style={{ padding: "8px 10px" }}>{a.website && <a href={(a.website.startsWith("http") ? a.website : "https://" + a.website)} target="_blank" rel="noopener noreferrer" style={{ color: TEAL, textDecoration: "none", fontSize: 11 }}>{a.website}</a>}</td>
                      <td style={{ padding: "8px 10px" }}><Badge text={a.size} color={getSizeColor(a.size)} /></td>
                      <td style={{ padding: "8px 10px" }}>{editingId === a.id ? <select autoFocus value={a.outreach} onChange={e => updateAgencyOutreach(a.id, e.target.value)} onBlur={() => setEditingId(null)} style={{ fontSize: 11, padding: "2px 4px", borderRadius: 6, border: "1px solid #D4D9E2" }}>{OUTREACH_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}</select> : <span onClick={() => setEditingId(a.id)} style={{ cursor: "pointer" }}><Badge text={a.outreach} color={getOutreachColor(a.outreach)} /></span>}</td>
                      <td style={{ padding: "8px 10px", color: GRAY, fontSize: 11, maxWidth: 220 }}>{a.notes}</td>
                    </tr>
                  ))}
                  {filteredAgencies.length === 0 && <tr><td colSpan={9} style={{ padding: 32, textAlign: "center", color: GRAY }}>No results.</td></tr>}
                </tbody>
              </table>
            )}
          </div>
        </div>
        <p style={{ fontSize: 10, color: GRAY, textAlign: "center", margin: "12px 0 0" }}>All changes saved to database · Click status badges to update · AI Search adds results directly to Supabase</p>
      </div>
    </div>
  );
}
