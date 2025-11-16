import { db } from '../lib/db';
import { users, roles } from '../lib/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

async function seedTestUser() {
	try {
		// Hash the test password "12345678"
		const hashedPassword = await bcrypt.hash('12345678', 10);

		// Check if admin role exists, create if not
		const adminRole = await db
			.select()
			.from(roles)
			.where(eq(roles.name, 'admin'))
			.limit(1);

		let adminRoleId;
		if (adminRole.length === 0) {
			const newRole = await db
				.insert(roles)
				.values({
					name: 'admin',
					label: 'Administrator',
				})
				.returning({ id: roles.id });
			adminRoleId = newRole[0].id;
		} else {
			adminRoleId = adminRole[0].id;
		}

		// Check if test user exists
		const existingUser = await db
			.select()
			.from(users)
			.where(eq(users.email, 'admin@projekan.test'))
			.limit(1);

		if (existingUser.length === 0) {
			// Create test user
			await db.insert(users).values({
				email: 'admin@projekan.test',
				passwordHash: hashedPassword,
				name: 'Admin User',
				roleId: adminRoleId,
				bio: 'Administrator account for testing',
				isVerified: true,
				rating: 5.0,
			});

			console.log('Test user created successfully!');
		} else {
			// Update existing user with correct password
			await db
				.update(users)
				.set({
					passwordHash: hashedPassword,
					name: 'Admin User',
					roleId: adminRoleId,
					bio: 'Administrator account for testing',
					isVerified: true,
					rating: 5.0,
				})
				.where(eq(users.email, 'admin@projekan.test'));

			console.log('Test user updated successfully!');
		}
	} catch (error) {
		console.error('Error seeding test user:', error);
	}
}

seedTestUser();