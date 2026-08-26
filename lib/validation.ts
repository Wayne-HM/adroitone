import { z } from "zod";
import { SERVICE_OPTION_VALUES } from "@/data/services";
import { BUDGET_OPTION_VALUES } from "@/data/contact-options";

/**
 * Single source of truth for contact-form validation.
 * Used on the client for instant feedback and on the server
 * (POST /api/contact) as the authoritative check.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(80, "Name is too long."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your work email.")
    .email("Enter a valid email address.")
    .max(120, "Email is too long."),
  company: z
    .string()
    .trim()
    .min(1, "Please enter your company.")
    .max(120, "Company is too long."),
  phone: z
    .string()
    .trim()
    .max(24, "Phone number is too long.")
    .regex(
      /^[+()\-.\s\d]{6,24}$/,
      "Enter a valid phone number or leave this blank."
    )
    .optional()
    .or(z.literal("")),
  service: z.enum(SERVICE_OPTION_VALUES, {
    message: "Select a service.",
  }),
  budget: z.enum(BUDGET_OPTION_VALUES, {
    message: "Select an engagement range.",
  }),
  message: z
    .string()
    .trim()
    .min(20, "Tell us a little more — at least 20 characters.")
    .max(2500, "Message is too long."),
  /** Honeypot — must stay empty. Real users never see this field. */
  website: z.string().max(0, "Spam detected.").optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
