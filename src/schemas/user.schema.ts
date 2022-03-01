import { number, object, string, TypeOf } from "zod";

export const createUserSchema = object({
  body: object({
    fullName: string({
      required_error: "Full name is required",
    }),
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
    phoneNumber: number({
      required_error: "Phone number is required",
    }),
    password: string({
      required_error: "Password is required",
    }).min(6, "Password too short - should be 6 chars minimum"),
    passwordConfirmation: string({
      required_error: "Password confirmation is required",
    }),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  }),
});

export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>,
  "body.passwordConfirmation"
>;
