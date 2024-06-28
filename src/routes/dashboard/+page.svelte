<script lang="ts">
	import { page } from '$app/stores';
	import * as Accordion from '$lib/components/ui/accordion';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Item } from '$lib/components/ui/dropdown-menu';
	import * as Tabs from '$lib/components/ui/tabs';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { toast } from 'svelte-sonner';

	$inspect($page);

	const rooms = [
		{
			id: crypto.randomUUID(),
			name: 'Room 1',
			created: new Date(),
			type: 'fibonacci',
			users: [
				{ id: crypto.randomUUID(), name: 'User 1' },
				{ id: crypto.randomUUID(), name: 'User 2' },
				{ id: crypto.randomUUID(), name: 'User 3' },
				{ id: crypto.randomUUID(), name: 'User 4' },
				{ id: crypto.randomUUID(), name: 'User 5' },
				{ id: crypto.randomUUID(), name: 'User 6' },
				{ id: crypto.randomUUID(), name: 'User 7' },
				{ id: crypto.randomUUID(), name: 'User 8' }
			],
			isModerator: false
		},
		{
			id: crypto.randomUUID(),
			name: 'Room 2',
			created: new Date(),
			type: 't-shirt',
			users: [
				{ id: crypto.randomUUID(), name: 'User 1' },
				{ id: crypto.randomUUID(), name: 'User 2' },
				{ id: crypto.randomUUID(), name: 'User 3' }
			],
			isModerator: true
		},
		{
			id: crypto.randomUUID(),
			name: 'Room 3',
			created: new Date(),
			type: 'sequential',
			users: [
				{ id: crypto.randomUUID(), name: 'User 1' },
				{ id: crypto.randomUUID(), name: 'User 2' }
			],
			isModerator: true
		}
	] as {
		id: string;
		name: string;
		created: Date;
		type: 'fibonacci' | 't-shirt' | 'sequential';
		users: { id: string; name: string }[];
		isModerator?: boolean;
	}[];

	$effect(() => {
		if (currentTab === 'all') {
			filteredRooms = rooms.sort((a, b) => b.created.getTime() - a.created.getTime());
		} else {
			filteredRooms = rooms
				.sort((a, b) => b.created.getTime() - a.created.getTime())
				.filter((room) => room.isModerator);
		}
	});

	async function joinRoom(id: string) {
		return await new Promise((resolve) => setTimeout(resolve, 4000));
	}

	let currentTab = $state('all');
	let filteredRooms = $state(rooms);

	function changeTab(view: 'all' | 'my-rooms') {
		currentTab = view;
	}

	const { user } = $page.data.session!;
</script>

<svelte:head>
	<title>Planit Poker - Dashboard</title>
</svelte:head>

<main class="container space-y-5">
	<div>
		<h1 class="text-4xl">{user?.name}'s dashboard</h1>
		<div class="text-foreground/50">
			<p>Welcome to your dashboard!</p>
			<p>Here you can manage your account and view your past sessions.</p>
		</div>
	</div>

	<div>
		<h2 class="mb-6 text-2xl underline">Recent rooms</h2>

		<Tabs.Root>
			<Tabs.List>
				<Tabs.Trigger value="all" on:click={() => changeTab('all')}>All</Tabs.Trigger>
				<Tabs.Trigger value="my-rooms" on:click={() => changeTab('my-rooms')}>My Rooms</Tabs.Trigger
				>
			</Tabs.List>
		</Tabs.Root>
		<Accordion.Root class="space-y-4">
			{#each filteredRooms as room}
				<Accordion.Item value={room.id}>
					<Accordion.Trigger>
						<div class="flex w-full items-center justify-between pr-4">
							<p>{room.name}</p>
							<div class="hidden gap-2 md:flex">
								<Badge variant="secondary" class="pointer-events-none justify-end no-underline"
									>{room.type}</Badge
								>
								<Badge variant="outline" color="secondary"
									>{room.created.toLocaleDateString()}</Badge
								>
								{#if room.users.length}
									<Tooltip.Root>
										<Tooltip.Trigger>
											<Badge variant="outline" color="secondary">{room.users.length} user(s)</Badge>
										</Tooltip.Trigger>
										<Tooltip.Content>
											<div class="flex flex-row gap-2">
												{#each room.users as user}
													<p class="underline">{user.name}</p>
												{/each}
											</div>
										</Tooltip.Content>
									</Tooltip.Root>
								{/if}
								{#if room.isModerator}
									<Badge variant="success">Created by you</Badge>
								{/if}
							</div>
						</div>
					</Accordion.Trigger>
					<Accordion.Content>
						<div class="flex justify-between">
							<div>
								<Button
									variant="secondary"
									on:click={async () => {
										toast.promise(joinRoom(room.id), {
											loading: 'Joining room...',
											success: 'Successfully joined room!',
											error: 'Failed to join room.',
											duration: 1000
										});
									}}>Join</Button
								>
								{#if room.isModerator}
									<Button variant="ghost" href={`/room/${room.id}/edit`}>Edit</Button>
								{/if}
							</div>
							<div>
								{#if room.isModerator}
									<Button variant="destructive" href={`/room/${room.id}/delete`}>Delete</Button>
								{:else}
									<Button variant="destructive" href={`/room/${room.id}/leave`}>Leave</Button>
								{/if}
							</div>
						</div>
					</Accordion.Content>
				</Accordion.Item>
			{/each}
		</Accordion.Root>
	</div>
</main>
