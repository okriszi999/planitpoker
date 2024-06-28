import { db } from '$lib/db';
import type { FormRoomData } from './types';
import { rooms, usersToRooms } from '$lib/db/schema';
import { eq } from 'drizzle-orm';

export async function createRoom(roomData: FormRoomData, userId: string) {
	console.log('Creating room with the name of', roomData.name);

	const room = await db
		.insert(rooms)
		.values({
			...roomData,
			ownerId: userId
		})
		.returning();

	if (!room) {
		throw new Error('Failed to create room');
	}

	console.log('Room created with the id of', room[0].id);

	console.log('Adding user to room', room[0].id, 'with the id of', userId);

	const userToRoom = await db.insert(usersToRooms).values({
		userId,
		roomId: room[0].id
	});

	if (!userToRoom) {
		throw new Error('Failed to add user to room');
	}
	console.log('User added to room');
}

export async function getUsersRoom(userId: string) {
	const userRooms = await db.query.rooms.findMany({
		with: {
			usersToRooms: {
				with: {
					user: true
				}
			}
		}
	});
	console.log('User rooms:', userRooms);
	return userRooms;
}
