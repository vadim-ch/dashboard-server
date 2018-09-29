export class AuthError extends Error {
  public code: number;
  public message: string;
  public errorMessage: string;
  constructor(reason) {
    super();
    this.code = 409;
    this.message = `Conflict`;
    this.errorMessage = reason;
  }
}

