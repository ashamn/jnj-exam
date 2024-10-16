<script lang="ts">
	import Plot from 'svelte-plotly.js';
	import Selection from '$lib/components/ui/pages/runtime/selection.svelte';
	import SkeletonCard from '$lib/components/ui/pages/runtime/skeleton-card.svelte';
	import { REGION } from '$lib/constants/runtime';
	import { fade } from 'svelte/transition';
	export let data;
	$: ({
		streamed: { runtime }
	} = data);
	$: currentRegion = { value: REGION.LUZON.col, label: REGION.LUZON.label }; // default column
	let skeletonVisibility = false;
</script>

<section class="flex flex-col w-full">
	<div class="px-20">
		<Selection bind:sel={currentRegion} />
	</div>

	{#await runtime}
		{#if !skeletonVisibility}
			<div
				class="px-20 mt-16 w-full"
				transition:fade
				on:introstart={() => (skeletonVisibility = false)}
				on:outroend={() => (skeletonVisibility = true)}
			>
				<SkeletonCard />
			</div>
		{/if}
	{:then runtimeData}
		<div class="mt-16" in:fade>
			<Plot
				data={[{ y: runtimeData[currentRegion.value], x: runtimeData.RUN_TIME }]}
				layout={{
					margin: { t: 0 }
				}}
				fillParent="width"
			/>
		</div>
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}
</section>
