<script lang="ts">
	import type { PageData } from './$types.js';
	import LoginForm from './login-form.svelte';
	export let data: PageData;
</script>

<section class="bg-gray-50">
	<div class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
		<div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
			<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
				<h1
					class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
				>
					Sign in
				</h1>
				<LoginForm data={data.form} />
			</div>
		</div>
	</div>
</section>
