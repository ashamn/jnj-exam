import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';
import { API } from '$lib/constants/routes';
import type { RuntimeType } from '$lib/types/runtime';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	/** Cache client side - since graph data is not dynamic **/
	// setHeaders({
	// 	'cache-control': 'max-age=1' // 1 min
	// });

	const getGraphData = async (): Promise<RuntimeType> => {
		const defaultData = {
			RUN_TIME: [],
			MIN_MKT_REQT: [],
			LUZ_MKT_REQT: [],
			VIS_MKT_REQT: []
		};

		try {
			/** Get token */
			const session = await supabase.auth.getSession();
			const token = session.data.session.access_token;
			/** Fetch runtime data for preloading **/
			const response = await fetch(`${env.API_BASE_URL}${API.RUNTIME.BACKEND_URL}`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});

			if (response.ok || response.status === 200) {
				return await response.json();
			}

			// Promise rejects breaks the app when streaming
			// https://github.com/sveltejs/kit/issues/9785
			// return Promise.reject(new Error('No data'));
			// returning default data instead
			return defaultData;
		} catch (error) {
			let result = '';
			if (typeof error === 'string') {
				result = error;
			} else if (error instanceof Error) {
				result = error.message;
			}
			console.log(result);

			// Promise rejects breaks the app when streaming
			// return Promise.reject(new Error('Error connecting to the server'));
			// returning default data instead
			return defaultData;
		}
	};

	return {
		streamed: {
			runtime: getGraphData()
		}
	};
};
