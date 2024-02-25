declare namespace NodeJS {
    export interface ProcessEnv {
      DATABASE_URL: string;
      PORT: number;
      jwtSecretKey: string;
      jwtRefreshTokenKey: string;
      USERMAIL: string;
      PSWMAIL: string;
      PATH_URL: string;
    }
  }