import type { Verdict } from "@/components/stophole";

export interface Signal {
  label: string;
  score: number; // 0..5
  evidence: string;
}

export interface Candidate {
  id: string;
  name: string;
  party: string;
  isIncumbent: boolean;
  tenureYears?: number;
  contactability: "reachable" | "partial" | "ghost";
  signals: Signal[]; // 5 signals — Pothole Test
}

export interface CommunityNote {
  author: string;
  ago: string;
  text: string;
  raw?: boolean;
}

export interface CaseFile {
  id: string;
  title: string; // "Rivonia Rd"
  cross: string; // "Katherine St."
  wardId: string;
  authority: string;
  daysOpen: number;
  reports: number;
  refills: number;
  lat: number;
  lng: number;
  ownerSignals: Array<{ icon: "phone" | "alert" | "money"; text: string; tone: "red" | "amber" | "green" }>;
  notes: CommunityNote[];
}

export interface Ward {
  id: string;
  number: number;
  area: string; // e.g. "Sandton"
  municipalityCode: string;
  municipalityName: string;
  auditorGeneralStatus: string;
  governanceNotes: string;
  totalSalaryBudgetZar: number;
  totalStaffCount: number;
  actualMaintenanceSpendZar: number;
  avgHouseholdIncomeMonthlyZar: number;
  votingStation: {
    name: string;
    address: string;
    hours: string;
    distanceKm: number;
  };
  candidates: Candidate[];
  cases: CaseFile[];
  centroid: { lat: number; lng: number };
  // Extended ward profile (optional — Ward 32 demo is fully populated)
  suburbs?: string[];
  households?: number;
  avgHouseholdDensity?: number;
  repairCostPerM2?: { min: number; max: number };
  neglectMultiplier?: number;
  infra?: {
    capitalGrantsZar: number;
    maintenanceSpendZar: number;
    returnedToTreasuryZar: number;
  };
  auditNote?: string;
  payroll?: {
    totalPerYearZar: number;
    avgAnnualZar: number;
    headcount: number;
    note?: string;
  };
  electionDate?: string;
  potholesPreloaded?: number;
  incumbentElectedCycle?: string;
}

export const ELECTION_DATE_ISO = "2026-11-04";

export const SIGNAL_LABELS = [
  "Proven fix rate",
  "Time-to-action",
  "Budget conversion",
  "System presence",
  "Local accountability",
] as const;

// ============================================================
// WARDS
// ============================================================

