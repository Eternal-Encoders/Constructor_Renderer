export interface RegisterSchema {
  email: string;
  password: string; 
  nickname: string;
  isLoading: boolean;
  error?: string;
}