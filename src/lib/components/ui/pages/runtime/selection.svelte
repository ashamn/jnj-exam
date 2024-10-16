<script lang="ts">
	import * as Select from '$lib/components/ui/select';
	import { regions } from '$lib/constants/runtime';
	import { Label } from '$lib/components/ui/label';
	export let sel;
	let selected = sel;
</script>

<Select.Root
	bind:selected
	onOpenChange={() => {
		sel = selected;
	}}
>
	<Label>Runtime per region</Label>
	<Select.Trigger class="w-[180px]">
		<Select.Value placeholder="Select a region" />
	</Select.Trigger>
	<Select.Content>
		<Select.Group>
			{#each regions as region}
				<Select.Item value={region.col} label={region.label}>{region.name}</Select.Item>
			{/each}
		</Select.Group>
	</Select.Content>
	<Select.Input name="region" />
</Select.Root>
