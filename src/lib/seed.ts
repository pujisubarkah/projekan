import { db } from './db';
import { roles, users } from './schema';
import bcrypt from 'bcryptjs';

async function seed() {
  console.log('🌱 Seeding database...');

  // Insert roles (ignore if already exists)
  console.log('📝 Inserting roles...');
  try {
    await db.insert(roles).values([
      { id: 1, name: 'admin', label: 'Administrator' },
      { id: 2, name: 'client', label: 'Client' },
      { id: 3, name: 'freelancer', label: 'Freelancer' },
    ]).onConflictDoNothing();
    console.log('✅ Roles inserted or already exist');
  } catch (error) {
    console.log('⚠️  Roles might already exist, continuing...');
  }

  // Hash password for test users
  const hashedPassword = await bcrypt.hash('12345678', 12);

  // Insert test users (ignore if already exists)
  console.log('👤 Inserting test users...');
  try {
    await db.insert(users).values([
      {
        email: 'admin@projekan.test',
        passwordHash: hashedPassword,
        name: 'Admin User',
        roleId: 1,
        bio: 'Administrator account for testing',
        isVerified: true,
      },
      {
        email: 'client@projekan.test',
        passwordHash: hashedPassword,
        name: 'Client User',
        roleId: 2,
        bio: 'Client account for testing',
        isVerified: true,
      },
      {
        email: 'freelancer@projekan.test',
        passwordHash: hashedPassword,
        name: 'Freelancer User',
        roleId: 3,
        bio: 'Freelancer account for testing',
        isVerified: true,
      },
    ]).onConflictDoNothing();
    console.log('✅ Test users inserted or already exist');
  } catch (error) {
    console.log('⚠️  Test users might already exist, continuing...');
  }

  console.log('✅ Database seeded successfully!');
}

// Run seed
seed().catch((error) => {
  console.error('❌ Error seeding database:', error);
  process.exit(1);
});