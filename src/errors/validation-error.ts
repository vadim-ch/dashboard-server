export class ValidationError extends Error {
  public code: number;
  public message: string;
  public errorMessage: string;
  public errors: Array<any>;
  constructor(errors) {
    super();
    this.code = 422;
    this.message = `Validation Error`;
    this.errors = errors;
  }
}

