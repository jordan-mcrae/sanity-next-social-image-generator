export interface UploadArgs {
  image: Buffer;
  documentId: string;
  dataset: string;
  projectId: string;
  apiVersion: string;
  token: string;
  useCdn: boolean;
  redisUrl: string;
}
