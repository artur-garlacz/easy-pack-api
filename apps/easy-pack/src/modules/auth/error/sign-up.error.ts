export class SignUpError extends Error {
  constructor(message?: string) {
    super(`Cannot sign up an account. Reason: ${message || ''} `);
  }
}
