import { z } from "zod";

const signupSchema = z
  .object({
    username: z
      .string({ message: "Username must be a string" })
      .nonempty({ message: "Username is required" }),
    email: z
      .string({ message: "Email must be a string" })
      .nonempty({ message: "Email is required" }),
    password: z
      .string({ message: "Password must be a string" })
      .nonempty({ message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters long" }),
    gender: z
      .string({ message: "Gender must be a string" })
      .nonempty({ message: "Gender is required" }),
    birthDate: z
      .string({ message: "BirthDate must be a string or date" })
      .nonempty({ message: "BirthDate is required" }),
  })
  .strict();

const signinSchema = z
  .object({
    username: z
      .string({ message: "Username must be a string" })
      .nonempty({ message: "Username is required" })
      .optional(),
    email: z
      .string({ message: "Email must be a string" })
      .nonempty({ message: "Email is required" })
      .optional(),
    password: z
      .string({ message: "Password must be a string" })
      .nonempty({ message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters long" }),
  })
  .strict()
  .refine((data) => data.username || data.email, {
    message: "Either username or email must be provided.",
    path: ["username"],
  });

export const validateSignupReqBody = (req, res, next) => {
  try {
    signupSchema.parse(req.body);
    next();
  } catch (err) {
    next(err);
  }
};

export const validateSigninReqBody = (req, res, next) => {
  try {
    signinSchema.parse(req.body);
    next();
  } catch (err) {
    next(err);
  }
};
