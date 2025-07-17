import { createClient } from 'contentful';

// Check if environment variables are available
const spaceId = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

// Only create client if environment variables are available
const client = spaceId && accessToken 
  ? createClient({
      space: spaceId,
      accessToken: accessToken,
    })
  : null;

export const getEntries = async () => {
  if (!client) {
    console.warn('Contentful client not initialized - environment variables missing');
    return [];
  }
  
  try {
    const entries = await client.getEntries();
    return entries.items;
  } catch (error) {
    console.error('Error fetching entries:', error);
    return [];
  }
};

export const getBlogPosts = async () => {
  if (!client) {
    console.warn('Contentful client not initialized - environment variables missing');
    return [];
  }
  
  try {
    const entries = await client.getEntries({
      content_type: 'portfolio',
    });
    return entries.items;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
};

export const getBlogPostBySlug = async (slug) => {
  if (!client) {
    console.warn('Contentful client not initialized - environment variables missing');
    return null;
  }
  
  try {
    const entry = await client.getEntries({
      content_type: 'portfolio',
      'fields.slug': slug,
    });

    return entry.items[0];
  } catch (error) {
    console.error('Error fetching blog post by slug:', error);
    return null;
  }
};
