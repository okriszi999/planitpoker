<script lang="ts">
	import { page } from '$app/stores';
	import * as ContextMenu from '$lib/components/ui/context-menu/index.js';
	import type { Room } from '../../utils/typestils/types';

	const {
		room
	}: {
		room: Room;
	} = $props();

	function getJoinRoomLink(id: string) {
		return `${$page.url.origin}/room/${id}/join`;
	}
</script>

<ContextMenu.Root>
	<ContextMenu.Trigger>
		<div class="grid size-40 cursor-pointer place-items-center rounded border hover:bg-primary/10">
			{room.name}
		</div>
	</ContextMenu.Trigger>
	<ContextMenu.Content class="w-64">
		<ContextMenu.Item inset>
			Forward
			<ContextMenu.Shortcut>⌘]</ContextMenu.Shortcut>
		</ContextMenu.Item>
		<ContextMenu.Item
			inset
			on:click={() => {
				navigator.clipboard.writeText(getJoinRoomLink(room.id));
			}}>Copy link to clipboard.</ContextMenu.Item
		>
	</ContextMenu.Content>
</ContextMenu.Root>
