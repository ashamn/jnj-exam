import type { Actions, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { formSchema } from '$lib/schemas/login';
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(formSchema))
	};
};

export const actions: Actions = {
	login: async ({ request, locals: { supabase } }) => {
		/* Revalidate */
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const credentials = { email, password };
		let form = await superValidate(credentials, zod(formSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		/* Check supabase user */
		const { error } = await supabase.auth.signInWithPassword({ email, password });
		if (error) {
			const authentication =
				error.code && error.code === 'invalid_credentials'
					? ['Invalid login credentials']
					: ['Server error'];
			form = {
				...form,
				valid: false,
				errors: {
					authentication
				}
			};
			return fail(400, {
				form
			});
		}

		return {
			form
		};
	}
};
