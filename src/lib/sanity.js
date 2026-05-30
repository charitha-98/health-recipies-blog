import { createClient } from 'next-sanity';
import { createImageUrlBuilder } from '@sanity/image-url'; // ආපහු මේක මෙහෙම ගමු

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2024-03-30', 
  useCdn: false, 
});

// Deprecation warning එක එන්නේ නැති වෙන්න builder එක initialize කරන්නේ මෙහෙමයි:
const builder = createImageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}