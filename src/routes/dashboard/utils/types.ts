export type Room = {
	id: string;
	name: string;
	created: Date;
	type: 'fibonacci' | 't-shirt' | 'sequential';
	users: { id: string; name: string }[];
	isModerator?: boolean;
};

export type FormRoomData = {
	name: string;
	type: string;
};
