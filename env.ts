import * as z from "zod/v4";

const envSchema = z.object({
  AUTH_SECRET: z.string(),
  AUTH_GOOGLE_ID: z.string(),
  AUTH_GOOGLE_SECRET: z.string(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  try {
    console.error(parsed.error.message);
    const err = z.treeifyError(parsed.error);
    throw new Error(JSON.stringify(err));
  } catch (error) {
    throw new Error(
      (error as Error).message ?? "Invalid environment variables"
    );
  }
}

export default {
  env: {
    AUTH_SECRET: process.env.AUTH_SECRET,
    AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
    AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET,
  },
};

export const env = envSchema.parse(process.env);
