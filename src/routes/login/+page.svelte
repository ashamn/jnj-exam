<script lang="ts">
	import type { PageData } from './$types.js';
	import { LoginForm } from '$lib/components/ui/pages/login';
	import * as Card from '$lib/components/ui/card';
	export let data: PageData;
</script>

<section class="bg-gray-50">
	<div class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
		<Card.Root class="w-full md:mt-0 sm:max-w-md xl:p-0">
			<Card.Header>
				<Card.Title>Sign in</Card.Title>
			</Card.Header>
			<Card.Content>
				<LoginForm data={data.form} />
			</Card.Content>
		</Card.Root>
	</div>
</section>
