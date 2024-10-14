<script lang="ts">
	import { goto } from '$app/navigation';
	export let data;
	const { supabase } = data;
	const logout = async () => {
		await supabase.auth.signOut();
		goto('/login');
	};
</script>

<div>Main</div>
<button on:click={logout}>Logout</button>
