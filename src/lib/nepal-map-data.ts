// ═══════════════════════════════════════════════════════
// Nepal Map Data — 7 Provinces, 77 Districts
// SVG paths approximate real geographic boundaries
// ═══════════════════════════════════════════════════════

export interface DistrictData {
  name: string;
  nameNe: string;
  turnout: number;
  totalVoters: number;
  votesCast: number;
  leadingParty: string;
  leadingPartyColor: string;
}

export interface ProvinceMapData {
  id: string;
  name: string;
  nameNe: string;
  path: string;
  fill: string;
  hoverFill: string;
  capital: string;
  capitalNe: string;
  turnout: number;
  totalVoters: number;
  votesCast: number;
  districts: DistrictData[];
}

// SVG viewBox: "0 0 900 400"
// Paths represent simplified but recognizable province boundaries
export const NEPAL_PROVINCES: ProvinceMapData[] = [
  {
    id: 'province-7',
    name: 'Sudurpashchim',
    nameNe: 'सुदूरपश्चिम',
    path: 'M 5,168 L 15,130 30,100 48,72 65,50 85,35 105,28 125,30 138,38 138,88 135,130 130,170 125,205 118,235 105,255 85,262 60,255 35,240 18,220 8,200 5,168 Z',
    fill: '#E8F0FE',
    hoverFill: '#C5D9F9',
    capital: 'Godawari',
    capitalNe: 'गोदावरी',
    turnout: 66,
    totalVoters: 1092000,
    votesCast: 720720,
    districts: [
      { name: 'Kailali', nameNe: 'कैलाली', turnout: 71, totalVoters: 198000, votesCast: 140580, leadingParty: 'Nepali Congress', leadingPartyColor: '#2F855A' },
      { name: 'Kanchanpur', nameNe: 'कञ्चनपुर', turnout: 69, totalVoters: 132000, votesCast: 91080, leadingParty: 'CPN (UML)', leadingPartyColor: '#C53030' },
      { name: 'Dadeldhura', nameNe: 'डडेलधुरा', turnout: 65, totalVoters: 78000, votesCast: 50700, leadingParty: 'Nepali Congress', leadingPartyColor: '#2F855A' },
      { name: 'Baitadi', nameNe: 'बैतडी', turnout: 63, totalVoters: 110000, votesCast: 69300, leadingParty: 'CPN (UML)', leadingPartyColor: '#C53030' },
      { name: 'Darchula', nameNe: 'दार्चुला', turnout: 61, totalVoters: 72000, votesCast: 43920, leadingParty: 'CPN (Maoist Centre)', leadingPartyColor: '#9B2C2C' },
      { name: 'Bajhang', nameNe: 'बझाङ', turnout: 59, totalVoters: 95000, votesCast: 56050, leadingParty: 'Nepali Congress', leadingPartyColor: '#2F855A' },
      { name: 'Bajura', nameNe: 'बाजुरा', turnout: 58, totalVoters: 68000, votesCast: 39440, leadingParty: 'CPN (UML)', leadingPartyColor: '#C53030' },
      { name: 'Achham', nameNe: 'अछाम', turnout: 64, totalVoters: 135000, votesCast: 86400, leadingParty: 'Nepali Congress', leadingPartyColor: '#2F855A' },
      { name: 'Doti', nameNe: 'डोटी', turnout: 62, totalVoters: 104000, votesCast: 64480, leadingParty: 'CPN (Maoist Centre)', leadingPartyColor: '#9B2C2C' },
    ],
  },
  {
    id: 'province-6',
    name: 'Karnali',
    nameNe: 'कर्णाली',
    path: 'M 138,38 L 165,25 195,15 225,8 255,5 280,8 300,18 300,70 295,120 288,165 278,210 265,245 248,268 225,275 200,272 178,265 155,258 138,252 125,245 118,235 125,205 130,170 135,130 138,88 138,38 Z',
    fill: '#FEF3E2',
    hoverFill: '#FDE0B1',
    capital: 'Birendranagar',
    capitalNe: 'वीरेन्द्रनगर',
    turnout: 74,
    totalVoters: 608000,
    votesCast: 449920,
    districts: [
      { name: 'Surkhet', nameNe: 'सुर्खेत', turnout: 76, totalVoters: 98000, votesCast: 74480, leadingParty: 'Nepali Congress', leadingPartyColor: '#2F855A' },
      { name: 'Dailekh', nameNe: 'दैलेख', turnout: 73, totalVoters: 72000, votesCast: 52560, leadingParty: 'CPN (UML)', leadingPartyColor: '#C53030' },
      { name: 'Jajarkot', nameNe: 'जाजरकोट', turnout: 70, totalVoters: 55000, votesCast: 38500, leadingParty: 'CPN (Maoist Centre)', leadingPartyColor: '#9B2C2C' },
      { name: 'Jumla', nameNe: 'जुम्ला', turnout: 68, totalVoters: 42000, votesCast: 28560, leadingParty: 'Nepali Congress', leadingPartyColor: '#2F855A' },
      { name: 'Kalikot', nameNe: 'कालिकोट', turnout: 72, totalVoters: 48000, votesCast: 34560, leadingParty: 'CPN (UML)', leadingPartyColor: '#C53030' },
      { name: 'Mugu', nameNe: 'मुगु', turnout: 65, totalVoters: 35000, votesCast: 22750, leadingParty: 'CPN (Maoist Centre)', leadingPartyColor: '#9B2C2C' },
      { name: 'Dolpa', nameNe: 'डोल्पा', turnout: 60, totalVoters: 28000, votesCast: 16800, leadingParty: 'Nepali Congress', leadingPartyColor: '#2F855A' },
      { name: 'Humla', nameNe: 'हुम्ला', turnout: 58, totalVoters: 30000, votesCast: 17400, leadingParty: 'CPN (UML)', leadingPartyColor: '#C53030' },
      { name: 'Salyan', nameNe: 'सल्यान', turnout: 75, totalVoters: 80000, votesCast: 60000, leadingParty: 'Nepali Congress', leadingPartyColor: '#2F855A' },
      { name: 'Western Rukum', nameNe: 'पश्चिमी रुकुम', turnout: 71, totalVoters: 52000, votesCast: 36920, leadingParty: 'CPN (Maoist Centre)', leadingPartyColor: '#9B2C2C' },
    ],
  },
  {
    id: 'province-5',
    name: 'Lumbini',
    nameNe: 'लुम्बिनी',
    path: 'M 300,18 L 330,22 360,30 388,42 405,55 415,72 415,125 408,175 398,220 385,260 368,290 345,308 318,310 290,305 265,295 248,278 248,268 265,245 278,210 288,165 295,120 300,70 300,18 Z',
    fill: '#E8FAF0',
    hoverFill: '#B5F0D3',
    capital: 'Deukhuri',
    capitalNe: 'देउखुरी',
    turnout: 67,
    totalVoters: 1643000,
    votesCast: 1100810,
    districts: [
      { name: 'Rupandehi', nameNe: 'रुपन्देही', turnout: 72, totalVoters: 215000, votesCast: 154800, leadingParty: 'Rastriya Swatantra Party', leadingPartyColor: '#2B6CB0' },
      { name: 'Kapilvastu', nameNe: 'कपिलवस्तु', turnout: 68, totalVoters: 165000, votesCast: 112200, leadingParty: 'Nepali Congress', leadingPartyColor: '#2F855A' },
      { name: 'Dang', nameNe: 'दाङ', turnout: 71, totalVoters: 158000, votesCast: 112180, leadingParty: 'CPN (UML)', leadingPartyColor: '#C53030' },
      { name: 'Banke', nameNe: 'बाँके', turnout: 70, totalVoters: 145000, votesCast: 101500, leadingParty: 'Nepali Congress', leadingPartyColor: '#2F855A' },
      { name: 'Bardiya', nameNe: 'बर्दिया', turnout: 66, totalVoters: 128000, votesCast: 84480, leadingParty: 'CPN (Maoist Centre)', leadingPartyColor: '#9B2C2C' },
      { name: 'Palpa', nameNe: 'पाल्पा', turnout: 65, totalVoters: 98000, votesCast: 63700, leadingParty: 'Nepali Congress', leadingPartyColor: '#2F855A' },
      { name: 'Nawalparasi West', nameNe: 'नवलपरासी (पश्चिम)', turnout: 69, totalVoters: 110000, votesCast: 75900, leadingParty: 'CPN (UML)', leadingPartyColor: '#C53030' },
      { name: 'Gulmi', nameNe: 'गुल्मी', turnout: 63, totalVoters: 95000, votesCast: 59850, leadingParty: 'Nepali Congress', leadingPartyColor: '#2F855A' },
      { name: 'Arghakhanchi', nameNe: 'अर्घाखाँची', turnout: 64, totalVoters: 72000, votesCast: 46080, leadingParty: 'CPN (UML)', leadingPartyColor: '#C53030' },
      { name: 'Pyuthan', nameNe: 'प्यूठान', turnout: 62, totalVoters: 68000, votesCast: 42160, leadingParty: 'CPN (Maoist Centre)', leadingPartyColor: '#9B2C2C' },
      { name: 'Rolpa', nameNe: 'रोल्पा', turnout: 60, totalVoters: 75000, votesCast: 45000, leadingParty: 'CPN (Maoist Centre)', leadingPartyColor: '#9B2C2C' },
      { name: 'Eastern Rukum', nameNe: 'पूर्वी रुकुम', turnout: 61, totalVoters: 48000, votesCast: 29280, leadingParty: 'CPN (Maoist Centre)', leadingPartyColor: '#9B2C2C' },
    ],
  },
  {
    id: 'province-4',
    name: 'Gandaki',
    nameNe: 'गण्डकी',
    path: 'M 415,72 L 440,62 468,52 498,48 525,50 548,58 548,110 542,158 535,200 525,235 512,258 495,272 475,278 452,275 432,268 415,258 408,240 408,175 415,125 415,72 Z',
    fill: '#FEF0F0',
    hoverFill: '#FCD5D5',
    capital: 'Pokhara',
    capitalNe: 'पोखरा',
    turnout: 70,
    totalVoters: 1215000,
    votesCast: 850500,
    districts: [
      { name: 'Kaski', nameNe: 'कास्की', turnout: 75, totalVoters: 175000, votesCast: 131250, leadingParty: 'Rastriya Swatantra Party', leadingPartyColor: '#2B6CB0' },
      { name: 'Tanahun', nameNe: 'तनहुँ', turnout: 72, totalVoters: 125000, votesCast: 90000, leadingParty: 'Nepali Congress', leadingPartyColor: '#2F855A' },
      { name: 'Gorkha', nameNe: 'गोरखा', turnout: 68, totalVoters: 115000, votesCast: 78200, leadingParty: 'CPN (UML)', leadingPartyColor: '#C53030' },
      { name: 'Lamjung', nameNe: 'लमजुङ', turnout: 70, totalVoters: 82000, votesCast: 57400, leadingParty: 'Nepali Congress', leadingPartyColor: '#2F855A' },
      { name: 'Syangja', nameNe: 'स्याङजा', turnout: 71, totalVoters: 105000, votesCast: 74550, leadingParty: 'Nepali Congress', leadingPartyColor: '#2F855A' },
      { name: 'Baglung', nameNe: 'बागलुङ', turnout: 67, totalVoters: 98000, votesCast: 65660, leadingParty: 'CPN (UML)', leadingPartyColor: '#C53030' },
      { name: 'Parbat', nameNe: 'पर्वत', turnout: 66, totalVoters: 58000, votesCast: 38280, leadingParty: 'Nepali Congress', leadingPartyColor: '#2F855A' },
      { name: 'Myagdi', nameNe: 'म्याग्दी', turnout: 64, totalVoters: 52000, votesCast: 33280, leadingParty: 'CPN (Maoist Centre)', leadingPartyColor: '#9B2C2C' },
      { name: 'Mustang', nameNe: 'मुस्ताङ', turnout: 55, totalVoters: 18000, votesCast: 9900, leadingParty: 'Nepali Congress', leadingPartyColor: '#2F855A' },
      { name: 'Manang', nameNe: 'मनाङ', turnout: 52, totalVoters: 12000, votesCast: 6240, leadingParty: 'CPN (UML)', leadingPartyColor: '#C53030' },
      { name: 'Nawalparasi East', nameNe: 'नवलपरासी (पूर्व)', turnout: 73, totalVoters: 135000, votesCast: 98550, leadingParty: 'Rastriya Swatantra Party', leadingPartyColor: '#2B6CB0' },
    ],
  },
  {
    id: 'province-3',
    name: 'Bagmati',
    nameNe: 'बागमती',
    path: 'M 548,58 L 578,55 608,52 638,55 665,62 665,120 660,175 652,225 640,265 622,295 598,310 572,310 548,302 530,290 518,275 512,258 525,235 535,200 542,158 548,110 548,58 Z',
    fill: '#F0EFFE',
    hoverFill: '#D5D1F9',
    capital: 'Hetauda',
    capitalNe: 'हेटौडा',
    turnout: 65,
    totalVoters: 3230000,
    votesCast: 2099500,
    districts: [
      { name: 'Kathmandu', nameNe: 'काठमाडौं', turnout: 62, totalVoters: 650000, votesCast: 403000, leadingParty: 'Rastriya Swatantra Party', leadingPartyColor: '#2B6CB0' },
      { name: 'Lalitpur', nameNe: 'ललितपुर', turnout: 64, totalVoters: 185000, votesCast: 118400, leadingParty: 'Rastriya Swatantra Party', leadingPartyColor: '#2B6CB0' },
      { name: 'Bhaktapur', nameNe: 'भक्तपुर', turnout: 66, totalVoters: 128000, votesCast: 84480, leadingParty: 'CPN (UML)', leadingPartyColor: '#C53030' },
      { name: 'Kavrepalanchok', nameNe: 'काभ्रेपलाञ्चोक', turnout: 68, totalVoters: 165000, votesCast: 112200, leadingParty: 'Nepali Congress', leadingPartyColor: '#2F855A' },
      { name: 'Nuwakot', nameNe: 'नुवाकोट', turnout: 70, totalVoters: 118000, votesCast: 82600, leadingParty: 'CPN (UML)', leadingPartyColor: '#C53030' },
      { name: 'Sindhupalchok', nameNe: 'सिन्धुपाल्चोक', turnout: 65, totalVoters: 125000, votesCast: 81250, leadingParty: 'CPN (Maoist Centre)', leadingPartyColor: '#9B2C2C' },
      { name: 'Dhading', nameNe: 'धादिङ', turnout: 67, totalVoters: 135000, votesCast: 90450, leadingParty: 'CPN (UML)', leadingPartyColor: '#C53030' },
      { name: 'Rasuwa', nameNe: 'रसुवा', turnout: 58, totalVoters: 32000, votesCast: 18560, leadingParty: 'CPN (UML)', leadingPartyColor: '#C53030' },
      { name: 'Dolakha', nameNe: 'दोलखा', turnout: 63, totalVoters: 82000, votesCast: 51660, leadingParty: 'CPN (Maoist Centre)', leadingPartyColor: '#9B2C2C' },
      { name: 'Ramechhap', nameNe: 'रामेछाप', turnout: 66, totalVoters: 92000, votesCast: 60720, leadingParty: 'CPN (UML)', leadingPartyColor: '#C53030' },
      { name: 'Sindhuli', nameNe: 'सिन्धुली', turnout: 64, totalVoters: 110000, votesCast: 70400, leadingParty: 'Nepali Congress', leadingPartyColor: '#2F855A' },
      { name: 'Makwanpur', nameNe: 'मकवानपुर', turnout: 69, totalVoters: 162000, votesCast: 111780, leadingParty: 'Rastriya Swatantra Party', leadingPartyColor: '#2B6CB0' },
      { name: 'Chitwan', nameNe: 'चितवन', turnout: 72, totalVoters: 220000, votesCast: 158400, leadingParty: 'Rastriya Swatantra Party', leadingPartyColor: '#2B6CB0' },
    ],
  },
  {
    id: 'province-2',
    name: 'Madhesh',
    nameNe: 'मधेश',
    path: 'M 415,258 L 432,268 452,275 475,278 495,272 512,258 518,275 530,290 548,302 572,310 598,310 622,295 640,265 652,225 665,220 688,235 710,255 730,275 748,290 758,310 748,330 720,345 688,352 650,355 610,352 570,348 530,342 490,335 450,328 415,320 395,310 385,298 385,280 395,268 415,258 Z',
    fill: '#FFF8E1',
    hoverFill: '#FFECB3',
    capital: 'Janakpur',
    capitalNe: 'जनकपुरधाम',
    turnout: 72,
    totalVoters: 2795000,
    votesCast: 2012400,
    districts: [
      { name: 'Parsa', nameNe: 'पर्सा', turnout: 70, totalVoters: 210000, votesCast: 147000, leadingParty: 'Nepali Congress', leadingPartyColor: '#2F855A' },
      { name: 'Bara', nameNe: 'बारा', turnout: 71, totalVoters: 225000, votesCast: 159750, leadingParty: 'CPN (UML)', leadingPartyColor: '#C53030' },
      { name: 'Rautahat', nameNe: 'रौतहट', turnout: 73, totalVoters: 248000, votesCast: 181040, leadingParty: 'Nepali Congress', leadingPartyColor: '#2F855A' },
      { name: 'Sarlahi', nameNe: 'सर्लाही', turnout: 74, totalVoters: 265000, votesCast: 196100, leadingParty: 'CPN (UML)', leadingPartyColor: '#C53030' },
      { name: 'Mahottari', nameNe: 'महोत्तरी', turnout: 72, totalVoters: 230000, votesCast: 165600, leadingParty: 'Nepali Congress', leadingPartyColor: '#2F855A' },
      { name: 'Dhanusha', nameNe: 'धनुषा', turnout: 75, totalVoters: 280000, votesCast: 210000, leadingParty: 'CPN (UML)', leadingPartyColor: '#C53030' },
      { name: 'Siraha', nameNe: 'सिरहा', turnout: 71, totalVoters: 215000, votesCast: 152650, leadingParty: 'Nepali Congress', leadingPartyColor: '#2F855A' },
      { name: 'Saptari', nameNe: 'सप्तरी', turnout: 73, totalVoters: 242000, votesCast: 176660, leadingParty: 'CPN (UML)', leadingPartyColor: '#C53030' },
    ],
  },
  {
    id: 'province-1',
    name: 'Koshi',
    nameNe: 'कोशी',
    path: 'M 665,62 L 698,68 728,78 755,88 780,100 805,112 830,122 855,130 875,138 895,148 895,275 875,295 850,310 825,318 800,322 775,320 758,310 748,290 730,275 710,255 688,235 665,220 660,175 665,120 665,62 Z',
    fill: '#E3F2FD',
    hoverFill: '#BBDEFB',
    capital: 'Biratnagar',
    capitalNe: 'विराटनगर',
    turnout: 68,
    totalVoters: 1895000,
    votesCast: 1288600,
    districts: [
      { name: 'Jhapa', nameNe: 'झापा', turnout: 73, totalVoters: 245000, votesCast: 178850, leadingParty: 'Nepali Congress', leadingPartyColor: '#2F855A' },
      { name: 'Morang', nameNe: 'मोरङ', turnout: 72, totalVoters: 285000, votesCast: 205200, leadingParty: 'CPN (UML)', leadingPartyColor: '#C53030' },
      { name: 'Sunsari', nameNe: 'सुनसरी', turnout: 71, totalVoters: 232000, votesCast: 164720, leadingParty: 'Rastriya Swatantra Party', leadingPartyColor: '#2B6CB0' },
      { name: 'Ilam', nameNe: 'इलाम', turnout: 70, totalVoters: 118000, votesCast: 82600, leadingParty: 'CPN (UML)', leadingPartyColor: '#C53030' },
      { name: 'Panchthar', nameNe: 'पाँचथर', turnout: 65, totalVoters: 82000, votesCast: 53300, leadingParty: 'CPN (Maoist Centre)', leadingPartyColor: '#9B2C2C' },
      { name: 'Taplejung', nameNe: 'ताप्लेजुङ', turnout: 60, totalVoters: 58000, votesCast: 34800, leadingParty: 'CPN (UML)', leadingPartyColor: '#C53030' },
      { name: 'Dhankuta', nameNe: 'धनकुटा', turnout: 68, totalVoters: 72000, votesCast: 48960, leadingParty: 'Nepali Congress', leadingPartyColor: '#2F855A' },
      { name: 'Terhathum', nameNe: 'तेह्रथुम', turnout: 64, totalVoters: 50000, votesCast: 32000, leadingParty: 'CPN (Maoist Centre)', leadingPartyColor: '#9B2C2C' },
      { name: 'Sankhuwasabha', nameNe: 'संखुवासभा', turnout: 62, totalVoters: 68000, votesCast: 42160, leadingParty: 'CPN (UML)', leadingPartyColor: '#C53030' },
      { name: 'Bhojpur', nameNe: 'भोजपुर', turnout: 63, totalVoters: 75000, votesCast: 47250, leadingParty: 'CPN (Maoist Centre)', leadingPartyColor: '#9B2C2C' },
      { name: 'Solukhumbu', nameNe: 'सोलुखुम्बु', turnout: 56, totalVoters: 52000, votesCast: 29120, leadingParty: 'CPN (UML)', leadingPartyColor: '#C53030' },
      { name: 'Okhaldhunga', nameNe: 'ओखलढुङ्गा', turnout: 65, totalVoters: 65000, votesCast: 42250, leadingParty: 'Nepali Congress', leadingPartyColor: '#2F855A' },
      { name: 'Khotang', nameNe: 'खोटाङ', turnout: 66, totalVoters: 88000, votesCast: 58080, leadingParty: 'CPN (Maoist Centre)', leadingPartyColor: '#9B2C2C' },
      { name: 'Udayapur', nameNe: 'उदयपुर', turnout: 69, totalVoters: 125000, votesCast: 86250, leadingParty: 'Nepali Congress', leadingPartyColor: '#2F855A' },
    ],
  },
];
