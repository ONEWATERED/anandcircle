
import { z } from 'zod';

// Form validation schema
export const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().optional(),
  message: z.string().optional(),
});

export type FormValues = z.infer<typeof formSchema>;

// Define interest submission type
export interface InterestSubmission extends FormValues {
  id: string;
  date: string;
  type: 'avatar' | 'profile' | 'none';
}

// HubSpot payment link
export const HUBSPOT_PAYMENT_LINK = "https://app-na2.hubspot.com/payment-links/242071608/preview/215795906/test";
