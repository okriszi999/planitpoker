import type { Actions } from '@sveltejs/kit';
import type { FormRoomData } from './utils/types';
import { createRoom, getUsersRoom } from './utils/room';

export const actions = {
	create: async ({ request, locals }) => {
		const data = await request.formData();
		const auth = await locals.auth();
		const { user } = auth!;

		if (!user) {
			return {
				status: 401,
				body: 'Unauthorized'
			};
		}

		const roomData = Object.fromEntries(data) as FormRoomData;

		try {
			await createRoom(roomData, user?.id!);
		} catch (e) {
			console.error(e);
			return {
				status: 500,
				body: 'Failed to create room'
			};
		}
	}
} satisfies Actions;
