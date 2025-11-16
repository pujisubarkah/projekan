import { db } from './src/lib/db';
import { users, roles } from './src/lib/schema';
import { eq, isNull } from 'drizzle-orm';

async function checkUsers() {
  try {
    console.log('🔍 Checking users in database...');

    // Check total users
    const allUsers = await db.select().from(users);
    console.log('📊 Total users in table:', allUsers.length);

    // Check users without deletedAt filter
    const activeUsers = await db.select().from(users).where(isNull(users.deletedAt));
    console.log('✅ Active users (deletedAt is null):', activeUsers.length);

    // Check roles
    const allRoles = await db.select().from(roles);
    console.log('👥 Total roles:', allRoles.length);
    console.log('Roles data:', allRoles);

    // Check specific test users
    const testUsers = await db.select().from(users).where(eq(users.email, 'client@projekan.test'));
    console.log('🧪 Client test user:', testUsers.length > 0 ? 'Found' : 'Not found');
    if (testUsers.length > 0) {
      console.log('Client user data:', {
        id: testUsers[0].id,
        email: testUsers[0].email,
        name: testUsers[0].name,
        roleId: testUsers[0].roleId,
        deletedAt: testUsers[0].deletedAt
      });
    }

    // Test the exact query from API
    const usersWithRoles = await db
      .select({
        id: users.id,
        email: users.email,
        name: users.name,
        roleId: users.roleId,
        bio: users.bio,
        avatarUrl: users.avatarUrl,
        location: users.location,
        rating: users.rating,
        isVerified: users.isVerified,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
        deletedAt: users.deletedAt,
        role: {
          id: roles.id,
          name: roles.name,
          label: roles.label,
        },
      })
      .from(users)
      .leftJoin(roles, eq(users.roleId, roles.id))
      .where(isNull(users.deletedAt));

    console.log('🔗 Users with roles query result:', usersWithRoles.length);

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// Run the check
checkUsers().catch((error) => {
  console.error('Script failed:', error);
  process.exit(1);
});