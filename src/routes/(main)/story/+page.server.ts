import { superValidate } from 'sveltekit-superforms';

import { zod } from 'sveltekit-superforms/adapters';
import { storySchema } from '$lib/schemas/story';
import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';
import Replicate from 'replicate';
import { REPLICATE_API_TOKEN } from '$env/static/private';

export const actions: Actions = {
	generate: async ({ request }) => {
		/** Revalidate **/
		const formData = await request.formData();
		const input = formData.get('input') as string;
		const form = await superValidate({ input }, zod(storySchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		/** Setup replicate **/
		const replicate = new Replicate({
			auth: REPLICATE_API_TOKEN
		});
		const payload = {
			top_k: 0,
			top_p: 0.9,
			prompt: input,
			max_tokens: 512,
			min_tokens: 0,
			temperature: 0.6,
			length_penalty: 1,
			prompt_template: '{prompt}',
			presence_penalty: 1.15,
			log_performance_metrics: false
		};
		const model = 'meta/meta-llama-3-8b';

		/** Run a prediction **/
		const prediction = await replicate.predictions.create({ model, input: payload });

		/** Data polling to get the output **/
		const pollData = async () => {
			return await new Promise((resolve, reject) => {
				const interval = setInterval(async () => {
					try {
						const fetched = await fetch(prediction.urls.get, {
							method: 'GET',
							headers: {
								'Content-Type': 'application/json',
								Authorization: 'Bearer ' + REPLICATE_API_TOKEN
							}
						});
						const data: { output: Array<string>; status: string } = await fetched.json();
						if (data.status === 'succeeded') {
							resolve(data.output);
							clearInterval(interval);
						}

						if (data.status === 'canceled') {
							resolve('');
							clearInterval(interval);
						}
					} catch (error: unknown) {
						let result = '';
						if (typeof error === 'string') {
							result = error;
						} else if (error instanceof Error) {
							result = error.message;
						}
						reject(`Error connecting to replicate - ${result}`);
						clearInterval(interval);
					}
				}, 4000);
			});
		};

		/** Modify the output **/
		const output = await pollData();
		const generated = Array.isArray(output) && !!output.length ? `${input} ${output.join('')}` : '';

		return {
			form,
			generated
		};
	}
};

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(storySchema))
	};
};
