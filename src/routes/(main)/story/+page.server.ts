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
		console.log('input :>> ', input);
		/** Run replicate **/
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
		// const model =
		// 	'replicate-internal/llama-3-8b-int8-1xa100-80gb-triton:cfac02c2b5d75999a95c6f102247bd40bd03feddc92d925b253a4c012a722596';
		// // const aa = await replicate.run('meta/meta-llama-3-8b', { input: payload });
		// // console.log('7734534', aa);
		// function onProgress(prediction: Prediction) {
		// 	console.log({ prediction });
		// }

		// const progress = async (prediction: Prediction) => prediction

		const prediction = await replicate.predictions.create({ model, input: payload });
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
				}, 10000);
			});
		};

		const output = await pollData();
		console.log('output :>> ', output);
		const generated = Array.isArray(output) && !!output.length ? `${input} ${output.join('')}` : '';

		// const output = await pollData();
		// console.log('rt :>> ', { output });

		// const prediction = await replicate.predictions.create({
		// 	model: "meta/meta-llama-3-8b",
		// 	input: payload,
		// 	stream: true,
		// });

		// for await (const event of replicate.stream('meta/meta-llama-3-8b', { input: payload })) {
		// 	process.stdout.write(event.toString());
		// 	// console.log('event.toString() :>> ', event.toString());
		// }
		// console.log('REPLICATE_API_TOKEN :>> ', REPLICATE_API_TOKEN);

		// const aa = await fetch('https://api.replicate.com/v1/predictions/rvjakfp881rj20cjhrs93rx9tc', {
		// 	method: 'GET',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 		Authorization: 'Bearer ' + REPLICATE_API_TOKEN
		// 	}
		// });

		// const bb = await aa.json();
		// console.log('bb :>> ', bb);

		return {
			form,
			// generated: await new Promise((resolve) =>
			// 	setTimeout(() => resolve(['asdas', 'asdasdsad']), 5000)
			// )
			generated
		};
	}
};

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(storySchema))
	};
};
