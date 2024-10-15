<script lang="ts">
	import Typewriter from 'svelte-typewriter';
	export let data;
	const options = {
		mode: 'concurrent',
		delay: 2000,
		interval: 50
	};
</script>

<div class="pt-8">
	<Typewriter {...options}>
		<p>
			{data}
		</p>
	</Typewriter>
</div>
