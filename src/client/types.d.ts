export interface ClientConfigOptions {
  dataset?: string;
  projectId?: string;
  apiVersion?: string;
  useCdn?: boolean;
  redisUrl?: string;
}

export interface Client {
  this?: any;
  generateImage?: any;
}
