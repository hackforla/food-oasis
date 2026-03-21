declare namespace Express {
  export interface Request {
    user?: {
      email?: string;
      id?: string;
      role?: string;
      sub?: string;
      firstName?: string;
      lastName?: string;
      features?: string[];
    };
  }
}
