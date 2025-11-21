/**
 * Content Collections Configuration
 *
 * Define the schema for blog posts using Astro's content collections.
 * Simplified for Stand for Hemp - no categories or author images.
 */

import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    featuredImage: z.string().optional(),
    author: z.string().optional(),
    date: z.coerce.date(),
    readingTime: z.number().optional(), // in minutes
    draft: z.boolean().default(false),
    // Legacy fields from template - kept as optional for backward compatibility
    category: z.string().optional(),
    authorImage: z.string().optional(),
  }),
});

export const collections = {
  blog,
};
