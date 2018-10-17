export class NotOwnedError extends Error {
  public code: number;
  public message: string;
  public errorMessage: string;
  constructor(reason) {
    super();
    this.code = 403;
    this.message = `Not owned by current user`;
    this.errorMessage = reason;
  }
}

