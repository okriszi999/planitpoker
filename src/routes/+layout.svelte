<script lang="ts">
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import '../app.css';

	const { children } = $props();

	let title = $state('Title');
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

{@render children()}

<Label>
	<span>Title</span>
	<Input bind:value={title} />
</Label>
