export function getStrapiUrl(path = '') {
  return `${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'}${path}`;
}

/**
 * Returns the correct strapi image url depending on the environment.
 * @param {any} media
 * @returns {string} Image url.
 */
export function getStrapiMedia(media: any): string {
  const imageUrl = media.url.startsWith('/') ? getStrapiUrl(media.url) : media.url;
  return imageUrl;
}
