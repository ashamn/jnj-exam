import { NAVPAGES } from '$lib/constants/nav';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ url: { pathname } }) => {
	const navlinks = [NAVPAGES.STORY, NAVPAGES.RUNTIME].map((nav) => {
		return {
			...nav,
			active: nav.path === pathname
		};
	});

	return {
		navlinks
	};
};
