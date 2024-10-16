<script lang="ts">
	import { Skeleton } from '$lib/components/ui/skeleton/index.js';
</script>

<div class="flex items-center space-x-4 w-full">
	<Skeleton class="h-12 w-12 rounded-full" />
	<div class="space-y-2 w-full">
		<Skeleton class="h-4 w-full" />
		<Skeleton class="h-4 w-full" />
	</div>
</div>
