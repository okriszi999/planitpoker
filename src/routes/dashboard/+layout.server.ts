import { db } from '$lib/db';
import type { LayoutServerLoad } from '../$types';
import { getUsersRoom } from './utils/room';

export const load: LayoutServerLoad = async ({ locals, parent }) => {
	// await parent();
	const auth = await locals.auth();

	const { user } = auth!;

	const rooms = await db.query.rooms.findMany({
		with: {
			usersToRooms: {
				with: {
					user: true
				}
			}
		}
	});

	console.log('rooms in layout.server.ts:', rooms);

	return {
		session: auth,
		rooms,
		asd: 'asd'
	};
};
