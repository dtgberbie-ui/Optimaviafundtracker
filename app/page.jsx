"use client";
import { useState } from "react";

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
const SIZES = ["All", "SMB", "Mid-Size", "Enterprise"];

const SEED_OPPORTUNITIES = [
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

const SEED_AGENCIES = [
  { id: 101, name: "HomeChoice Home Care Solutions", city: "Raleigh/Durham", state: "NC", country: "US", phone: "Contact via website", email: "Contact via website", website: "homechoicehomecare.com", size: "SMB", outreach: "Not Started", notes: "Family-owned, serves Wake/Durham. Ideal SMB target." },
  { id: 102, name: "Comfort Keepers Durham", city: "Durham/Chapel Hill", state: "NC", country: "US", phone: "(919) 504-2473", email: "Contact via website", website: "comfortkeepers.com", size: "Mid-Size", outreach: "Not Started", notes: "Award-winning. Serves Durham, Chapel Hill, Hillsborough." },
  { id: 103, name: "Right at Home Durham-Chapel Hill", city: "Durham", state: "NC", country: "US", phone: "(919) 237-2333", email: "Contact via website", website: "rightathome.net", size: "Mid-Size", outreach: "Not Started", notes: "ACHC accredited. 2025 Provider of Choice award." },
  { id: 104, name: "Visiting Angels Chapel Hill", city: "Chapel Hill", state: "NC", country: "US", phone: "Contact via website", email: "Contact via website", website: "visitingangels.com", size: "Mid-Size", outreach: "Not Started", notes: "Est. 2003. Prominent local provider." },
  { id: 105, name: "Wisdom Senior Care", city: "Durham", state: "NC", country: "US", phone: "Contact via website", email: "Contact via website", website: "Listed on Care.com", size: "SMB", outreach: "Not Started", notes: "Good reviews. Durham-based." },
  { id: 106, name: "A Place At Home - North Raleigh", city: "Raleigh", state: "NC", country: "US", phone: "Contact via website", email: "Contact via website", website: "aplaceathome.com", size: "SMB", outreach: "Not Started", notes: "Family-owned, nurse-led." },
  { id: 107, name: "HomeWell Care Services", city: "Raleigh", state: "NC", country: "US", phone: "Contact via website", email: "Contact via website", website: "homewellcares.com", size: "SMB", outreach: "Not Started", notes: "Expert Care Manager model." },
  { id: 108, name: "Home Instead (Durham)", city: "Durham", state: "NC", country: "US", phone: "Contact via website", email: "Contact via website", website: "homeinstead.com", size: "Mid-Size", outreach: "Not Started", notes: "10+ years in Triangle." },
  { id: 109, name: "Personal Home Care of NC", city: "Charlotte/Cary", state: "NC", country: "US", phone: "(704) 522-6149", email: "Contact via website", website: "phcnc.com", size: "Mid-Size", outreach: "Not Started", notes: "Multi-location. Medicare-certified." },
  { id: 110, name: "ComForCare Charlotte", city: "Charlotte", state: "NC", country: "US", phone: "(704) 543-0630", email: "Contact via website", website: "comforcare.com", size: "Mid-Size", outreach: "Not Started", notes: "Part of national network." },
  { id: 111, name: "Promise To Care Home", city: "Greensboro", state: "NC", country: "US", phone: "Contact via website", email: "Contact via website", website: "Listed on Care.com", size: "SMB", outreach: "Not Started", notes: "Serves 14+ counties." },
  { id: 112, name: "ComForCare Greensboro", city: "Greensboro", state: "NC", country: "US", phone: "(336) 617-6001", email: "Contact via website", website: "comforcare.com", size: "Mid-Size", outreach: "Not Started", notes: "Part of national network." },
  { id: 113, name: "BrightSpring Health Services", city: "Louisville", state: "KY", country: "US", phone: "Contact via website", email: "Contact via website", website: "brightspringhealth.com", size: "Enterprise", outreach: "Not Started", notes: "One of largest US home health providers." },
  { id: 114, name: "Amedisys", city: "Baton Rouge", state: "LA", country: "US", phone: "(888) 838-8851", email: "Contact via website", website: "amedisys.com", size: "Enterprise", outreach: "Not Started", notes: "Major publicly traded home health company." },
  { id: 115, name: "Bayada Home Health Care", city: "Moorestown", state: "NJ", country: "US", phone: "(800) 305-3000", email: "Contact via website", website: "bayada.com", size: "Enterprise", outreach: "Not Started", notes: "Operates in 23 states + international." },
  { id: 116, name: "Interim HealthCare", city: "Sunrise", state: "FL", country: "US", phone: "Contact via website", email: "Contact via website", website: "interimhealthcare.com", size: "Enterprise", outreach: "Not Started", notes: "350+ franchise locations nationwide." },
  { id: 117, name: "Elara Caring", city: "Dallas", state: "TX", country: "US", phone: "Contact via website", email: "Contact via website", website: "elara.com", size: "Enterprise", outreach: "Not Started", notes: "Serves 200K+ patients across 17 states." },
  { id: 118, name: "CarePartners", city: "Kitchener", state: "ON", country: "Canada", phone: "(519) 743-1028", email: "Contact via website", website: "carepartners.ca", size: "Mid-Size", outreach: "Not Started", notes: "Ontario-based. Home health and community services." },
  { id: 119, name: "Bayshore HealthCare", city: "Mississauga", state: "ON", country: "Canada", phone: "(855) 581-4746", email: "Contact via website", website: "bayshore.ca", size: "Enterprise", outreach: "Not Started", notes: "Largest Canadian home care provider." },
  { id: 120, name: "SE Health (Saint Elizabeth)", city: "Markham", state: "ON", country: "Canada", phone: "(888) 228-1999", email: "Contact via website", website: "sehc.com", size: "Enterprise", outreach: "Not Started", notes: "Not-for-profit. 9,000+ employees across Canada." },
  { id: 121, name: "VON Canada", city: "Ottawa", state: "ON", country: "Canada", phone: "(888) 866-2273", email: "Contact via website", website: "von.ca", size: "Enterprise", outreach: "Not Started", notes: "National not-for-profit home care. 125+ years." },
  { id: 122, name: "ParaMed Home Health Care", city: "Toronto", state: "ON", country: "Canada", phone: "Contact via website", email: "Contact via website", website: "paramed.com", size: "Enterprise", outreach: "Not Started", notes: "Part of Extendicare. Major Ontario provider." },
  { id: 123, name: "Home Instead UK", city: "Warrington", state: "", country: "UK", phone: "Contact via website", email: "Contact via website", website: "homeinstead.co.uk", size: "Enterprise", outreach: "Not Started", notes: "230+ franchise offices across UK." },
  { id: 124, name: "Bluebird Care", city: "Petersfield", state: "", country: "UK", phone: "Contact via website", email: "Contact via website", website: "bluebirdcare.co.uk", size: "Enterprise", outreach: "Not Started", notes: "200+ franchises. CQC regulated." },
  { id: 125, name: "Cera Care", city: "London", state: "", country: "UK", phone: "Contact via website", email: "Contact via website", website: "ceracare.co.uk", size: "Enterprise", outreach: "Not Started", notes: "Tech-enabled home care. Uses digital tools." },
  { id: 126, name: "Radfield Home Care", city: "Shrewsbury", state: "", country: "UK", phone: "Contact via website", email: "Contact via website", website: "radfieldhomecare.co.uk", size: "Mid-Size", outreach: "Not Started", notes: "Premium home care franchise. Family-owned." },
  { id: 127, name: "Right at Home UK", city: "London", state: "", country: "UK", phone: "Contact via website", email: "Contact via website", website: "rightathomeuk.com", size: "Mid-Size", outreach: "Not Started", notes: "70+ offices across UK." },
  { id: 128, name: "Heritage Healthcare", city: "Nationwide", state: "", country: "UK", phone: "Contact via website", email: "Contact via website", website: "heritagehealthcare.co.uk", size: "Mid-Size", outreach: "Not Started", notes: "Growing franchise. CQC Outstanding ratings." },
  { id: 129, name: "Caremark", city: "Worthing", state: "", country: "UK", phone: "Contact via website", email: "Contact via website", website: "caremark.co.uk", size: "Enterprise", outreach: "Not Started", notes: "115+ offices. One of UK's largest home care providers." },
];

const OUTREACH_STATUSES = ["Not Started", "Researching", "Email Sent", "Call Scheduled", "In Conversation", "Pilot Agreed", "Not Interested"];

function getStatusColor(s) { return { "Not Started": GRAY, Researching: AMBER, "In Progress": "#2563EB", Submitted: PURPLE, Accepted: GREEN, Rejected: ACCENT }[s] || GRAY; }
function getCategoryColor(c) { return { Grant: GREEN, Accelerator: PURPLE, "Pitch Competition": AMBER }[c] || GRAY; }
function getCategoryIcon(c) { return { Grant: "\u{1F4B0}", Accelerator: "\u{1F680}", "Pitch Competition": "\u{1F3C6}" }[c] || "\u{1F4CB}"; }
function getOutreachColor(s) { return { "Not Started": GRAY, Researching: AMBER, "Email Sent": "#2563EB", "Call Scheduled": PURPLE, "In Conversation": TEAL, "Pilot Agreed": GREEN, "Not Interested": ACCENT }[s] || GRAY; }
function getSizeColor(s) { return { SMB: TEAL, "Mid-Size": AMBER, Enterprise: PURPLE }[s] || GRAY; }

function Badge({ text, color }) {
  return <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 10, background: color + "15", color, whiteSpace: "nowrap" }}>{text}</span>;
}

