import { z } from 'zod';

export const productSchema = z.object({
    dateCreated: z.string(),
    webVisitors: z.number(),
    prClippings: z.number(),
});