export const WARDS: Ward[] = [
  {
    id: "JHB_WARD102",
    number: 102,
    area: "Sandton",
    municipalityCode: "JHB",
    municipalityName: "City of Johannesburg",
    auditorGeneralStatus: "Qualified audit",
    governanceNotes: "Material findings on supply chain and infrastructure spend (AGSA 2024)",
    totalSalaryBudgetZar: 9_840_000_000,
    totalStaffCount: 28_400,
    actualMaintenanceSpendZar: 412_000_000,
    avgHouseholdIncomeMonthlyZar: 8_240,
    votingStation: {
      name: "Rivonia Primary School",
      address: "9 Mutual Rd, Rivonia",
      hours: "07:00–21:00",
      distanceKm: 1.2,
    },
    centroid: { lat: -26.0571, lng: 28.0567 },
    candidates: [
      {
        id: "jhb102_naledi",
        name: "Naledi Khumalo",
        party: "Independent",
        isIncumbent: false,
        contactability: "reachable",
        signals: [
          { label: "Proven fix rate", score: 5, evidence: "Led 14 verified pothole patches via residents' association in 2024." },
          { label: "Time-to-action", score: 4, evidence: "Median response 6 days on logged complaints." },
          { label: "Budget conversion", score: 4, evidence: "Tracked R860k ward fund — published itemised receipts." },
          { label: "System presence", score: 5, evidence: "Monthly ward report, public WhatsApp line answered by her." },
          { label: "Local accountability", score: 5, evidence: "Lifelong Ward 102 resident. Listed home address." },
        ],
      },
      {
        id: "jhb102_pieter",
        name: "Pieter van Wyk",
        party: "DA",
        isIncumbent: false,
        contactability: "partial",
        signals: [
          { label: "Proven fix rate", score: 3, evidence: "Ward committee 2 years. Co-signed 4 patches." },
          { label: "Time-to-action", score: 3, evidence: "Replies within 2 weeks on average." },
          { label: "Budget conversion", score: 2, evidence: "No published spend trail yet." },
          { label: "System presence", score: 3, evidence: "Active on neighbourhood group. No formal channel." },
          { label: "Local accountability", score: 3, evidence: "Lives in Ward 103, commutes to ward meetings." },
        ],
      },
      {
        id: "jhb102_john",
        name: "John Mokoena",
        party: "ANC",
        isIncumbent: true,
        tenureYears: 12,
        contactability: "ghost",
        signals: [
          { label: "Proven fix rate", score: 1, evidence: "1 visible patch since 2021, failed within 3 weeks." },
          { label: "Time-to-action", score: 1, evidence: "Median response > 90 days." },
          { label: "Budget conversion", score: 0, evidence: "R1.2m allocated to ward 102 infrastructure (2023/24) — no visible delivery." },
          { label: "System presence", score: 1, evidence: "Unreachable on 3 of 5 official numbers." },
          { label: "Local accountability", score: 1, evidence: "Appears in ward only in election months." },
        ],
      },
      {
        id: "jhb102_thandi",
        name: "Thandi Sithole",
        party: "EFF",
        isIncumbent: false,
        contactability: "partial",
        signals: [
          { label: "Proven fix rate", score: 2, evidence: "Organised one community fill on Rivonia Rd." },
          { label: "Time-to-action", score: 3, evidence: "Replies within a week on social media." },
          { label: "Budget conversion", score: 1, evidence: "No prior office or budget responsibility." },
          { label: "System presence", score: 2, evidence: "Newsletter monthly. No phone line." },
          { label: "Local accountability", score: 3, evidence: "Resident, but first time standing." },
        ],
      },
      {
        id: "jhb102_mandla",
        name: "Mandla Dube",
        party: "ActionSA",
        isIncumbent: false,
        contactability: "reachable",
        signals: [
          { label: "Proven fix rate", score: 3, evidence: "Fixed 6 streetlights in Ward 104 as committee member." },
          { label: "Time-to-action", score: 4, evidence: "Median response 4 days." },
          { label: "Budget conversion", score: 3, evidence: "Posted itemised spend for Ward 104 in 2024." },
          { label: "System presence", score: 4, evidence: "Weekly walkabout, listed mobile." },
          { label: "Local accountability", score: 3, evidence: "Moved into Ward 102 in 2025 to contest." },
        ],
      },
    ],
    cases: [
      {
        id: "jhb102-rivonia-katherine",
        title: "Rivonia Rd",
        cross: "@ Katherine St.",
        wardId: "JHB_WARD102",
        authority: "Johannesburg Roads Agency (JRA)",
        daysOpen: 102,
        reports: 38,
        refills: 2,
        lat: -26.0571,
        lng: 28.0567,
        ownerSignals: [
          { icon: "phone", text: "Unreachable on 3 of 5 numbers", tone: "red" },
          { icon: "alert", text: "Same pothole — 4 election cycles", tone: "red" },
          { icon: "money", text: "R1.2m allocated · R0 visible", tone: "red" },
        ],
        notes: [
          {
            author: "Thandi M.",
            ago: "4d",
            text: "Nobody owns it when you phone. The JRA bounces you to the ward office. The office bounces you back.",
          },
          {
            author: "Sipho K.",
            ago: "1w",
            text: "They poured cold-mix in March. Lasted one storm. Same hole, same week. We are not stupid.",
          },
          {
            author: "Resident · 102",
            ago: "2w",
            text: "He only shows up two months before elections. The rest of the time? Ghost.",
            raw: true,
          },
        ],
      },
      {
        id: "jhb102-grayston",
        title: "Grayston off-ramp",
        cross: "M1 north",
        wardId: "JHB_WARD102",
        authority: "SANRAL",
        daysOpen: 6,
        reports: 4,
        refills: 0,
        lat: -26.1015,
        lng: 28.0598,
        ownerSignals: [
          { icon: "phone", text: "SANRAL acknowledged within 24h", tone: "green" },
          { icon: "alert", text: "Crew dispatched", tone: "green" },
        ],
        notes: [
          {
            author: "Lerato N.",
            ago: "2d",
            text: "Saw a SANRAL truck this morning. Cones up, looks like they are actually doing it.",
          },
        ],
      },
    ],
  },
  {
    id: "CPT_WARD55",
    number: 55,
    area: "Observatory",
    municipalityCode: "CPT",
    municipalityName: "City of Cape Town",
    auditorGeneralStatus: "Clean audit",
    governanceNotes: "No material findings on infrastructure spend (AGSA 2024)",
    totalSalaryBudgetZar: 8_120_000_000,
    totalStaffCount: 26_800,
    actualMaintenanceSpendZar: 1_240_000_000,
    avgHouseholdIncomeMonthlyZar: 14_800,
    votingStation: {
      name: "Observatory Community Centre",
      address: "30 Lower Main Rd, Observatory",
      hours: "07:00–21:00",
      distanceKm: 0.6,
    },
    centroid: { lat: -33.9381, lng: 18.4731 },
    candidates: [
      {
        id: "cpt55_amira",
        name: "Amira Daniels",
        party: "Independent",
        isIncumbent: false,
        contactability: "reachable",
        signals: [
          { label: "Proven fix rate", score: 5, evidence: "Co-led the Lower Main pavement programme — 19 visible repairs." },
          { label: "Time-to-action", score: 5, evidence: "Median response 2 days on logged complaints." },
          { label: "Budget conversion", score: 4, evidence: "Itemised Ward 55 maintenance spend published quarterly." },
          { label: "System presence", score: 4, evidence: "Weekly ward surgery at Obs Library." },
          { label: "Local accountability", score: 5, evidence: "Born and raised in the ward." },
        ],
      },
      {
        id: "cpt55_brett",
        name: "Brett Williams",
        party: "DA",
        isIncumbent: true,
        tenureYears: 5,
        contactability: "reachable",
        signals: [
          { label: "Proven fix rate", score: 4, evidence: "Closed 62% of logged road defects in last cycle." },
          { label: "Time-to-action", score: 4, evidence: "Median 9 days response." },
          { label: "Budget conversion", score: 4, evidence: "Ward fund fully spent, audited clean." },
          { label: "System presence", score: 4, evidence: "Monthly newsletter, published mobile number." },
          { label: "Local accountability", score: 3, evidence: "Lives in adjacent ward. Visible in Obs weekly." },
        ],
      },
      {
        id: "cpt55_zola",
        name: "Zola Mbeki",
        party: "GOOD",
        isIncumbent: false,
        contactability: "partial",
        signals: [
          { label: "Proven fix rate", score: 2, evidence: "Two community clean-ups organised in 2024." },
          { label: "Time-to-action", score: 2, evidence: "Replies within 2 weeks." },
          { label: "Budget conversion", score: 1, evidence: "No prior office." },
          { label: "System presence", score: 2, evidence: "Facebook page, no formal channel." },
          { label: "Local accountability", score: 3, evidence: "Resident since 2019." },
        ],
      },
      {
        id: "cpt55_andre",
        name: "André du Toit",
        party: "PA",
        isIncumbent: false,
        contactability: "ghost",
        signals: [
          { label: "Proven fix rate", score: 0, evidence: "No verifiable record." },
          { label: "Time-to-action", score: 1, evidence: "No reply on listed contacts." },
          { label: "Budget conversion", score: 0, evidence: "No prior office or budget." },
          { label: "System presence", score: 1, evidence: "Party-issued boilerplate only." },
          { label: "Local accountability", score: 1, evidence: "Address outside Ward 55." },
        ],
      },
    ],
    cases: [
      {
        id: "cpt55-lower-main",
        title: "Lower Main Rd",
        cross: "@ Trill Rd",
        wardId: "CPT_WARD55",
        authority: "City of Cape Town Roads",
        daysOpen: 18,
        reports: 11,
        refills: 0,
        lat: -33.9381,
        lng: 18.4731,
        ownerSignals: [
          { icon: "phone", text: "Ward office answered first call", tone: "green" },
          { icon: "alert", text: "Inspector logged within 5 days", tone: "amber" },
          { icon: "money", text: "Ward fund 91% spent, audited", tone: "green" },
        ],
        notes: [
          {
            author: "Devon P.",
            ago: "5d",
            text: "Phoned, got a reference number same day. Still waiting for the actual fill though.",
          },
          {
            author: "Kim S.",
            ago: "1w",
            text: "Cones went up Tuesday. Hopeful but cautious.",
          },
        ],
      },
    ],
  },
  // ============================================================
  // WARD 32 — Matjhabeng (Welkom CBD) — fully populated demo ward
  // ============================================================
  {
    id: "WD_MATJ_32",
    number: 32,
    area: "Welkom CBD",
    municipalityCode: "MATJ",
    municipalityName: "Matjhabeng Local Municipality",
    auditorGeneralStatus: "Qualified Opinion",
    governanceNotes:
      "Flagged as technically insolvent; under provincial administration due to severe debt.",
    totalSalaryBudgetZar: 1_120_000_000,
    totalStaffCount: 3_512,
    actualMaintenanceSpendZar: 13_700_000,
    avgHouseholdIncomeMonthlyZar: 4_120,
    votingStation: {
      name: "Welkom Civic Hall",
      address: "Stateway, Welkom Central",
      hours: "07:00–21:00",
      distanceKm: 0.9,
    },
    centroid: { lat: -27.9784, lng: 26.7359 },
    suburbs: [
      "Welkom CBD",
      "Jan Cilliers Park",
      "Sandania",
      "Reitz Park",
      "Voorspoed",
    ],
    households: 3_738,
    avgHouseholdDensity: 2.7,
    repairCostPerM2: { min: 700, max: 1_500 },
    neglectMultiplier: 18,
    infra: {
      capitalGrantsZar: 202_900_000,
      maintenanceSpendZar: 13_700_000,
      returnedToTreasuryZar: 209_000_000,
    },
    auditNote:
      "Critical infrastructure neglect — ~R209M grant money returned to National Treasury, unspent.",
    payroll: {
      totalPerYearZar: 1_120_000_000,
      avgAnnualZar: 319_611,
      headcount: 3_512,
      note: "National government recently suspended parts of this payroll after a R150M ghost-employee and overpayment scandal.",
    },
    electionDate: ELECTION_DATE_ISO,
    potholesPreloaded: 12,
    incumbentElectedCycle: "November 2021",
    candidates: [
      {
        id: "matj32_rene",
        name: "René Steyn",
        party: "DA",
        isIncumbent: true,
        tenureYears: 5,
        contactability: "partial",
        signals: [
          { label: "Proven fix rate", score: 2, evidence: "Few visible repairs in CBD this cycle." },
          { label: "Time-to-action", score: 2, evidence: "Median response ~30 days on logged complaints." },
          { label: "Budget conversion", score: 1, evidence: "R209M in capital grants returned to Treasury unspent." },
          { label: "System presence", score: 3, evidence: "Active in council, public Facebook page." },
          { label: "Local accountability", score: 3, evidence: "Resident of Ward 32." },
        ],
      },
      {
        id: "matj32_thabo",
        name: "Thabo Molefe",
        party: "ANC",
        isIncumbent: false,
        contactability: "partial",
        signals: [
          { label: "Proven fix rate", score: 2, evidence: "Co-organised street-light drive in Reitz Park 2024." },
          { label: "Time-to-action", score: 2, evidence: "Replies on WhatsApp within ~10 days." },
          { label: "Budget conversion", score: 1, evidence: "No prior office; party-aligned with current administration." },
          { label: "System presence", score: 3, evidence: "Monthly community meeting at Welkom Civic Hall." },
          { label: "Local accountability", score: 3, evidence: "Born in Welkom, lives in Sandania." },
        ],
      },
      {
        id: "matj32_lerato",
        name: "Lerato Mokoena",
        party: "EFF",
        isIncumbent: false,
        contactability: "reachable",
        signals: [
          { label: "Proven fix rate", score: 3, evidence: "Led community fill on Stateway in 2025." },
          { label: "Time-to-action", score: 4, evidence: "Replies same week on listed mobile." },
          { label: "Budget conversion", score: 2, evidence: "First time standing — no spend record." },
          { label: "System presence", score: 3, evidence: "WhatsApp broadcast list, weekly walkabout." },
          { label: "Local accountability", score: 4, evidence: "Resident, raised in Voorspoed." },
        ],
      },
      {
        id: "matj32_johan",
        name: "Johan Pretorius",
        party: "FF+",
        isIncumbent: false,
        contactability: "reachable",
        signals: [
          { label: "Proven fix rate", score: 3, evidence: "Three verified patches with Jan Cilliers ratepayers." },
          { label: "Time-to-action", score: 4, evidence: "Median response 5 days." },
          { label: "Budget conversion", score: 3, evidence: "Publishes monthly ratepayer report." },
          { label: "System presence", score: 3, evidence: "Listed mobile, attends ward committee." },
          { label: "Local accountability", score: 4, evidence: "Lifelong Welkom resident." },
        ],
      },
      {
        id: "matj32_nomsa",
        name: "Nomsa Khoza",
        party: "Independent",
        isIncumbent: false,
        contactability: "reachable",
        signals: [
          { label: "Proven fix rate", score: 4, evidence: "Documented 9 verified pothole fills via residents' WhatsApp group." },
          { label: "Time-to-action", score: 4, evidence: "Median response 3 days." },
          { label: "Budget conversion", score: 3, evidence: "No prior office; pledges itemised ward fund spend." },
          { label: "System presence", score: 4, evidence: "Public WhatsApp line, monthly written report." },
          { label: "Local accountability", score: 5, evidence: "Lives in Welkom CBD, listed home address." },
        ],
      },
    ],
    cases: matjhabeng32Cases(),
  },
];

