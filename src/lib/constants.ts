import { PoliticalParty, ProvinceData, AuditEntry } from '@/types';

// ── Political Parties ──
export const PARTIES: PoliticalParty[] = [
  { id: 'p1', nameEn: 'Rastriya Swatantra Party', nameNe: 'राष्ट्रिय स्वतन्त्र पार्टी', symbol: 'bell', color: '#2B6CB0', descriptionEn: 'Reformist party focused on governance and transparency.', descriptionNe: 'सुशासन र पारदर्शितामा केन्द्रित सुधारवादी दल।' },
  { id: 'p2', nameEn: 'Nepali Congress', nameNe: 'नेपाली कांग्रेस', symbol: 'tree', color: '#2F855A', descriptionEn: 'Democratic socialist political party.', descriptionNe: 'प्रजातान्त्रिक समाजवादी राजनीतिक दल।' },
  { id: 'p3', nameEn: 'CPN (UML)', nameNe: 'नेकपा (एमाले)', symbol: 'sun', color: '#C53030', descriptionEn: 'Marxist–Leninist communist party.', descriptionNe: 'मार्क्सवादी-लेनिनवादी कम्युनिस्ट पार्टी।' },
  { id: 'p4', nameEn: 'Nepali Communist Party', nameNe: 'नेपाली कम्युनिस्ट पार्टी', symbol: 'star', color: '#9B2C2C', descriptionEn: 'Coalition of left-wing forces.', descriptionNe: 'वामपन्थी शक्तिहरूको गठबन्धन।' },
  { id: 'p5', nameEn: 'Shram Sanskriti Party', nameNe: 'श्रम संस्कृति पार्टी', symbol: 'soil', color: '#744210', descriptionEn: 'Workers rights and labor culture.', descriptionNe: 'श्रमिक अधिकार र श्रम संस्कृति।' },
  { id: 'p6', nameEn: 'Rastriya Prajatantra Party', nameNe: 'राष्ट्रिय प्रजातन्त्र पार्टी', symbol: 'plow', color: '#C05621', descriptionEn: 'Right-wing party for constitutional monarchy.', descriptionNe: 'संवैधानिक राजतन्त्रको पक्षमा रहेको दल।' },
  { id: 'p7', nameEn: 'Janamat Party', nameNe: 'जनमत पार्टी', symbol: 'tap', color: '#2C5282', descriptionEn: 'Focus on social justice and public opinion.', descriptionNe: 'सामाजिक न्याय र जनमतमा केन्द्रित।' },
  { id: 'p8', nameEn: 'Nagarik Unmukti Party', nameNe: 'नागरिक उन्मुक्ति पार्टी', symbol: 'oxen', color: '#276749', descriptionEn: 'Advocating for citizen liberation.', descriptionNe: 'नागरिक उन्मुक्तिको वकालत गर्ने दल।' },
  { id: 'p9', nameEn: 'People\'s Socialist Party', nameNe: 'जनता समाजवादी पार्टी', symbol: 'umbrella', color: '#702459', descriptionEn: 'Social democratic party.', descriptionNe: 'सामाजिक लोकतान्त्रिक दल।' },
  { id: 'p10', nameEn: 'Loktantrik Samajwadi Party', nameNe: 'लोकतान्त्रिक समाजवादी पार्टी', symbol: 'bicycle', color: '#2D3748', descriptionEn: 'Democratic and socialist ideology.', descriptionNe: 'लोकतान्त्रिक र समाजवादी विचारधारा।' },
  { id: 'p11', nameEn: 'Aam Janata Party', nameNe: 'आम जनता पार्टी', symbol: 'mobile', color: '#805AD5', descriptionEn: 'Party of the common people.', descriptionNe: 'आम जनताको दल।' },
  { id: 'p12', nameEn: 'Mongol National Organisation', nameNe: 'मंगोल नेशनल अर्गनाइजेसन', symbol: 'rooster', color: '#D69E2E', descriptionEn: 'Representation of Mongol indigenous groups.', descriptionNe: 'मंगोल आदिवासी समूहहरूको प्रतिनिधित्व।' },
  { id: 'p13', nameEn: 'Nepal Workers and Peasants Party', nameNe: 'नेपाल मजदुर किसान पार्टी', symbol: 'madal', color: '#C53030', descriptionEn: 'Communist party representing labor and farmers.', descriptionNe: 'मजदुर र किसानको प्रतिनिधित्व गर्ने कम्युनिस्ट पार्टी।' },
  { id: 'p14', nameEn: 'Rastriya Janamorcha', nameNe: 'राष्ट्रिय जनमोर्चा', symbol: 'glass', color: '#4A5568', descriptionEn: 'Left-wing nationalist party.', descriptionNe: 'वामपन्थी राष्ट्रवादी दल।' },
  { id: 'p15', nameEn: 'Ujyaalo Nepal Party', nameNe: 'उज्यालो नेपाल पार्टी', symbol: 'bulb', color: '#ECC94B', descriptionEn: 'Focus on energy and light.', descriptionNe: 'ऊर्जा र उज्यालोमा केन्द्रित।' },
  { id: 'p16', nameEn: 'Bibeksheel Sajha Party', nameNe: 'विवेकशील साझा पार्टी', symbol: 'scale', color: '#319795', descriptionEn: 'Value-based political party.', descriptionNe: 'मूल्य-मान्यतामा आधारित दल।' },
  { id: 'p17', nameEn: 'Hamro Nepali Party', nameNe: 'हाम्रो नेपाली पार्टी', symbol: 'stick', color: '#2C5282', descriptionEn: 'Citizen-led representation.', descriptionNe: 'नागरिक नेतृत्वको प्रतिनिधित्व।' },
  { id: 'p18', nameEn: 'CPN (Maoist) (2025)', nameNe: 'नेकपा (माओवादी) (२०२५)', symbol: 'rose', color: '#E53E3E', descriptionEn: 'New Maoist faction.', descriptionNe: 'नयाँ माओवादी गुट।' },
  { id: 'p19', nameEn: 'Nepal Janata Party', nameNe: 'नेपाल जनता पार्टी', symbol: 'man', color: '#ED8936', descriptionEn: 'People-centric representation.', descriptionNe: 'जनता-केन्द्रित प्रतिनिधित्व।' },
  { id: 'p20', nameEn: 'Janadesh Party', nameNe: 'जनादेश पार्टी', symbol: 'radio', color: '#48BB78', descriptionEn: 'Mandate of the people.', descriptionNe: 'जनताको जनादेश।' },
  // Adding placeholders for the remaining up to 68 for demonstration of volume
  ...Array.from({ length: 48 }, (_, i) => ({
    id: `p${i + 21}`,
    nameEn: `Minor Party ${i + 21}`,
    nameNe: `साना दल ${toLocaleNumber(i + 21, 'ne')}`,
    symbol: 'generic',
    color: '#CBD5E0',
    descriptionEn: 'Local representation.',
    descriptionNe: 'स्थानीय प्रतिनिधित्व।'
  }))
];

