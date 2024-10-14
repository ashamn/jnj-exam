import { z } from 'zod';

export const formSchema = z.object({
	email: z.string().email('This is not a valid email.').min(1, { message: 'Email required' }),
	password: z.string().min(1, { message: 'Password required' }),
	authentication: z.string().optional()
});

export type FormSchema = typeof formSchema;
