import {z} from 'zod';

const productSchema = z.object({
    name: z.string({
        invalid_type_error: 'Product name must be a string',
        required_error: 'Product name is required.'
    }),
    description: z.string(),
    price: z.number(),
    stock: z.number(),
    category: z.string()
});

export function validateProduct(input) {
    return productSchema.safeParse(input);
}

export function validatePartialProduct(input) {
    return productSchema.partial().safeParse(input);
}