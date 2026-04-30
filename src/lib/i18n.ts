import { Language } from '@/types';

type TranslationKeys = {
  // Header
  siteTitle: string;
  siteSubtitle: string;
  switchLanguage: string;

  // Landing
  heroTitle: string;
  heroSubtitle: string;
  startVoting: string;
  viewResults: string;
  howItWorks: string;

  // How It Works Steps
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3DirectTitle: string;
  step3PRTitle: string;
  step3Desc: string;
  step4Title: string;
  step4Desc: string;

  // Trust Section
  trustTitle: string;
  certifiedSecure: string;
  certifiedSecureDesc: string;
  universalAccess: string;
  universalAccessDesc: string;

  // Live Stats
  digitalParticipation: string;
  verifiedIdentities: string;
  transactionDelay: string;
  liveSessionTraffic: string;
  votersInSession: string;

  // Capabilities
  capTitle: string;
  capSubtitle: string;
  cap1Title: string;
  cap1Desc: string;
  cap2Title: string;
  cap2Desc: string;
  cap3Title: string;
  cap3Desc: string;

  // Verify
  verifyTitle: string;
  enterVoterId: string;
  idPlaceholder: string;
  validateIdentity: string;
  goBack: string;
  searchingDatabase: string;
  verifyingBiometric: string;

  // OTP
  otpTitle: string;
  otpSubtitle: string;
  verifyOtp: string;
  resendOtp: string;
  wait: string;
  decryptingKey: string;

  // Ballot
  ballotTitle: string;
  ballotSubtitle: string;
  certifiedEntity: string;
  confirmVote: string;

  // Confirm
  confirmTitle: string;
  confirmSubtitle: string;
  youAreVotingFor: string;
  castVote: string;
  changeSelection: string;
  legalDisclaimer: string;

  // Processing
  processingTitle: string;
  encryptionLabel: string;
  verificationLabel: string;

  // Success
  successTitle: string;
  successSubtitle: string;
  receiptId: string;
  certifiedTimestamp: string;
  networkVerification: string;
  immutable: string;
  downloadReceipt: string;

  // Results
  resultsTitle: string;
  secureNetwork: string;
  totalVotes: string;
  liveTurnout: string;
  turnoutByProvince: string;
  partyDistribution: string;
  networkIntegrity: string;
  activeVoters: string;
  serverLatency: string;
  viewAuditLog: string;
  modernElections: string;
  modernElectionsDesc: string;
  others: string;

  // Map
  mapTitle: string;
  mapSubtitle: string;
  selectProvince: string;
  selectProvinceDesc: string;
  capital: string;
  turnout: string;
  registered: string;
  cast: string;
  districts: string;

  // Audit
  auditTitle: string;
  auditSubtitle: string;
  searchTxHash: string;
  timestamp: string;
  eventId: string;
  action: string;
  status: string;
  nodeSignature: string;
  activeNodes: string;
  latency: string;
  exportCsv: string;
  viewRawJson: string;
  backToResults: string;

  // Footer
  privacy: string;
  commission: string;
  security: string;
  help: string;
  secureGovDomain: string;

  // Errors
  voterNotFound: string;
  voterAlreadyVoted: string;
  voterBlocked: string;
  voterExpired: string;
  invalidOtp: string;
  votingPractice: string;
};

