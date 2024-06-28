<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/components/ui/button/button.svelte';
	import '../app.css';
	import { Toaster } from '$lib/components/ui/sonner';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index';
	import * as Avatar from '$lib/components/ui/avatar';
	import { signOut } from '@auth/sveltekit/client';

	const { children } = $props();

	const { session } = $page.data;
</script>

<svelte:head>
	<title>Planit Poker</title>
</svelte:head>

<Toaster />

<nav class="flex h-14 w-screen items-center justify-between px-5 shadow-sm">
	<div>
		<h1>Planit poker</h1>
	</div>

	{#if !session?.user}
		<div>
			<Button href="/authentication/signin">Sign in</Button>
		</div>
	{:else}
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild let:builder>
				<Button builders={[builder]} variant="ghost" class="gap-3">
					<Avatar.Root class="size-8">
						<Avatar.Image src={session.user.image} alt={session.user.name} />
						<Avatar.Fallback>{session.user.name}</Avatar.Fallback>
					</Avatar.Root>
					<span>{session.user.name}</span>
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content class="w-56">
				<DropdownMenu.Group>
					<DropdownMenu.Item class="cursor-pointer">Dashboard</DropdownMenu.Item>
				</DropdownMenu.Group>
				<DropdownMenu.Separator />
				<DropdownMenu.Group>
					<DropdownMenu.Item
						class="cursor-pointer"
						on:click={() => {
							signOut({
								callbackUrl: '/'
							});
						}}>Logout</DropdownMenu.Item
					>
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	{/if}
</nav>

{@render children()}
