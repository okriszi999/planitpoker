<script lang="ts">
	import { page } from '$app/stores';
	import * as Avatar from '$lib/components/ui/avatar';

	$inspect($page);

	const { user } = $page.data.session!;
</script>

<svelte:head>
	<title>Planit Poker - Dashboard</title>
</svelte:head>

<main class="grid">
	<div>
		{JSON.stringify(user)}
		<Avatar.Root>
			<Avatar.Image src={user?.image} alt="@shadcn" />
			<Avatar.Fallback>{user?.name}</Avatar.Fallback>
		</Avatar.Root>
	</div>
</main>