function formatDeadline(d) {
  if (!d || d === "TBA" || d.startsWith("TBA") || d === "Rolling" || d.startsWith("Rolling")) return d;
  try {
    const date = new Date(d + "T00:00:00"); const now = new Date();
    const diff = Math.ceil((date - now) / 864e5);
    const f = date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    if (diff < 0) return f + " (Passed)";
    if (diff <= 14) return f + " (" + diff + "d left!)";
    if (diff <= 30) return f + " (" + diff + "d left)";
    return f;
  } catch { return d; }
}

function isUrgent(d) {
  if (!d || d === "TBA" || d === "Rolling") return false;
  try { const diff = Math.ceil((new Date(d + "T00:00:00") - new Date()) / 864e5); return diff >= 0 && diff <= 30; } catch { return false; }
}

function exportCSV(data, headers, filename) {
  const csv = [headers.join(","), ...data.map(r => headers.map(h => '"' + String(r[h] || "").replace(/"/g, '""') + '"').join(","))].join("\n");
  const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" })); a.download = filename; a.click();
}

export default function App() {
  const [tab, setTab] = useState("opportunities");
  const [opps, setOpps] = useState(SEED_OPPORTUNITIES);
  const [agencies, setAgencies] = useState(SEED_AGENCIES);
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

  const filteredOpps = opps.filter(o => {
    const ms = !search || [o.name, o.org, o.notes, o.country].some(v => (v || "").toLowerCase().includes(search.toLowerCase()));
    return ms && (catFilter === "All" || o.category === catFilter) && (countryFilter === "All" || (o.country || "").includes(countryFilter)) && (statusFilter === "All" || o.appStatus === statusFilter);
  }).sort((a, b) => {
    if (sortBy === "deadline") { const aD = a.deadline && !a.deadline.startsWith("T") && !a.deadline.startsWith("R") ? new Date(a.deadline) : new Date("2099-01-01"); const bD = b.deadline && !b.deadline.startsWith("T") && !b.deadline.startsWith("R") ? new Date(b.deadline) : new Date("2099-01-01"); return aD - bD; }
    if (sortBy === "funding") return (b.fundingAmount || 0) - (a.fundingAmount || 0);
    return a.name.localeCompare(b.name);
  });

  const filteredAgencies = agencies.filter(a => {
    const ms = !search || [a.name, a.city, a.state, a.notes, a.country].some(v => (v || "").toLowerCase().includes(search.toLowerCase()));
    return ms && (countryFilter === "All" || (a.country || "").includes(countryFilter)) && (sizeFilter === "All" || a.size === sizeFilter) && (statusFilter === "All" || a.outreach === statusFilter);
  });

  const stats = {
    total: opps.length, grants: opps.filter(o => o.category === "Grant").length,
    accelerators: opps.filter(o => o.category === "Accelerator").length,
    competitions: opps.filter(o => o.category === "Pitch Competition").length,
    submitted: opps.filter(o => o.appStatus === "Submitted").length,
    urgent: opps.filter(o => isUrgent(o.deadline)).length,
    totalFunding: opps.reduce((s, o) => s + (o.fundingAmount || 0), 0),
  };

  const agencyStats = {
    total: agencies.length, us: agencies.filter(a => a.country === "US").length,
    canada: agencies.filter(a => a.country === "Canada").length,
    uk: agencies.filter(a => a.country === "UK").length,
    contacted: agencies.filter(a => a.outreach !== "Not Started").length,
    pilots: agencies.filter(a => a.outreach === "Pilot Agreed").length,
  };

  function updateOppStatus(id, val) { setOpps(prev => prev.map(o => o.id === id ? { ...o, appStatus: val } : o)); setEditingId(null); }
  function updateAgencyOutreach(id, val) { setAgencies(prev => prev.map(a => a.id === id ? { ...a, outreach: val } : a)); setEditingId(null); }

  async function aiSearch() {
    if (!aiQuery.trim()) return;
    setSearching(true); setAiResults(null);
    try {
      const sys = "You are a research assistant. After searching, respond with ONLY a valid JSON array. No explanation, no markdown. Just the raw JSON array.";
      const prompt = tab === "opportunities"
        ? `Search the web for ${aiQuery}. Relevant to a healthcare AI startup for home care caregiver scheduling. Return ONLY a JSON array with keys: name, org, country, category (must be "Grant", "Accelerator", or "Pitch Competition"), deadline, openDate, fundingAmount (number), fundingDisplay (string), url, notes. Return 5-10 results.`
        : `Search the web for home health care agencies: ${aiQuery}. Return ONLY a JSON array with keys: name, city, state, country, phone, email, website, size (must be "SMB", "Mid-Size", or "Enterprise"), notes. Include real contact details. Return 5-10 results.`;
      const res = await fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 2000, system: sys, tools: [{ type: "web_search_20250305", name: "web_search" }], messages: [{ role: "user", content: prompt }] }) });
      const data = await res.json();
      let allText = ""; for (const b of (data.content || [])) { if (b.type === "text") allText += b.text + "\n"; if (b.type === "mcp_tool_result" && b.content) for (const s of b.content) if (s.text) allText += s.text + "\n"; }
      let clean = allText.replace(/```json|```/g, "").trim(); let parsed = null;
      try { parsed = JSON.parse(clean); } catch {}
      if (!parsed) { const m = clean.match(/\[[\s\S]*\]/); if (m) try { parsed = JSON.parse(m[0]); } catch {} }
      if (!parsed) { const r2 = await fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1500, messages: [{ role: "user", content: `Extract structured data. Return ONLY valid JSON array. Text:\n${clean.substring(0, 2500)}` }] }) }); const d2 = await r2.json(); const t2 = d2.content?.filter(b => b.type === "text").map(b => b.text).join("").replace(/```json|```/g, "").trim(); const m2 = t2.match(/\[[\s\S]*\]/); if (m2) try { parsed = JSON.parse(m2[0]); } catch {} }
      if (parsed && Array.isArray(parsed)) setAiResults(parsed); else setAiResults(null);
    } catch {} setSearching(false);
  }

  function addAiResults() {
    if (!aiResults) return;
    if (tab === "opportunities") { const ex = new Set(opps.map(o => o.name.toLowerCase())); const nw = aiResults.filter(r => r.name && !ex.has(r.name.toLowerCase())).map((r, i) => ({ ...r, id: Date.now() + i, appStatus: "Not Started", fundingAmount: r.fundingAmount || 0 })); setOpps(p => [...p, ...nw]); }
    else { const ex = new Set(agencies.map(a => a.name.toLowerCase())); const nw = aiResults.filter(r => r.name && !ex.has(r.name.toLowerCase())).map((r, i) => ({ ...r, id: Date.now() + i, outreach: "Not Started" })); setAgencies(p => [...p, ...nw]); }
    setAiResults(null); setAiQuery("");
  }

  function resetFilters() { setSearch(""); setCatFilter("All"); setCountryFilter("All"); setStatusFilter("All"); setSizeFilter("All"); }

  const cs = (bg, border) => ({ background: bg, borderLeft: `4px solid ${border}`, borderRadius: 8, padding: "12px 16px", flex: 1, minWidth: 110 });
  const tabBtn = (t) => ({ padding: "10px 24px", cursor: "pointer", fontWeight: 700, fontSize: 14, border: "none", background: tab === t ? TEAL : "transparent", color: tab === t ? "#fff" : GRAY, borderRadius: "8px 8px 0 0", transition: "all 0.2s" });

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#F0F2F5", minHeight: "100vh" }}>
      <div style={{ background: INK, padding: "16px 24px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 20, color: MINT, fontWeight: 800 }}>OptimaVia Command Center</h1>
            <p style={{ margin: "2px 0 0", fontSize: 12, color: GRAY }}>Opportunities · Agencies · Outreach</p>
          </div>
          <button onClick={() => tab === "opportunities" ? exportCSV(filteredOpps, ["name","org","country","category","deadline","fundingDisplay","appStatus","url","notes"], "optimavia_opportunities.csv") : exportCSV(filteredAgencies, ["name","city","state","country","phone","email","website","size","outreach","notes"], "optimavia_agencies.csv")} style={{ padding: "6px 14px", fontSize: 12, fontWeight: 600, background: "transparent", color: MINT, border: `1px solid ${MINT}`, borderRadius: 6, cursor: "pointer" }}>Export CSV</button>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          <button style={tabBtn("opportunities")} onClick={() => { setTab("opportunities"); resetFilters(); setAiResults(null); }}>{"\u{1F4B0}"} Opportunities ({opps.length})</button>
          <button style={tabBtn("agencies")} onClick={() => { setTab("agencies"); resetFilters(); setAiResults(null); }}>{"\u{1F3E5}"} Agencies ({agencies.length})</button>
        </div>
      </div>

      <div style={{ padding: "16px 24px" }}>
        {/* Stats */}
        <div style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
          {tab === "opportunities" ? (<>
            <div style={cs("#fff", TEAL)}><div style={{ fontSize: 22, fontWeight: 800, color: TEAL }}>{stats.total}</div><div style={{ fontSize: 11, color: GRAY }}>Total</div></div>
            <div style={cs("#fff", GREEN)}><div style={{ fontSize: 22, fontWeight: 800, color: GREEN }}>{stats.grants}</div><div style={{ fontSize: 11, color: GRAY }}>Grants</div></div>
            <div style={cs("#fff", PURPLE)}><div style={{ fontSize: 22, fontWeight: 800, color: PURPLE }}>{stats.accelerators}</div><div style={{ fontSize: 11, color: GRAY }}>Accelerators</div></div>
            <div style={cs("#fff", AMBER)}><div style={{ fontSize: 22, fontWeight: 800, color: AMBER }}>{stats.competitions}</div><div style={{ fontSize: 11, color: GRAY }}>Competitions</div></div>
            <div style={cs("#fff", PURPLE)}><div style={{ fontSize: 22, fontWeight: 800, color: PURPLE }}>{stats.submitted}</div><div style={{ fontSize: 11, color: GRAY }}>Submitted</div></div>
            <div style={cs("#fff", ACCENT)}><div style={{ fontSize: 22, fontWeight: 800, color: ACCENT }}>{stats.urgent}</div><div style={{ fontSize: 11, color: GRAY }}>Due 30 days</div></div>
            <div style={cs("#fff", TEAL)}><div style={{ fontSize: 22, fontWeight: 800, color: TEAL }}>${(stats.totalFunding / 1000).toFixed(0)}K</div><div style={{ fontSize: 11, color: GRAY }}>Available</div></div>
          </>) : (<>
            <div style={cs("#fff", TEAL)}><div style={{ fontSize: 22, fontWeight: 800, color: TEAL }}>{agencyStats.total}</div><div style={{ fontSize: 11, color: GRAY }}>Total Agencies</div></div>
            <div style={cs("#fff", "#2563EB")}><div style={{ fontSize: 22, fontWeight: 800, color: "#2563EB" }}>{agencyStats.us}</div><div style={{ fontSize: 11, color: GRAY }}>US</div></div>
            <div style={cs("#fff", ACCENT)}><div style={{ fontSize: 22, fontWeight: 800, color: ACCENT }}>{agencyStats.canada}</div><div style={{ fontSize: 11, color: GRAY }}>Canada</div></div>
            <div style={cs("#fff", PURPLE)}><div style={{ fontSize: 22, fontWeight: 800, color: PURPLE }}>{agencyStats.uk}</div><div style={{ fontSize: 11, color: GRAY }}>UK</div></div>
            <div style={cs("#fff", AMBER)}><div style={{ fontSize: 22, fontWeight: 800, color: AMBER }}>{agencyStats.contacted}</div><div style={{ fontSize: 11, color: GRAY }}>Contacted</div></div>
            <div style={cs("#fff", GREEN)}><div style={{ fontSize: 22, fontWeight: 800, color: GREEN }}>{agencyStats.pilots}</div><div style={{ fontSize: 11, color: GRAY }}>Pilots Agreed</div></div>
          </>)}
        </div>

        {/* AI Search */}
        <div style={{ background: "#fff", borderRadius: 10, padding: 14, marginBottom: 12, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <p style={{ margin: "0 0 6px", fontSize: 12, fontWeight: 700, color: INK }}>{"\u{1F50D}"} AI-Powered Search</p>
          <div style={{ display: "flex", gap: 8 }}>
            <input value={aiQuery} onChange={e => setAiQuery(e.target.value)} onKeyDown={e => e.key === "Enter" && aiSearch()} placeholder={tab === "opportunities" ? 'e.g. "healthcare AI grants 2026"' : 'e.g. "home care agencies in Texas"'} style={{ flex: 1, padding: "8px 12px", fontSize: 13, border: "1px solid #D4D9E2", borderRadius: 6, outline: "none" }} />
            <button onClick={aiSearch} disabled={searching} style={{ padding: "8px 18px", fontSize: 13, fontWeight: 700, background: TEAL, color: "#fff", border: "none", borderRadius: 6, cursor: searching ? "wait" : "pointer", opacity: searching ? 0.7 : 1 }}>{searching ? "Searching..." : "Search"}</button>
          </div>
          {aiResults && (<div style={{ marginTop: 10, padding: 10, background: TEAL_LIGHT, borderRadius: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: TEAL }}>Found {aiResults.length} results</span>
              <button onClick={addAiResults} style={{ padding: "4px 12px", fontSize: 11, fontWeight: 700, background: TEAL, color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }}>+ Add All</button>
            </div>
            {aiResults.map((r, i) => (<div key={i} style={{ fontSize: 12, padding: "3px 0", borderBottom: "1px solid #cde8e8" }}><strong>{r.name}</strong> {r.org && `— ${r.org}`} {r.city && `— ${r.city}`} ({r.country})</div>))}
          </div>)}
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap", alignItems: "center" }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Filter..." style={{ padding: "6px 12px", fontSize: 12, border: "1px solid #D4D9E2", borderRadius: 6, width: 160, outline: "none" }} />
          <select value={countryFilter} onChange={e => setCountryFilter(e.target.value)} style={{ padding: "6px 8px", fontSize: 12, border: "1px solid #D4D9E2", borderRadius: 6, outline: "none" }}>{COUNTRIES.map(o => <option key={o} value={o}>{o === "All" ? "All Countries" : o}</option>)}</select>
          {tab === "opportunities" && (<>
            <select value={catFilter} onChange={e => setCatFilter(e.target.value)} style={{ padding: "6px 8px", fontSize: 12, border: "1px solid #D4D9E2", borderRadius: 6, outline: "none" }}>{CATEGORIES.map(o => <option key={o} value={o}>{o === "All" ? "All Types" : o}</option>)}</select>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ padding: "6px 8px", fontSize: 12, border: "1px solid #D4D9E2", borderRadius: 6, outline: "none" }}><option value="All">All Statuses</option>{STATUSES.map(s => <option key={s} value={s}>{s}</option>)}</select>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ padding: "6px 8px", fontSize: 12, border: "1px solid #D4D9E2", borderRadius: 6, outline: "none" }}><option value="deadline">Sort: Deadline</option><option value="funding">Sort: Funding</option><option value="name">Sort: Name</option></select>
          </>)}
          {tab === "agencies" && (<>
            <select value={sizeFilter} onChange={e => setSizeFilter(e.target.value)} style={{ padding: "6px 8px", fontSize: 12, border: "1px solid #D4D9E2", borderRadius: 6, outline: "none" }}>{SIZES.map(o => <option key={o} value={o}>{o === "All" ? "All Sizes" : o}</option>)}</select>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ padding: "6px 8px", fontSize: 12, border: "1px solid #D4D9E2", borderRadius: 6, outline: "none" }}><option value="All">All Outreach</option>{OUTREACH_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}</select>
          </>)}
          <span style={{ fontSize: 11, color: GRAY }}>{tab === "opportunities" ? filteredOpps.length : filteredAgencies.length} results</span>
        </div>

        {/* Table */}
        <div style={{ background: "#fff", borderRadius: 10, overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <div style={{ overflowX: "auto" }}>
            {tab === "opportunities" ? (
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                <thead><tr style={{ background: INK }}>{["Category","Opportunity","Organization","Country","Deadline","Funding","Status","Notes"].map(h => <th key={h} style={{ padding: "9px 10px", textAlign: "left", color: "#fff", fontWeight: 700, fontSize: 10.5, textTransform: "uppercase", letterSpacing: 0.5, whiteSpace: "nowrap" }}>{h}</th>)}</tr></thead>
                <tbody>
                  {filteredOpps.map((o, i) => (
                    <tr key={o.id} style={{ borderBottom: "1px solid #F0F2F5", background: isUrgent(o.deadline) ? "#FEF3C7" : i % 2 === 0 ? "#fff" : LIGHT_BG }}>
                      <td style={{ padding: "8px 10px" }}><Badge text={getCategoryIcon(o.category) + " " + o.category} color={getCategoryColor(o.category)} /></td>
                      <td style={{ padding: "8px 10px", fontWeight: 600, maxWidth: 220 }}>{o.url ? <a href={o.url.startsWith("http") ? o.url : "https://" + o.url} target="_blank" rel="noopener noreferrer" style={{ color: TEAL, textDecoration: "none" }}>{o.name}</a> : o.name}</td>
                      <td style={{ padding: "8px 10px", color: INK }}>{o.org}</td>
                      <td style={{ padding: "8px 10px", color: GRAY }}>{o.country}</td>
                      <td style={{ padding: "8px 10px", whiteSpace: "nowrap", fontWeight: isUrgent(o.deadline) ? 700 : 400, color: isUrgent(o.deadline) ? ACCENT : INK }}>{formatDeadline(o.deadline)}</td>
                      <td style={{ padding: "8px 10px", color: INK, fontWeight: 600, whiteSpace: "nowrap" }}>{o.fundingDisplay || "\u2014"}</td>
                      <td style={{ padding: "8px 10px" }}>{editingId === o.id ? <select autoFocus value={o.appStatus} onChange={e => updateOppStatus(o.id, e.target.value)} onBlur={() => setEditingId(null)} style={{ fontSize: 11, padding: "2px 4px", borderRadius: 6, border: "1px solid #D4D9E2" }}>{STATUSES.map(s => <option key={s} value={s}>{s}</option>)}</select> : <span onClick={() => setEditingId(o.id)} style={{ cursor: "pointer" }} title="Click to change"><Badge text={o.appStatus} color={getStatusColor(o.appStatus)} /></span>}</td>
                      <td style={{ padding: "8px 10px", color: GRAY, fontSize: 11, maxWidth: 250 }}>{o.notes}</td>
                    </tr>
                  ))}
                  {filteredOpps.length === 0 && <tr><td colSpan={8} style={{ padding: 32, textAlign: "center", color: GRAY }}>No opportunities match your filters.</td></tr>}
                </tbody>
              </table>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                <thead><tr style={{ background: INK }}>{["Agency","City","State","Country","Phone","Website","Size","Outreach","Notes"].map(h => <th key={h} style={{ padding: "9px 10px", textAlign: "left", color: "#fff", fontWeight: 700, fontSize: 10.5, textTransform: "uppercase", letterSpacing: 0.5, whiteSpace: "nowrap" }}>{h}</th>)}</tr></thead>
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
                      <td style={{ padding: "8px 10px" }}>{editingId === a.id ? <select autoFocus value={a.outreach} onChange={e => updateAgencyOutreach(a.id, e.target.value)} onBlur={() => setEditingId(null)} style={{ fontSize: 11, padding: "2px 4px", borderRadius: 6, border: "1px solid #D4D9E2" }}>{OUTREACH_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}</select> : <span onClick={() => setEditingId(a.id)} style={{ cursor: "pointer" }} title="Click to change"><Badge text={a.outreach} color={getOutreachColor(a.outreach)} /></span>}</td>
                      <td style={{ padding: "8px 10px", color: GRAY, fontSize: 11, maxWidth: 220 }}>{a.notes}</td>
                    </tr>
                  ))}
                  {filteredAgencies.length === 0 && <tr><td colSpan={9} style={{ padding: 32, textAlign: "center", color: GRAY }}>No agencies match your filters.</td></tr>}
                </tbody>
              </table>
            )}
          </div>
        </div>
        <p style={{ fontSize: 10, color: GRAY, textAlign: "center", margin: "12px 0 0" }}>Click any status badge to update · Use AI Search to discover more · Export to CSV for your CRM</p>
      </div>
    </div>
  );
}
