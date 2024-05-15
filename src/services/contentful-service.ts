import { createClient, Entry } from 'contentful';

import { Post } from '../types/post';

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID as string,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN as string,
});

export const getEntries = async () => {
  const entries = await client.getEntries();
  return entries.items;
};

export const getBlogPosts = async (): Promise<Post[]> => {
  const entries = await client.getEntries<Post>({
    content_type: 'portfolio',
  });
  return entries.items;
};

export const getBlogPostBySlug = async (slug: string): Promise<Entry<Post>> => {
  const entry = await client.getEntries<Post>({
    content_type: 'portfolio',
    'fields.slug': slug,
  });

  return entry.items[0];
};
