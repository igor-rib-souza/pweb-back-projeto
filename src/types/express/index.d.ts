declare namespace Express {
  export interface Request {
    user?: {
      id: number;
      name: string;
      role: "admin" | "user";
    };
  }
}