function matjhabeng32Cases(): CaseFile[] {
  const wardId = "WD_MATJ_32";
  const authority = "Matjhabeng Roads & Stormwater";
  // 12 preloaded potholes scattered around the Welkom CBD centroid.
  const seeds: Array<{
    id: string;
    title: string;
    cross: string;
    daysOpen: number;
    reports: number;
    refills: number;
    lat: number;
    lng: number;
    suburb: string;
  }> = [
    { id: "matj32-stateway-tempest",   title: "Stateway",          cross: "@ Tempest Rd",       daysOpen: 412, reports: 64, refills: 3, lat: -27.9772, lng: 26.7338, suburb: "Welkom CBD" },
    { id: "matj32-buiten-arrarat",     title: "Buiten St",         cross: "@ Arrarat Ave",      daysOpen: 287, reports: 41, refills: 2, lat: -27.9795, lng: 26.7401, suburb: "Welkom CBD" },
    { id: "matj32-jan-cilliers-1",     title: "Long Rd",           cross: "@ Jan Cilliers Park", daysOpen: 198, reports: 23, refills: 1, lat: -27.9712, lng: 26.7268, suburb: "Jan Cilliers Park" },
    { id: "matj32-sandania-school",    title: "Sandania Cres",     cross: "@ Primary School",   daysOpen: 144, reports: 17, refills: 0, lat: -27.9851, lng: 26.7295, suburb: "Sandania" },
    { id: "matj32-reitz-koppie",       title: "Reitz Ave",         cross: "@ Koppie St",        daysOpen: 96,  reports: 12, refills: 0, lat: -27.9826, lng: 26.7458, suburb: "Reitz Park" },
    { id: "matj32-voorspoed-mine",     title: "Voorspoed Rd",      cross: "@ Mine Gate 4",      daysOpen: 73,  reports: 9,  refills: 0, lat: -27.9697, lng: 26.7501, suburb: "Voorspoed" },
    { id: "matj32-stateway-mall",      title: "Stateway",          cross: "@ Goldfields Mall",  daysOpen: 52,  reports: 14, refills: 1, lat: -27.9758, lng: 26.7372, suburb: "Welkom CBD" },
    { id: "matj32-pres-brand",         title: "President Brand St", cross: "@ OK Bazaars",       daysOpen: 41,  reports: 8,  refills: 0, lat: -27.9778, lng: 26.7384, suburb: "Welkom CBD" },
    { id: "matj32-koppie-alley",       title: "Koppie Alley",       cross: "@ Reitz Park gate",  daysOpen: 33,  reports: 6,  refills: 0, lat: -27.9809, lng: 26.7470, suburb: "Reitz Park" },
    { id: "matj32-jc-rugby",           title: "Rugby Rd",           cross: "@ JC Sportsground",  daysOpen: 21,  reports: 5,  refills: 0, lat: -27.9722, lng: 26.7244, suburb: "Jan Cilliers Park" },
    { id: "matj32-sandania-clinic",    title: "Sandania Ave",       cross: "@ Day Clinic",       daysOpen: 12,  reports: 3,  refills: 0, lat: -27.9874, lng: 26.7312, suburb: "Sandania" },
    { id: "matj32-cbd-taxi-rank",      title: "Bok St",             cross: "@ Taxi Rank",        daysOpen: 4,   reports: 2,  refills: 0, lat: -27.9764, lng: 26.7355, suburb: "Welkom CBD" },
  ];
  return seeds.map((s) => {
    const tone: "red" | "amber" | "green" =
      s.daysOpen > 60 ? "red" : s.daysOpen > 14 ? "amber" : "green";
    return {
      id: s.id,
      title: s.title,
      cross: s.cross,
      wardId,
      authority,
      daysOpen: s.daysOpen,
      reports: s.reports,
      refills: s.refills,
      lat: s.lat,
      lng: s.lng,
      ownerSignals: [
        {
          icon: "money",
          text: "R209M in grants returned to Treasury unspent",
          tone: "red",
        },
        {
          icon: "alert",
          text: `${s.suburb} · ${s.daysOpen} days open`,
          tone,
        },
        {
          icon: "phone",
          text: "Municipality under provincial administration",
          tone: "amber",
        },
      ],
      notes: [
        {
          author: `${s.suburb} resident`,
          ago: `${Math.max(1, Math.round(s.daysOpen / 14))}w`,
          text: `Reported ${s.title} ${s.cross} months ago. Nothing. We dodge it every morning.`,
          raw: true,
        },
      ],
    };
  });
}

