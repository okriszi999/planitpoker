<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';
	import type { PageData } from '../../$types';
	import type { Room } from '../../utils/types';
	import RoomNode from './room-node.svelte';

	// const rooms = [
	// 	{
	// 		id: crypto.randomUUID(),
	// 		name: 'Room 1',
	// 		created: new Date(),
	// 		type: 'fibonacci',
	// 		users: [
	// 			{ id: crypto.randomUUID(), name: 'User 1' },
	// 			{ id: crypto.randomUUID(), name: 'User 2' },
	// 			{ id: crypto.randomUUID(), name: 'User 3' },
	// 			{ id: crypto.randomUUID(), name: 'User 4' },
	// 			{ id: crypto.randomUUID(), name: 'User 5' },
	// 			{ id: crypto.randomUUID(), name: 'User 6' },
	// 			{ id: crypto.randomUUID(), name: 'User 7' },
	// 			{ id: crypto.randomUUID(), name: 'User 8' }
	// 		],
	// 		isModerator: false
	// 	},
	// 	{
	// 		id: crypto.randomUUID(),
	// 		name: 'Room 2',
	// 		created: new Date(),
	// 		type: 't-shirt',
	// 		users: [
	// 			{ id: crypto.randomUUID(), name: 'User 1' },
	// 			{ id: crypto.randomUUID(), name: 'User 2' },
	// 			{ id: crypto.randomUUID(), name: 'User 3' }
	// 		],
	// 		isModerator: true
	// 	},
	// 	{
	// 		id: crypto.randomUUID(),
	// 		name: 'Room 3',
	// 		created: new Date(),
	// 		type: 'sequential',
	// 		users: [
	// 			{ id: crypto.randomUUID(), name: 'User 1' },
	// 			{ id: crypto.randomUUID(), name: 'User 2' }
	// 		],
	// 		isModerator: true
	// 	}
	// ] as Room[];

	// $effect(() => {
	// 	if (currentTab === 'all') {
	// 		filteredRooms = rooms.sort((a, b) => b.created.getTime() - a.created.getTime());
	// 	} else {
	// 		filteredRooms = rooms
	// 			.sort((a, b) => b.created.getTime() - a.created.getTime())
	// 			.filter((room) => room.isModerator);
	// 	}
	// });

	let currentTab = $state('all');
	// let filteredRooms = $state(rooms);

	function changeTab(view: 'all' | 'my-rooms') {
		currentTab = view;
	}
</script>

<div>
	<h2 class="mb-6 text-2xl underline">Recent rooms</h2>

	<Tabs.Root>
		<Tabs.List>
			<Tabs.Trigger value="all" on:click={() => changeTab('all')}>All</Tabs.Trigger>
			<Tabs.Trigger value="my-rooms" on:click={() => changeTab('my-rooms')}>My Rooms</Tabs.Trigger>
		</Tabs.List>
	</Tabs.Root>

	<div class="flex flex-row gap-3 py-6">
		<!-- {#each filteredRooms as room}
			<RoomNode {room} />
		{/each} -->
	</div>
</div>
