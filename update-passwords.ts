import { db } from './src/lib/db';
import { users } from './src/lib/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

async function updatePasswords() {
  try {
    console.log('🔄 Updating password hashes with correct salt rounds...');

    // Hash password with correct salt rounds (12)
    const hashedPassword = await bcrypt.hash('12345678', 12);
    console.log('New hash generated with salt rounds 12');

    // Update all test users
    const emails = ['admin@projekan.test', 'client@projekan.test', 'freelancer@projekan.test'];

    for (const email of emails) {
      await db.update(users)
        .set({ passwordHash: hashedPassword })
        .where(eq(users.email, email));

      console.log(`✅ Updated password for ${email}`);
    }

    console.log('🎉 All password hashes updated successfully!');
  } catch (error) {
    console.error('❌ Error updating passwords:', error);
    throw error;
  }
}

// Run the update
updatePasswords().catch((error) => {
  console.error('Script failed:', error);
  process.exit(1);
});