import { SERVER_HOST } from "@api";
import { Client, cacheExchange, fetchExchange } from "urql";

const client = new Client({
  url: `${SERVER_HOST}/graphql`,
  exchanges: [cacheExchange, fetchExchange],
  fetchOptions: () => {
    return {
      headers: {
        authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    };
  },
});

export default client;
