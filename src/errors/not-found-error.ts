export class NotFoundError extends Error {
  public code: number;
  public message: string;
  public errorMessage: string;
  constructor(reason) {
    super();
    this.code = 404;
    this.message = `Not Found`;
    this.errorMessage = reason;
  }
}

