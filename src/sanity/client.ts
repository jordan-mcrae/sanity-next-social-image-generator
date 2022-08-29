import { createClient } from 'next-sanity';

export const getClient = (dataset: string, projectId: string, apiVersion: string, useCdn: boolean = false) =>
  createClient({
    dataset,
    projectId,
    apiVersion,
    useCdn,
  });
