<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import * as Select from '$lib/components/ui/select';

	const types = [
		{ value: 'fibonacci', label: 'Fibonacci' },
		{ value: 'sequential', label: 'Sequential' },
		{ value: 't-shirt', label: 'T-Shirt' }
	];

	let selectedType: { value: string; label: string } = $state(types[0]);

	$effect(() => {
		console.log(selectedType);
	});
</script>

<Dialog.Content class="sm:max-w-[425px]">
	<Dialog.Header>
		<Dialog.Title>Edit profile</Dialog.Title>
		<Dialog.Description>
			Make changes to your profile here. Click save when you're done.
		</Dialog.Description>
	</Dialog.Header>
	<form class="grid gap-4 py-4" method="POST" action="?/create">
		<div>
			<Label for="name" class="text-right">Name</Label>
			<Input id="name" name="name" value="My pretty cool room." class="col-span-3" />
		</div>
		<div class="flex flex-col space-y-2">
			<Label for="type" class="text-left">Type</Label>
			<div class="flex gap-2">
				<Select.Root
					selected={types[1]}
					onSelectedChange={(e) =>
						(selectedType = {
							value: e?.value!,
							label: e?.label!
						})}
				>
					<Select.Trigger>
						<Select.Value placeholder="Select a type" />
					</Select.Trigger>
					<Select.Content>
						<Select.Group>
							<Select.Label>Types</Select.Label>
							{#each types as type}
								<Select.Item value={type.value} label={type.label}>{type.label}</Select.Item>
							{/each}
						</Select.Group>
					</Select.Content>
					<Select.Input name="type" />
				</Select.Root>
				<Button>Create</Button>
			</div>
		</div>
		<Dialog.Footer>
			<Button type="submit">Save changes</Button>
		</Dialog.Footer>
	</form>
</Dialog.Content>
