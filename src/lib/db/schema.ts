import { relations } from 'drizzle-orm';
import { boolean, index, integer, pgTable, primaryKey, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('user', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text('name'),
	email: text('email').notNull(),
	emailVerified: timestamp('emailVerified', { mode: 'date' }),
	image: text('image')
});

export const usersRelations = relations(users, ({ many }) => ({
	usersToRooms: many(usersToRooms)
}));

export const rooms = pgTable('room', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text('name').notNull(),
	type: text('type').notNull(),
	ownerId: text('ownerId')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' })
});

export const roomsRelations = relations(rooms, ({ many }) => ({
	usersToRooms: many(usersToRooms)
}));

export const usersToRooms = pgTable(
	'users_to_rooms',
	{
		userId: text('user_id').notNull(),
		roomId: text('room_id').notNull()
	},
	(t) => ({
		compoundKey: primaryKey({
			columns: [t.userId, t.roomId]
		})
	})
);

export const usersToRoomsRelations = relations(usersToRooms, ({ one }) => ({
	room: one(rooms, {
		fields: [usersToRooms.roomId],
		references: [rooms.id]
	}),
	user: one(users, {
		fields: [usersToRooms.userId],
		references: [users.id]
	})
}));

// Auth stuff

export const accounts = pgTable(
	'account',
	{
		userId: text('userId')
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
		type: text('type').notNull(),
		provider: text('provider').notNull(),
		providerAccountId: text('providerAccountId').notNull(),
		refresh_token: text('refresh_token'),
		access_token: text('access_token'),
		expires_at: integer('expires_at'),
		token_type: text('token_type'),
		scope: text('scope'),
		id_token: text('id_token'),
		session_state: text('session_state')
	},
	(account) => ({
		compoundKey: primaryKey({
			columns: [account.provider, account.providerAccountId]
		})
	})
);

export const sessions = pgTable('session', {
	sessionToken: text('sessionToken').primaryKey(),
	userId: text('userId')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	expires: timestamp('expires', { mode: 'date' }).notNull()
});

export const verificationTokens = pgTable(
	'verificationToken',
	{
		identifier: text('identifier').notNull(),
		token: text('token').notNull(),
		expires: timestamp('expires', { mode: 'date' }).notNull()
	},
	(verificationToken) => ({
		compositePk: primaryKey({
			columns: [verificationToken.identifier, verificationToken.token]
		})
	})
);

export const authenticators = pgTable(
	'authenticator',
	{
		credentialID: text('credentialID').notNull().unique(),
		userId: text('userId')
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
		providerAccountId: text('providerAccountId').notNull(),
		credentialPublicKey: text('credentialPublicKey').notNull(),
		counter: integer('counter').notNull(),
		credentialDeviceType: text('credentialDeviceType').notNull(),
		credentialBackedUp: boolean('credentialBackedUp').notNull(),
		transports: text('transports')
	},
	(authenticator) => ({
		compositePK: primaryKey({
			name: 'authenticator_userid_credentialid_pk',
			columns: [authenticator.userId, authenticator.credentialID]
		})
	})
);
