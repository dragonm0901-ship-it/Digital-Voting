const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, '../prisma/schema.prisma');
console.log('🔄 Preparing Prisma Schema for PostgreSQL (Vercel Build)...');

try {
  let schema = fs.readFileSync(schemaPath, 'utf8');
  schema = schema.replace('provider = "sqlite"', 'provider = "postgresql"');
  fs.writeFileSync(schemaPath, schema, 'utf8');
  console.log('✅ Successfully switched Prisma provider to postgresql!');
} catch (error) {
  console.error('❌ Failed to update Prisma provider:', error);
  process.exit(1);
}
