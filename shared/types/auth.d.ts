// shared/types/auth.d.ts
declare module "#auth-utils" {
  interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role: string;
    permissions: string[];
  }

  interface UserSession {
    userId: string;
    token: string;
  }

  interface SecureSessionData {
    refreshToken: string;
  }
}

export {};
