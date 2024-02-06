import { createClient } from 'contentful';

interface GetBlogPostsOptions {
  skip?: number;
  limit?: number;
}

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

export const getEntries = async () => {
  const entries = await client.getEntries();
  return entries.items;
};

export const getTotalBlogPosts = async () => {
  const entries = await client.getEntries({ content_type: 'portfolio' });
  return entries.total;
};

export const getBlogPosts = async ({
  skip,
  limit,
}: GetBlogPostsOptions = {}) => {
  const entries = await client.getEntries({
    content_type: 'portfolio',
    skip,
    limit,
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
