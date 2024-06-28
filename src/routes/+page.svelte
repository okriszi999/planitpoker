<script>
	import { page } from '$app/stores';
	import Button from '$lib/components/ui/button/button.svelte';
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { toast } from 'svelte-sonner';

	const { session } = $page.data;
</script>

{#if session}
	<h1>Welcome, {session.user?.name}!</h1>
{:else}
	<h1>Not signed in!!</h1>
{/if}

<Button
	on:click={() => {
		toast('dismissable', {
			cancel: {
				label: 'X'
			}
		});
	}}>Toast</Button
>

<nav>
	<p>
		These actions are all using the methods exported from
		<code>@auth/sveltekit/client</code>
	</p>
	<div class="actions">
		{#if !session}
			<div class="wrapper-form">
				<button on:click={() => signIn('github')}>Sign In with GitHub</button>
			</div>
		{:else}
			<div class="wrapper-form">
				<button on:click={() => signOut()}> Sign Out </button>
			</div>
		{/if}
	</div>
</nav>
