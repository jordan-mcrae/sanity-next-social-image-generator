import sanityClient from '@sanity/client';

export const getClient = (
  dataset: string,
  projectId: string,
  apiVersion: string,
  token: string,
  useCdn: boolean = false,
) =>
  sanityClient({
    dataset,
    projectId,
    apiVersion,
    token,
    useCdn,
  });
