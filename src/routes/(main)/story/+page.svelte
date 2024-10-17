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
		<pre class="py-16 whitespace-pre-line">
			<StoryOutput data={form?.generated} />
		</pre>
	{/if}
</section>
