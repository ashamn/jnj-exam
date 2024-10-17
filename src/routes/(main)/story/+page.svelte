<script lang="ts">
	import { StoryForm } from '$lib/components/ui/pages/story';
	import StoryOutput from '$lib/components/ui/pages/story/story-output.svelte';
	export let data;
	export let form;
	let isDataLoading = false;
</script>

<section class="w-2/3">
	<StoryForm data={data.form} bind:isDataLoading />
	{#if form?.generated && !isDataLoading}
		<div class="py-16">
			<StoryOutput data={form?.generated} />
		</div>
	{/if}
</section>
