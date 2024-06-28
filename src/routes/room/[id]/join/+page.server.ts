import type { Actions } from '@sveltejs/kit';

export const actions = {
	default: async ({ locals }) => {
		const { auth } = locals;
		const session = await auth();

		return {
			session
		};
	}
} satisfies Actions;
