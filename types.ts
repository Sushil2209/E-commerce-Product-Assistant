export enum Role {
  USER = 'user',
  MODEL = 'model',
  LOADING = 'loading',
}

export interface Message {
  role: Role;
  content: string;
}