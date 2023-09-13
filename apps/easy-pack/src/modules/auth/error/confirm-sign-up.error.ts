export class ConfirmSigningUpError extends Error {
  constructor(message?: string) {
    super(
      `Cannot confirm for signing up an account. Reason: ${message || ''} `,
    );
  }
}
