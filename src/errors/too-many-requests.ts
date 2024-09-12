import { CustomError } from './custom-error';

export class TooManyRequestsError extends CustomError {
  statusCode = 429;

  constructor(public retryAfter: number) {
    super('Too many requests');

    Object.setPrototypeOf(this, TooManyRequestsError.prototype);
  }

  serializeErrors() {
    return [{ message: 'Too many requests', retryAfter: this.retryAfter }];
  }
}
