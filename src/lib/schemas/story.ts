import { z } from 'zod';
export const storySchema = z.object({
	input: z.string().min(10, { message: 'Input should contain at least 10 characters' })
});

export type StorySchema = typeof storySchema;
