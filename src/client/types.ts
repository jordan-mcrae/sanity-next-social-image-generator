export interface ClientConfigOptions {
  dataset?: string;
  projectId?: string;
  apiVersion?: string;
  token?: string;
  useCdn?: boolean;
  redisUrl?: string;
}

export interface Client {
  this?: any;
  generateImage?: any;
}
