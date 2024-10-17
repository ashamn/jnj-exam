<script lang="ts">
	import { storySchema, type StorySchema } from '$lib/schemas/story';
	import { type Infer, type SuperValidated, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import * as Form from '$lib/components/ui/form/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { STORY_PLACEHOLDER } from '$lib/constants/defaults';
	import { LoaderCircle } from 'lucide-svelte';

	export let data;
	export let isDataLoading;
	const form = superForm(data, {
		validators: zodClient(storySchema),
		onUpdated: ({ form: f }) => {
			isDataLoading = false;
			if (f.valid) {
				toast.success(`You submitted ${JSON.stringify(f.data, null, 2)}`);
			} else {
				toast.error('Please fix the errors in the form.');
			}
		},
		onSubmit: () => {
			isDataLoading = true;
		}
	});

	const { form: formData, enhance, delayed } = form;
</script>

<form method="POST" action="?/generate" class="w-full" use:enhance>
	<Form.Field {form} name="input" class="space-y-5">
		<Form.Control let:attrs>
			<Form.Label class="!text-current">Story Generator</Form.Label>
			<Textarea
				{...attrs}
				placeholder={STORY_PLACEHOLDER}
				class="resize-none min-h-40"
				bind:value={$formData.input}
			/>
			<Form.Description>Model: meta/meta-llama-3-8b</Form.Description>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button class="mt-5" disabled={!!$delayed}>
		{#if $delayed}
			<LoaderCircle class="mr-2 h-4 w-4 animate-spin text-white" />
		{/if}
		{$delayed ? 'Please wait' : 'Generate'}</Form.Button
	>
</form>
