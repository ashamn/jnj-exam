<script lang="ts">
	import { StoryForm } from '$lib/components/ui/pages/story';
	import StoryOutput from '$lib/components/ui/pages/story/story-output.svelte';
	export let data;
	export let form;
	let isDataLoading = false;
</script>

<section>
	<StoryForm data={data.form} bind:isDataLoading />
	{#if form?.generated && !isDataLoading}
		<StoryOutput data={form?.generated} />
	{/if}
</section>
