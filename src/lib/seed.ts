import { db } from './db';
import { roles, users, categories, skills } from './schema';

async function seed() {
  console.log('🌱 Seeding database...');

  // Insert roles
  console.log('📝 Inserting roles...');
  await db.insert(roles).values([
    { name: 'admin', label: 'Administrator' },
    { name: 'client', label: 'Client' },
    { name: 'freelancer', label: 'Freelancer' },
  ]);

  // Insert categories
  console.log('📂 Inserting categories...');
  await db.insert(categories).values([
    { name: 'Desain Grafis', slug: 'desain-grafis', description: 'Jasa desain logo, branding, dan visual lainnya' },
    { name: 'Pengembangan Web', slug: 'pengembangan-web', description: 'Pembuatan website, aplikasi web, dan sistem online' },
    { name: 'Penulisan', slug: 'penulisan', description: 'Jasa penulisan artikel, konten, dan copywriting' },
    { name: 'Pemasaran Digital', slug: 'pemasaran-digital', description: 'Strategi marketing online dan kampanye digital' },
    { name: 'Fotografi', slug: 'fotografi', description: 'Jasa fotografi produk, event, dan portrait' },
    { name: 'Video Editing', slug: 'video-editing', description: 'Editing video, motion graphics, dan animasi' },
  ]);

  // Insert skills
  console.log('🛠️ Inserting skills...');
  await db.insert(skills).values([
    { name: 'Adobe Illustrator' },
    { name: 'Adobe Photoshop' },
    { name: 'Adobe Premiere Pro' },
    { name: 'Figma' },
    { name: 'Sketch' },
    { name: 'HTML/CSS' },
    { name: 'JavaScript' },
    { name: 'React' },
    { name: 'Node.js' },
    { name: 'Python' },
    { name: 'PHP' },
    { name: 'Laravel' },
    { name: 'WordPress' },
    { name: 'SEO' },
    { name: 'Social Media Marketing' },
    { name: 'Content Writing' },
    { name: 'Copywriting' },
    { name: 'Photography' },
    { name: 'Video Editing' },
    { name: 'Logo Design' },
    { name: 'Branding' },
    { name: 'UI/UX Design' },
    { name: 'Mobile App Development' },
  ]);

  // Insert admin user
  console.log('👤 Inserting admin user...');
  await db.insert(users).values({
    email: 'admin@projekan.test',
    passwordHash: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password: password
    name: 'Admin Projekan',
    roleId: 1, // admin
    isVerified: true,
  });

  console.log('✅ Database seeded successfully!');
}

// Run seed
seed().catch((error) => {
  console.error('❌ Error seeding database:', error);
  process.exit(1);
});