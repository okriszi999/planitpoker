<script lang="ts">
	import { page } from '$app/stores';
	import { buttonVariants } from '$lib/components/ui/button';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import CreateRoomDialog from './create-room/create-room-dialog.svelte';

	const { user } = $page.data.session!;
</script>

<div class="flex justify-between">
	<div>
		<h1 class="text-4xl">{user?.name}'s dashboard</h1>
		<div class="text-foreground/50">
			<p>Welcome to your dashboard!</p>
			<p>Here you can manage your account and view your past sessions.</p>
		</div>
	</div>
	<Dialog.Root>
		<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>Create room</Dialog.Trigger>
		<CreateRoomDialog />
	</Dialog.Root>
</div>
