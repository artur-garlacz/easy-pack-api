export class SignInError extends Error {
  constructor(message?: string) {
    super(`Cannot sign in an account. Reason: ${message || ''} `);
  }
}
