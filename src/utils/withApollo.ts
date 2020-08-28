import { createWithApollo } from "./createWithApollo";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { NextPageContext } from "next";
import { API_URL } from "../constants";
import { PaginatedLinkers } from "../generated/graphql";

const createClient = (ctx: NextPageContext) =>
  new ApolloClient({
    uri: API_URL,
    credentials: "include",
    headers: {
      cookie:
        (typeof window === "undefined"
          ? ctx?.req?.headers.cookie
          : undefined) || "",
    },
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            linkers: {
              keyArgs: [],
              merge(
                existing: PaginatedLinkers | undefined,
                incoming: PaginatedLinkers
              ): PaginatedLinkers {
                return {
                  ...incoming,
                  linkers: [...(existing?.linkers || []), ...incoming.linkers],
                };
              },
            },
          },
        },
      },
    }),
  });

export const withApollo = createWithApollo(createClient);
