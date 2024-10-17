<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { goto } from '$app/navigation';
	import type { ButtonEventHandler } from 'bits-ui';
	import { page } from '$app/stores';
	import { NAVPAGES } from '$lib/constants/nav';
	export let data;

	/** List nav links **/
	$: navlinks = [NAVPAGES.STORY, NAVPAGES.RUNTIME].map((nav) => {
		return {
			...nav,
			active: nav.path === $page.url.pathname
		};
	});

	/** Logout **/
	$: ({ supabase } = data);
	const logout = async (e: ButtonEventHandler<MouseEvent>) => {
		e.preventDefault();
		await supabase.auth.signOut();
		await goto('/login');
	};
</script>

<div class="pt-1 md:mx-14 md:p-5">
	<nav class="relative px-4 py-4 flex justify-between items-center bg-white">
		<ul class="flex flex-row items-center">
			{#each navlinks as { name, path, active }, index}
				{#if active}
					<li>
						<a class="text-sm text-blue-600 font-bold pointer-events-none" href={path}>{name}</a>
					</li>
				{:else}
					<li>
						<a class="text-sm text-gray-400 hover:text-gray-500" href={path}>{name}</a>
					</li>
				{/if}
				{#if !(index === navlinks.length - 1)}
					<li class="text-gray-300 px-5">|</li>
				{/if}
			{/each}
		</ul>
		<Button
			variant="outline"
			class="lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold rounded-xl transition duration-200"
			on:click={logout}>Logout</Button
		>
	</nav>
	<div class="flex justify-center items-center flex-col mt-20">
		<slot />
	</div>
</div>
