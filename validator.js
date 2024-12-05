import { ZodIssueCode, z } from "zod";

export const dataSchema = z.object({
  x: z
    .string()
    .transform((val, ctx) => {
      val = parseFloat(val);
      if (isNaN(val)) {
        ctx.addIssue({ code: ZodIssueCode.custom, message: "Invalid number" });
        return z.NEVER;
      }
      return val;
    })
    .or(z.number()),
  y: z
    .string()
    .transform((val, ctx) => {
      val = parseFloat(val);
      if (isNaN(val)) {
        ctx.addIssue({ code: ZodIssueCode.custom, message: "Invalid number" });
        return z.NEVER;
      }
      return val;
    })
    .or(z.number()),
  z: z
    .string()
    .transform((val, ctx) => {
      val = parseFloat(val);
      if (isNaN(val)) {
        ctx.addIssue({ code: ZodIssueCode.custom, message: "Invalid number" });
        return z.NEVER;
      }
      return val;
    })
    .or(z.number()),
});
