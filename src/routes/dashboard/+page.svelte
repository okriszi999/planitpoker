<script lang="ts">
	import { page } from '$app/stores';
	import Header from './components/header.svelte';
	import RecentRooms from './components/recent/recent-rooms.svelte';

	const { user } = $page.data.session!;
	const { session } = $props();

	$inspect(user);
</script>

<svelte:head>
	<title>Planit Poker - Dashboard</title>
</svelte:head>

<main class="container mt-10 space-y-3">
	<Header />

	<RecentRooms />
</main>
