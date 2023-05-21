import { z } from 'zod';

export const registerCustomerCommand = z
  .object({
    email: z.string().min(3).max(255),
    cognitoId: z.string().min(3),
    firstName: z.string().min(3).max(255),
    lastName: z.string().min(3).max(255),
  })
  .required();

export type RegisterCustomerCommandValidator = z.infer<
  typeof registerCustomerCommand
>;