// ── Province Data ──
export const PROVINCES: ProvinceData[] = [
  { name: 'Koshi', nameNe: 'कोशी', turnout: 68, votes: 1250400 },
  { name: 'Madhesh', nameNe: 'मधेश', turnout: 72, votes: 1840200 },
  { name: 'Bagmati', nameNe: 'बागमती', turnout: 65, votes: 2105000 },
  { name: 'Gandaki', nameNe: 'गण्डकी', turnout: 70, votes: 850300 },
  { name: 'Lumbini', nameNe: 'लुम्बिनी', turnout: 67, votes: 1100200 },
  { name: 'Karnali', nameNe: 'कर्णाली', turnout: 74, votes: 450100 },
  { name: 'Sudurpashchim', nameNe: 'सुदूरपश्चिम', turnout: 66, votes: 720400 },
];

// ── Mock Audit Log ──
export const AUDIT_ENTRIES: AuditEntry[] = [
  { timestamp: '10:44:02', eventId: 'TX-882190', action: 'Block #124,009 Finalized', status: 'Verified', nodeSignature: '0x2a..f1' },
  { timestamp: '10:43:55', eventId: 'TX-882189', action: 'Provisional Tally Updated (Koshi)', status: 'Success', nodeSignature: '0x9b..e4' },
  { timestamp: '10:43:40', eventId: 'SYS-502', action: 'Node Cluster Sync Complete', status: 'Healthy', nodeSignature: '0x1c..a2' },
  { timestamp: '10:42:15', eventId: 'TX-882188', action: 'Biometric Hash Decrypted', status: 'Verified', nodeSignature: '0x7e..f9' },
  { timestamp: '10:41:59', eventId: 'TX-882187', action: 'New Vote Entry Recorded', status: 'Finalized', nodeSignature: '0x3d..c1' },
];

// ── Party Result Percentages ──
export const PARTY_RESULTS = PARTIES.map((p, i) => ({
  partyId: p.id,
  nameEn: p.nameEn,
  nameNe: p.nameNe,
  percentage: i < 5 ? [28, 24, 15, 12, 8][i] : 0.5,
  color: p.color,
}));

function toLocaleNumber(val: number, lang: string): string {
    const nepaliDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
    return val.toString().replace(/\d/g, (d) => nepaliDigits[parseInt(d)]);
}
