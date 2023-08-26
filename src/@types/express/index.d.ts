declare namespace Express {
  export interface Request {
    user: {
      sub: string;
      user: string;
      username: string;
    };
  }
}
