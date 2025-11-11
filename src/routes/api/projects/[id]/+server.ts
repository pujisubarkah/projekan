import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { Project, ApiResponse } from '$lib/types';

// GET /api/projects/[id] - Get a single project
export const GET: RequestHandler = async ({ params }) => {
	try {
		const { id } = params;

		if (!id) {
			const response: ApiResponse<null> = {
				success: false,
				error: 'Project ID is required',
			};
			return json(response, { status: 400 });
		}

		const projectId = parseInt(id);
		if (isNaN(projectId)) {
			const response: ApiResponse<null> = {
				success: false,
				error: 'Invalid project ID',
			};
			return json(response, { status: 400 });
		}

		// Mock data - in production, fetch from database
		const mockProjects: Project[] = [
			{
				id: 1,
				title: 'Build E-commerce Website',
				description: 'Need a modern e-commerce website with payment integration. The website should have a clean design, responsive layout, and secure payment processing. Features required: product catalog, shopping cart, user accounts, order management, and admin dashboard.',
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

		const project = mockProjects.find(p => p.id === projectId);

		if (!project) {
			const response: ApiResponse<null> = {
				success: false,
				error: 'Project not found',
			};
			return json(response, { status: 404 });
		}

		const response: ApiResponse<Project> = {
			success: true,
			data: project,
		};

		return json(response);
	} catch (error) {
		console.error('Error fetching project:', error);
		const response: ApiResponse<null> = {
			success: false,
			error: 'Failed to fetch project',
		};
		return json(response, { status: 500 });
	}
};