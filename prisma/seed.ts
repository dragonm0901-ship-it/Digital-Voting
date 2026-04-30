import { PrismaClient } from '../src/generated/prisma';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient({
  log: ['error'],
});

async function main() {
  console.log('🌱 Starting Database Seed...');

  // 1. Create the General Election 2025
  const election = await prisma.election.upsert({
    where: { electionId: 'GE-2025-001' },
    update: {},
    create: {
      electionId: 'GE-2025-001',
      title: 'General Election 2025',
      titleNe: 'आम निर्वाचन २०८२',
      type: 'general',
      status: 'active', // Active for testing
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      totalEligible: 3, // For testing, just a few
    },
  });
  console.log(`✅ Election created: ${election.title}`);

  // 2. Create Parties/Candidates
  const parties = [
    { id: '1', en: 'Nepali Congress', ne: 'नेपाली कांग्रेस', symbol: '🌳' },
    { id: '2', en: 'CPN (UML)', ne: 'नेकपा (एमाले)', symbol: '☀️' },
    { id: '3', en: 'CPN (Maoist Centre)', ne: 'नेकपा (माओवादी केन्द्र)', symbol: '🔨' },
    { id: '4', en: 'Rastriya Swatantra Party', ne: 'राष्ट्रिय स्वतन्त्र पार्टी', symbol: '🔔' },
    { id: '5', en: 'Rastriya Prajatantra Party', ne: 'राष्ट्रिय प्रजातन्त्र पार्टी', symbol: '🐄' },
    { id: '6', en: 'People\'s Socialist Party', ne: 'जनता समाजवादी पार्टी', symbol: '⛱️' },
  ];

  for (const party of parties) {
    // Proportional Candidate Entry
    await prisma.candidate.create({
      data: {
        electionId: election.id,
        partyId: party.id,
        partyNameEn: party.en,
        partyNameNe: party.ne,
        symbol: party.symbol,
        ballotType: 'proportional',
      },
    });

    // Direct Candidate Entry (Mock local candidate for Kathmandu)
    await prisma.candidate.create({
      data: {
        electionId: election.id,
        partyId: party.id,
        partyNameEn: party.en,
        partyNameNe: party.ne,
        candidateName: `Representative for ${party.en}`,
        symbol: party.symbol,
        ballotType: 'direct',
        province: 3, // Bagmati
        district: 'Kathmandu',
      },
    });
  }
  console.log('✅ Candidates created');

  // 3. Create Test Voters
  // Matching the mock data we had in `api.ts`
  const testVoter = await prisma.voter.upsert({
    where: { voterId: 'VOTER12345' },
    update: {},
    create: {
      voterId: 'VOTER12345',
      citizenshipNo: '12-34-56-789',
      fullName: 'Ram Bahadur Thapa',
      dateOfBirth: new Date('1990-01-01'),
      province: 3,
      district: 'Kathmandu',
      municipality: 'Kathmandu Metropolitian City',
      ward: 1,
      registeredPhone: '9841234567',
      isActive: true,
      hasVoted: false,
    },
  });
  console.log(`✅ Test Voter created: ${testVoter.fullName} (ID: ${testVoter.voterId})`);

  // Extra Test Voter Requested by User
  const yourCustomVoter = await prisma.voter.upsert({
    where: { voterId: 'MY-NEW-VOTER-ID' },
    update: {},
    create: {
      voterId: 'MY-NEW-VOTER-ID',
      citizenshipNo: '99-88-77-666',
      fullName: 'New Custom User',
      dateOfBirth: new Date('2000-05-15'),
      province: 3,
      district: 'Kathmandu',
      municipality: 'Kathmandu Metropolitian City',
      ward: 5,
      registeredPhone: '9840000000',
      isActive: true,
      hasVoted: false,
    },
  });
  console.log(`✅ Custom Voter created: ${yourCustomVoter.fullName} (ID: ${yourCustomVoter.voterId})`);

  // 4. Create Default Admin
  const adminPasswordHash = await bcrypt.hash('password', 12);
  const admin = await prisma.adminUser.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      passwordHash: adminPasswordHash,
      fullName: 'Super Administrator',
      role: 'superadmin',
      isActive: true,
    },
  });
  console.log(`✅ Default Admin created: ${admin.username} / password`);

  console.log('🌱 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Failed to seed database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
