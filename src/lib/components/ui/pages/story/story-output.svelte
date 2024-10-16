<script lang="ts">
	import { TYPEWRITER_OPTIONS } from '$lib/constants/typewriter';
	import Typewriter from 'svelte-typewriter';
	export let data;
</script>

<Typewriter {...TYPEWRITER_OPTIONS}>
	<p>
		{data}
	</p>
</Typewriter>
