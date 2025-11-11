import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { Project, ApiResponse } from '$lib/types';

// GET /api/projects - List all projects
export const GET: RequestHandler = async () => {
	try {
		// Mock data - in production, fetch from database
		const projects: Project[] = [
			{
				id: 1,
				title: 'Build E-commerce Website',
				description: 'Need a modern e-commerce website with payment integration. The website should have a clean design, responsive layout, and secure payment processing.',
				budget: 2500,
				category: 'Web Development',
				status: 'open',
				clientId: 1,
				client: {
					id: 1,
					email: 'client@example.com',
					name: 'John Smith',
					role: 'client',
				},
				deadline: new Date('2024-02-15'),
				createdAt: new Date('2024-01-15'),
			},
			{
				id: 2,
				title: 'Mobile App Development',
				description: 'Cross-platform mobile app for task management with offline capabilities.',
				budget: 1800,
				category: 'Mobile Development',
				status: 'open',
				clientId: 2,
				client: {
					id: 2,
					email: 'client2@example.com',
					name: 'Jane Doe',
					role: 'client',
				},
				deadline: new Date('2024-03-01'),
				createdAt: new Date('2024-01-20'),
			},
		];

		const response: ApiResponse<Project[]> = {
			success: true,
			data: projects,
		};

		return json(response);
	} catch (error) {
		console.error('Error fetching projects:', error);
		const response: ApiResponse<null> = {
			success: false,
			error: 'Failed to fetch projects',
		};
		return json(response, { status: 500 });
	}
};

// POST /api/projects - Create a new project
export const POST: RequestHandler = async ({ request }) => {
	try {
		const body = await request.json();

		// Validate required fields
		const { title, description, budget, category, deadline } = body;

		if (!title || !description || !budget || !category) {
			const response: ApiResponse<null> = {
				success: false,
				error: 'Missing required fields: title, description, budget, category',
			};
			return json(response, { status: 400 });
		}

		// Mock project creation - in production, save to database
		const newProject: Project = {
			id: Date.now(), // Mock ID generation
			title,
			description,
			budget: Number(budget),
			category,
			status: 'open',
			clientId: 1, // Mock client ID - in production, get from auth
			client: {
				id: 1,
				email: 'client@example.com',
				name: 'John Smith',
				role: 'client',
			},
			deadline: deadline ? new Date(deadline) : undefined,
			createdAt: new Date(),
		};

		const response: ApiResponse<Project> = {
			success: true,
			data: newProject,
		};

		return json(response, { status: 201 });
	} catch (error) {
		console.error('Error creating project:', error);
		const response: ApiResponse<null> = {
			success: false,
			error: 'Failed to create project',
		};
		return json(response, { status: 500 });
	}
};