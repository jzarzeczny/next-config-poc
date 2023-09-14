import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

interface Test {
  test: string;
}

const pingSchema: z.ZodType<Test> = z.object({ test: z.string() });

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getTest: publicProcedure.query(async () => {
    const res = await fetch("http://localhost:8080/ping");
    const json = (await res.json()) as unknown;
    const parsedJson = pingSchema.safeParse(json);
    if (!parsedJson.success) {
      throw Error("Something went wrong");
    }
    return parsedJson.data;
  }),
});
