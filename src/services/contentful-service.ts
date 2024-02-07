import { createClient } from 'contentful';

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

export const getEntries = async () => {
  const entries = await client.getEntries();
  return entries.items;
};

export const getBlogPosts = async () => {
  const entries = await client.getEntries({
    content_type: 'portfolio',
  });
  return entries.items;
};

export const getBlogPostBySlug = async (slug) => {
  const entry = await client.getEntries({
    content_type: 'portfolio',
    'fields.slug': slug,
  });

  return entry.items[0];
};
