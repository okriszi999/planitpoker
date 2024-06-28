<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/components/ui/button/button.svelte';
	import CardContent from '$lib/components/ui/card/card-content.svelte';
	import CardHeader from '$lib/components/ui/card/card-header.svelte';
	import CardTitle from '$lib/components/ui/card/card-title.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
	import { signIn } from '@auth/sveltekit/client';
	import { toast } from 'svelte-sonner';

	const callbackUrl = $page.url.searchParams.get('returnTo') ?? '/dashboard';

	let isLoggingIn = $state(false);
</script>

<svelte:head>
	<title>Planit Poker - Log in</title>
</svelte:head>

<main class="grid place-items-center pt-28">
	<Card class="w-1/2">
		<CardHeader>
			<CardTitle>Sign in</CardTitle>
		</CardHeader>
		<CardContent>
			<Button
				disabled={isLoggingIn}
				on:click={async () => {
					isLoggingIn = true;
					await signIn('github', { callbackUrl });

					toast.loading('Logging in...');
				}}>Sign in with GitHub</Button
			>
		</CardContent>
	</Card>
</main>