const ne_base = {
  // Header
  siteTitle: 'मतदान',
  siteSubtitle: 'नेपाल डिजिटल मतदान २०२५',
  switchLanguage: 'English',

  // Landing
  heroTitle: 'नेपाल डिजिटल मतदान प्रणाली',
  heroSubtitle: '२०२५ आम निर्वाचन: प्रत्येक नेपाली नागरिकका लागि सुरक्षित, पारदर्शी र सुलभ डिजिटल मतदान।',
  startVoting: 'मतदान प्रक्रिया सुरु गर्नुहोस्',
  viewResults: 'प्रत्यक्ष ड्यासबोर्ड हेर्नुहोस्',
  howItWorks: 'यसले कसरी काम गर्छ',

  // Steps
  step1Title: 'पहिचान',
  step1Desc: 'नागरिकता प्रमाणपत्रमा लिङ्क गरिएको मतदाता परिचयपत्र प्रविष्ट गर्नुहोस्।',
  step2Title: 'प्रमाणीकरण',
  step2Desc: 'दर्ता गरिएको मोबाइल नम्बरमा पठाइएको OTP मार्फत प्रमाणित गर्नुहोस्।',
  step3Title: 'मतदान',
  step3DirectTitle: 'प्रत्यक्ष',
  step3PRTitle: 'समानुपातिक',
  step3Desc: 'पूर्ण गोपनीयताका साथ एन्क्रिप्टेड डिजिटल मतपत्रमा मतदान गर्नुहोस्।',
  step4Title: 'सुरक्षित',
  step4Desc: 'तपाईंको मत क्रिप्टोग्राफिक रूपमा ह्यास गरी अपरिवर्तनीय लेजरमा रेकर्ड हुन्छ।',

  // Trust
  trustTitle: 'विश्वास र पारदर्शिता',
  certifiedSecure: 'प्रमाणित सुरक्षित',
  certifiedSecureDesc: 'नेपालको राष्ट्रिय सुरक्षा एजेन्सीद्वारा प्रमाणित इन्ड-टु-इन्ड एन्क्रिप्टेड प्रोटोकल।',
  universalAccess: 'विश्वव्यापी पहुँच',
  universalAccessDesc: 'सबै ७ प्रदेशहरूमा प्रमाणित नेपाली IP दायराहरू भित्र कुनै पनि स्थानबाट पहुँचयोग्य।',

  // Live Stats
  digitalParticipation: 'डिजिटल सहभागिता',
  verifiedIdentities: 'प्रमाणित पहिचान',
  transactionDelay: 'लेनदेन ढिलाइ',
  liveSessionTraffic: 'प्रत्यक्ष सत्र ट्राफिक',
  votersInSession: 'प्रमाणित मतदाताहरू अहिले सत्रमा',

  // Capabilities
  capTitle: 'डिजिटल लोकतन्त्र ढाँचा',
  capSubtitle: '२०२५ को डिजिटल नेपाल पहलका तीन मुख्य सिद्धान्तहरूमा निर्मित।',
  cap1Title: 'पहिचान सार्वभौमसत्ता',
  cap1Desc: 'शून्य-ज्ञान प्रमाणहरू मार्फत गोपनीयता सुनिश्चित गर्दै दोहोरो मतदान रोक्छ।',
  cap2Title: 'राष्ट्रिय लचिलोपन',
  cap2Desc: 'सबै ७ प्रदेशहरूमा अन्तर्राष्ट्रिय ब्याकअप नोडहरू सहित उच्च उपलब्ध सर्भर क्लस्टरहरू।',
  cap3Title: 'पूर्ण पारदर्शिता',
  cap3Desc: 'हरेक लेनदेन अपरिवर्तनीय लेजरमा ह्यास गरी रेकर्ड गरिन्छ।',

  // Verify
  verifyTitle: 'मतदाता प्रमाणीकरण',
  enterVoterId: 'नागरिकता प्रमाणपत्रमा लिङ्क गरिएको १०-अंकको मतदाता परिचयपत्र नम्बर हाल्नुहोस्।',
  idPlaceholder: 'जस्तै: १२३४५६७८९०',
  validateIdentity: 'पहिचान प्रमाणित गर्नुहोस्',
  goBack: 'फिर्ता जानुहोस्',
  searchingDatabase: 'राष्ट्रिय डाटाबेस खोज्दै...',
  verifyingBiometric: 'बायोमेट्रिक ह्यास प्रमाणित गर्दै...',

  // OTP
  otpTitle: 'सुरक्षा प्रमाणीकरण',
  otpSubtitle: 'तपाईंको दर्ता गरिएको मोबाइल नम्बरमा ६-अंकको कोड पठाइएको छ,',
  verifyOtp: 'प्रमाणित गर्नुहोस् र अगाडि बढ्नुहोस्',
  resendOtp: 'OTP पुन: पठाउनुहोस्',
  wait: 'पर्खनुहोस्',
  decryptingKey: 'निजी कुञ्जी डिक्रिप्ट गर्दै...',

  // Ballot
  ballotTitle: 'डिजिटल मतपत्र',
  ballotSubtitle: 'एक दल वा उम्मेदवार छान्नुहोस्। तपाईंको छनोट एन्क्रिप्टेड र गोप्य रहनेछ।',
  certifiedEntity: 'प्रमाणित राजनीतिक दल',
  confirmVote: 'पुष्टि गर्न अगाडि बढ्नुहोस्',

  // Confirm
  confirmTitle: 'तपाईंको मतदान पुष्टि गर्नुहोस्',
  confirmSubtitle: 'कृपया मतदान गर्नु अघि आफ्नो छनोट समीक्षा गर्नुहोस्।',
  youAreVotingFor: 'तपाईं मतदान गर्दै हुनुहुन्छ',
  castVote: 'मतदान गर्नुहोस्',
  changeSelection: 'छनोट परिवर्तन गर्नुहोस्',
  legalDisclaimer: 'मतदान गरेर तपाईं पुष्टि गर्नुहुन्छ कि यो २०२५ आम निर्वाचनको लागि तपाईंको एकमात्र र अन्तिम सबमिशन हो। यो कार्य उल्टाउन सकिँदैन।',

  // Processing
  processingTitle: 'मतदान गर्दै...',
  encryptionLabel: 'AES-256 एन्क्रिप्शन',
  verificationLabel: 'प्रमाण-कार्य प्रमाणीकरण',

  // Success
  successTitle: 'मतदान सफल भयो',
  successSubtitle: 'तपाईंको २०२५ आम निर्वाचनको मत सुरक्षित लेजरमा रेकर्ड गरिएको छ। लोकतन्त्रमा सहभागी हुनुभएकोमा धन्यवाद।',
  receiptId: 'सुरक्षित रसिद ID',
  certifiedTimestamp: 'प्रमाणित समय',
  networkVerification: 'नेटवर्क प्रमाणीकरण',
  immutable: 'अपरिवर्तनीय',
  downloadReceipt: 'डिजिटल रसिद डाउनलोड गर्नुहोस्',

  // Results
  resultsTitle: 'प्रत्यक्ष निर्वाचन अनुगमन',
  secureNetwork: 'सुरक्षित नेटवर्क: सिंक र सक्रिय',
  totalVotes: 'कुल मतदान',
  liveTurnout: 'प्रत्यक्ष मतदान प्रतिशत',
  turnoutByProvince: 'प्रदेश अनुसार मतदान (%)',
  partyDistribution: 'दल वितरण',
  networkIntegrity: 'नेटवर्क अखण्डता',
  activeVoters: 'सक्रिय मतदाताहरू',
  serverLatency: 'सर्भर ढिलाइ',
  viewAuditLog: 'अडिट लग हेर्नुहोस्',
  modernElections: 'आधुनिक निर्वाचन, शाश्वत मूल्यहरू।',
  modernElectionsDesc: 'हाम्रो २०२५ प्लेटफर्ममा शून्य-ज्ञान प्रमाण (ZKP) प्रविधि छ जसले तपाईंको पहिचान सार्वजनिक लेजरमा तपाईंको छनोटसँग कहिल्यै लिंक हुँदैन भन्ने सुनिश्चित गर्दछ।',
  others: 'अन्य दल',

  // Map
  mapTitle: 'प्रदेश र जिल्ला अनुसार निर्वाचन प्रगति',
  mapSubtitle: 'जिल्ला स्तरको निर्वाचन विवरण हेर्न प्रदेशमा क्लिक गर्नुहोस्',
  selectProvince: 'प्रदेश छान्नुहोस्',
  selectProvinceDesc: 'जिल्ला स्तरको निर्वाचन प्रगति र अग्रणी दलहरू हेर्न नक्सामा क्लिक गर्नुहोस् वा तलबाट प्रदेश छान्नुहोस्।',
  capital: 'राजधानी',
  turnout: 'मतदान प्रतिशत',
  registered: 'दर्ता भएका',
  cast: 'खसेको मत',
  districts: 'जिल्लाहरू',

  // Audit
  auditTitle: 'प्रणाली अडिट लग',
  auditSubtitle: 'लेजर गतिविधिहरूको वास्तविक-समय क्रिप्टोग्राफिक प्रमाणीकरण।',
  searchTxHash: 'Tx Hash खोज्नुहोस्...',
  timestamp: 'समय',
  eventId: 'घटना ID',
  action: 'कार्य',
  status: 'स्थिति',
  nodeSignature: 'नोड हस्ताक्षर',
  activeNodes: 'सक्रिय नोडहरू',
  latency: 'ढिलाइ',
  exportCsv: 'EXPORT CSV',
  viewRawJson: 'RAW JSON',
  backToResults: 'परिणाममा फर्कनुहोस्',

  // Footer
  privacy: 'गोपनीयता',
  commission: 'आयोग',
  security: 'सुरक्षा',
  help: 'सहायता',
  secureGovDomain: 'सुरक्षित सरकारी डोमेन',

  // Errors
  voterNotFound: 'मतदाता परिचयपत्र राष्ट्रिय डाटाबेसमा फेला परेन। कृपया ID प्रमाणित गरी पुन: प्रयास गर्नुहोस्।',
  voterAlreadyVoted: 'यो मतदाता परिचयपत्रबाट यस निर्वाचनमा पहिले नै मतदान गरिसकिएको छ।',
  voterBlocked: 'यो मतदाता परिचयपत्र अस्थायी रूपमा अवरुद्ध गरिएको छ। जिल्ला निर्वाचन कार्यालय सम्पर्क गर्नुहोस्।',
  voterExpired: 'यो मतदाता परिचयपत्रको म्याद सकिएको छ। मतदान गर्नु अघि जिल्ला कार्यालयमा नवीकरण गर्नुहोस्।',
  invalidOtp: 'तपाईंले हालेको कोड गलत छ। कृपया पुन: प्रयास गर्नुहोस्।',
  votingPractice: 'मतदान अभ्यास',
};

