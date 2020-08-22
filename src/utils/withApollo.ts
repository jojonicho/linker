import { createWithApollo } from "./createWithApollo";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { NextPageContext } from "next";
import { API_URL } from "../constants";

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
    cache: new InMemoryCache({}),
  });

export const withApollo = createWithApollo(createClient);
