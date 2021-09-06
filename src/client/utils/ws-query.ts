import { createClient } from "graphql-ws";

export const wsQuery = async (query: string, next: any) => {
  if (typeof window !== "undefined") {
    const client = createClient({
      url: "ws://localhost:4001/graphql",
    });
    await new Promise((resolve, reject) => {
      let result: any;
      client.subscribe(
        {
          query,
        },
        {
          next,
          error: reject,
          complete: () => resolve(result),
        },
      );
    });
  }
};