const translations: Record<Language, TranslationKeys> = {
  en: {
    // Header
    siteTitle: 'MATDAAN',
    siteSubtitle: 'Nepal Digital Vote 2025',
    switchLanguage: 'नेपाली',

    // Landing
    heroTitle: 'Nepal Digital Voting System',
    heroSubtitle: 'The 2025 General Elections: Secure, Transparent, and Accessible digital voting for every Nepalese citizen.',
    startVoting: 'Begin Voting Process',
    viewResults: 'View Live Dashboard',
    howItWorks: 'How It Works',

    // Steps
    step1Title: 'Identify',
    step1Desc: 'Enter your biometric voter credentials linked to your Citizenship certificate.',
    step2Title: 'Authenticate',
    step2Desc: 'Verify your identity via secure mobile OTP sent to your registered number.',
    step3Title: 'Vote',
    step3DirectTitle: 'Direct',
    step3PRTitle: 'Proportional',
    step3Desc: 'Cast your vote on a private, encrypted digital ballot in total anonymity.',
    step4Title: 'Secure',
    step4Desc: 'Your vote is cryptographically hashed and recorded on the immutable private ledger.',

    // Trust
    trustTitle: 'Trust & Transparency',
    certifiedSecure: 'Certified Secure',
    certifiedSecureDesc: 'End-to-end encrypted protocol verified by the National Security Agency of Nepal.',
    universalAccess: 'Universal Access',
    universalAccessDesc: 'Accessible from any location within verified Nepalese IP ranges across all 7 provinces.',

    // Live Stats
    digitalParticipation: 'Digital Participation',
    verifiedIdentities: 'Verified Identities',
    transactionDelay: 'Transaction Delay',
    liveSessionTraffic: 'Live Session Traffic',
    votersInSession: 'Verified voters currently in session',

    // Capabilities
    capTitle: 'Digital Democracy Framework',
    capSubtitle: 'Built on three core principles of the 2025 Digital Nepal initiative.',
    cap1Title: 'Identity Sovereignty',
    cap1Desc: 'Decoupled identity verification ensures privacy while preventing double-voting through zero-knowledge proofs.',
    cap2Title: 'National Resilience',
    cap2Desc: 'Highly available server clusters across all 7 provinces with international backup nodes.',
    cap3Title: 'Total Transparency',
    cap3Desc: 'Every transaction is hashed and recorded on an immutable ledger for post-election public audit.',

    // Verify
    verifyTitle: 'Voter Verification',
    enterVoterId: 'Enter your 10-digit Voter ID linked to your Citizenship certificate.',
    idPlaceholder: 'e.g. 1234567890',
    validateIdentity: 'Validate Identity',
    goBack: 'Go Back',
    searchingDatabase: 'Searching National Database...',
    verifyingBiometric: 'Verifying Biometric Hash...',

    // OTP
    otpTitle: 'Two-Factor Authentication',
    otpSubtitle: 'A secure 6-digit code has been sent to your registered mobile number ending in',
    verifyOtp: 'Verify & Continue',
    resendOtp: 'Resend OTP',
    wait: 'Wait',
    decryptingKey: 'Decrypting Private Key...',

    // Ballot
    ballotTitle: 'Digital Ballot Paper',
    ballotSubtitle: 'Select one party or candidate. Your selection is encrypted and anonymous.',
    certifiedEntity: 'Certified Political Entity',
    confirmVote: 'Proceed to Confirmation',

    // Confirm
    confirmTitle: 'Confirm Your Vote',
    confirmSubtitle: 'Please review your selection before casting.',
    youAreVotingFor: 'You are voting for',
    castVote: 'Cast My Vote',
    changeSelection: 'Change Selection',
    legalDisclaimer: 'By casting your vote, you confirm that this is your sole and final submission for the 2025 General Election. This action cannot be reversed.',

    // Processing
    processingTitle: 'Casting Vote...',
    encryptionLabel: 'AES-256 Encryption',
    verificationLabel: 'Proof-of-Work Verification',

    // Success
    successTitle: 'Vote Successfully Cast',
    successSubtitle: 'Your 2025 General Election vote has been recorded on the secure ledger. Thank you for participating in democracy.',
    receiptId: 'Secure Receipt ID',
    certifiedTimestamp: 'Certified Timestamp',
    networkVerification: 'Network Verification',
    immutable: 'IMMUTABLE',
    downloadReceipt: 'Download Digital Receipt',

    // Results
    resultsTitle: 'Live Election Monitoring',
    secureNetwork: 'Secure Network: Synced & Active',
    totalVotes: 'Total Votes',
    liveTurnout: 'Live Turnout',
    turnoutByProvince: 'Turnout by Province (%)',
    partyDistribution: 'Party Distribution',
    networkIntegrity: 'Network Integrity',
    activeVoters: 'Active Voters',
    serverLatency: 'Server Latency',
    viewAuditLog: 'View Audit Log',
    modernElections: 'Modern Elections, Timeless Values.',
    modernElectionsDesc: 'Our 2025 platform features Zero-Knowledge Proof (ZKP) technology, ensuring that your identity is never linked to your selection in the public ledger. Decentralized nodes are running across all 7 provinces.',
    others: 'Others',

    // Map
    mapTitle: 'Election Progress by Province & District',
    mapSubtitle: 'Click on a province to view district-level election details',
    selectProvince: 'Select a Province',
    selectProvinceDesc: 'Click on the map or select a province below to view district-level election progress and leading parties.',
    capital: 'Capital',
    turnout: 'Turnout',
    registered: 'Registered',
    cast: 'Votes Cast',
    districts: 'Districts',

    // Audit
    auditTitle: 'System Audit Log',
    auditSubtitle: 'Real-time cryptographic verification of ledger activities.',
    searchTxHash: 'Search Tx Hash...',
    timestamp: 'Timestamp',
    eventId: 'Event ID',
    action: 'Action',
    status: 'Status',
    nodeSignature: 'Node Signature',
    activeNodes: 'Active Nodes',
    latency: 'Latency',
    exportCsv: 'Export CSV',
    viewRawJson: 'View Raw JSON',
    backToResults: 'Back to Results',

    // Footer
    privacy: 'Privacy',
    commission: 'Commission',
    security: 'Security',
    help: 'Help',
    secureGovDomain: 'SECURE GOVERNMENT DOMAIN',

    // Errors
    voterNotFound: 'Voter ID not found in the National Database. Please verify your ID and try again.',
    voterAlreadyVoted: 'This Voter ID has already been used to cast a vote in this election.',
    voterBlocked: 'This Voter ID has been temporarily blocked. Contact your district election office.',
    voterExpired: 'This Voter ID has expired. Please renew at your district office before voting.',
    invalidOtp: 'The code you entered is incorrect. Please try again.',
    votingPractice: 'Voting Practice',
  },
  ne: ne_base,
  ma: {
    ...ne_base,
    siteSubtitle: 'नेपाल डिजिटल मतदान २०२५ (मैथिली)',
    switchLanguage: 'मैथिली',
  },
  bh: {
    ...ne_base,
    siteSubtitle: 'नेपाल डिजिटल मतदान २०२५ (भोजपुरी)',
    switchLanguage: 'भोजपुरी',
  },
};

export function t(lang: Language, key: keyof TranslationKeys): string {
  return translations[lang][key];
}

export type { TranslationKeys };
