<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { formSchema, type FormSchema } from '$lib/schemas/login';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';

	export let data: SuperValidated<Infer<FormSchema>>;

	const form = superForm(data, {
		validators: zodClient(formSchema)
	});

	const { form: formData, enhance, delayed } = form;
</script>

<form method="POST" action="?/login" use:enhance>
	<Form.Field {form} name="email">
		<Form.Control let:attrs>
			<Form.Label class="!text-current">Email</Form.Label>
			<Input {...attrs} bind:value={$formData.email} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="password">
		<Form.Control let:attrs>
			<Form.Label class="!text-current">Password</Form.Label>
			<Input {...attrs} type="password" bind:value={$formData.password} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<div class="pt-4">
		<Form.Field {form} name="authentication">
			<Form.FieldErrors />
		</Form.Field>
	</div>
	<div class="pt-8">
		<Form.Button class="w-full" disabled={!!$delayed}>
			{#if $delayed}
				<LoaderCircle class="mr-2 h-4 w-4 animate-spin text-white" />
			{/if}
			Submit
		</Form.Button>
	</div>
</form>
