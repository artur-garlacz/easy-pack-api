import { z } from 'zod';

export const createDeliveryRequestCommand = z
  .object({
    packages: z
      .array(
        z.object({
          weight: z.number().min(0.1).max(1000),
          length: z.number().min(0.1).max(1000),
          width: z.number().min(0.1).max(1000),
          height: z.number().min(0.1).max(1000),
        }),
      )
      .min(1),
    pickupAddress: z.object({
      firstName: z.string().min(3).max(255),
      lastName: z.string().min(3).max(255),
      street: z.string().min(3).max(255),
      city: z.string().min(3).max(255),
      country: z.string().min(3).max(255),
      postalCode: z.string().min(3).max(255),
      phoneNumber: z.string().min(3).max(255),
      email: z.string().min(3).max(255),
    }),
    deliveryAddress: z.object({
      firstName: z.string().min(3).max(255),
      lastName: z.string().min(3).max(255),
      street: z.string().min(3).max(255),
      city: z.string().min(3).max(255),
      country: z.string().min(3).max(255),
      postalCode: z.string().min(3).max(255),
      phoneNumber: z.string().min(3).max(255),
      email: z.string().min(3).max(255),
    }),
  })
  .required();

export type CreateDeliveryRequestCommandValidator = z.infer<
  typeof createDeliveryRequestCommand
>;
