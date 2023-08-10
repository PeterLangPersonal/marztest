import { z } from 'zod';

export const productSchema = z.object({
    ProductName: z.string(),
    ProductPhotoUrl: z.string(),
    ProductStatus: z.enum(["Active", "InActive"]),
});

export const updateProductStatusSchema = z.object({
    ProductStatus: z.enum(["Active", "InActive"]),
});