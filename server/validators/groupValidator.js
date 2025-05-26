import { z } from "zod";

const newGroupSchema = z.object({
  groupName: z
    .string({ message: "Group name must be a string" })
    .nonempty({ message: "Group name is required" }),
});

export const validateCreateGroupBody = (req, res, next) => {
  try {
    newGroupSchema.parse(req.body);
    next();
  } catch (err) {
    next(err);
  }
};
