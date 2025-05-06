export interface User {
  id: string;
  username: string;
}

export interface UserSchema {
  authData?: string;
  isLoading: boolean;
  error?: string;
}