// ============================================================
// Helpers
// ============================================================

export function getWard(id: string): Ward | undefined {
  return WARDS.find((w) => w.id === id);
}

export function getCase(id: string): { ward: Ward; case: CaseFile } | undefined {
  for (const ward of WARDS) {
    const c = ward.cases.find((x) => x.id === id);
    if (c) return { ward, case: c };
  }
  return undefined;
}

export function getCandidate(id: string): { ward: Ward; candidate: Candidate } | undefined {
  for (const ward of WARDS) {
    const c = ward.candidates.find((x) => x.id === id);
    if (c) return { ward, candidate: c };
  }
  return undefined;
}

export function avgSignalScore(candidate: Candidate): number {
  if (!candidate.signals.length) return 0;
  const sum = candidate.signals.reduce((acc, s) => acc + s.score, 0);
  return sum / candidate.signals.length;
}

export function verdictFor(candidate: Candidate): Verdict {
  const avg = avgSignalScore(candidate);
  if (avg >= 4) return "green";
  if (avg >= 2) return "amber";
  return "red";
}

export function verdictLabel(v: Verdict): string {
  return v === "green" ? "Proven" : v === "amber" ? "Partial" : "Replace";
}

export function sortedCandidates(ward: Ward): Candidate[] {
  const order: Record<Verdict, number> = { green: 0, amber: 1, red: 2 };
  return [...ward.candidates].sort((a, b) => {
    if (a.isIncumbent && !b.isIncumbent) return -1;
    if (!a.isIncumbent && b.isIncumbent) return 1;
    const va = verdictFor(a);
    const vb = verdictFor(b);
    if (order[va] !== order[vb]) return order[va] - order[vb];
    return avgSignalScore(b) - avgSignalScore(a);
  });
}

function haversineKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export function resolveAccountability(lat: number, lng: number): Ward {
  // Stand-in for a real PostGIS ST_Contains lookup — pick nearest ward centroid.
  let best = WARDS[0];
  let bestDist = Infinity;
  for (const ward of WARDS) {
    const d = haversineKm({ lat, lng }, ward.centroid);
    if (d < bestDist) {
      best = ward;
      bestDist = d;
    }
  }
  return best;
}

export function daysUntilElection(today = new Date()): number {
  const election = new Date(ELECTION_DATE_ISO);
  const diff = election.getTime() - today.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export function formatZar(n: number): string {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    maximumFractionDigits: 0,
  }).format(n);
}

export function formatZarCompact(n: number): string {
  return new Intl.NumberFormat("en-ZA", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(n);
}

/**
 * The PRD exposure copy block, written from the seeded ward + case.
 */
export function exposureCopy(ward: Ward, caseFile: CaseFile): string {
  const incumbent = ward.candidates.find((c) => c.isIncumbent);
  const perWorker = ward.totalSalaryBudgetZar / Math.max(1, ward.totalStaffCount);
  return [
    `📍 Point-of-Failure Located: ${ward.municipalityName}, Ward ${ward.number}`,
    "",
    "You are standing at an unresolved pothole. Here is the objective data regarding the public official responsible for maintaining this exact piece of road:",
    "",
    incumbent
      ? `• Incumbent Responsible: ${incumbent.name} (${incumbent.party})`
      : "• Incumbent Responsible: vacant — by-election pending",
    incumbent?.tenureYears != null
      ? `• Length of Tenure: ${incumbent.tenureYears} Years`
      : "",
    `• Household Income Context: families here survive on an average of ${formatZar(ward.avgHouseholdIncomeMonthlyZar)}/month.`,
    "",
    "How Your Rates & Taxes Were Allocated (municipality-wide aggregates — not ward line items):",
    `• Municipal Salary Payroll: ${formatZar(ward.totalSalaryBudgetZar)} paid out last year.`,
    `• Average Municipal Worker Salary: ${formatZar(perWorker)} / year (~${formatZar(perWorker / 12)} / month).`,
    `• Total Infrastructure Maintenance Spent: ${formatZar(ward.actualMaintenanceSpendZar)} was actually used to fix potholes across the entire municipality.`,
    `• Audit Status: ${ward.auditorGeneralStatus} — ${ward.governanceNotes}.`,
    "",
    "The average cost to patch 1 m² of road properly is R700 – R1,500. Ignoring it costs taxpayers up to 18 times more in total future road reconstruction.",
    "",
    `This public job is open for applications. The final decision on whether ${incumbent?.name ?? "the next councillor"} keeps this job will be made by voters on 4 November 2026.`,
  ]
    .filter(Boolean)
    .join("\n");
}