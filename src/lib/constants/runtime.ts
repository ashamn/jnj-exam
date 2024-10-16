export const REGION = {
	LUZON: {
		alias: 'LUZON',
		label: 'Luzon',
		name: 'luzon',
		col: 'LUZ_MKT_REQT'
	},
	VISAYAS: {
		alias: 'VISAYAS',
		label: 'Visayas',
		name: 'visayas',
		col: 'VIS_MKT_REQT'
	},
	MINDANAO: {
		alias: 'MINDANAO',
		label: 'Mindanao',
		name: 'mindanao',
		col: 'MIN_MKT_REQT'
	}
} as const;

export type RegionType = keyof typeof REGION;
export const getRegion = (input: RegionType) =>
	Object.values(REGION).find((r) => r.alias === input)!;
export const findRegionByName = (input: string) =>
	Object.values(REGION).find((r) => r.name === input)!;
export const regions = Object.values(REGION);
