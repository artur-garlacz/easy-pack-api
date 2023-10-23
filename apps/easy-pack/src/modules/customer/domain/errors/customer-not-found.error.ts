export class CustomerNotFoundError extends Error {
  constructor({
    message,
    entityId,
  }: { entityId?: string; message?: string } = {}) {
    if (message) {
      super(message);
      return;
    }

    if (entityId) {
      super(`Customer identified by ID: ${entityId} not found`);
      return;
    }

    super('Customer not found');
  }
}
