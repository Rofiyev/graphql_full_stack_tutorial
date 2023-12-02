import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { NormalizedCacheObject } from "apollo-cache-inmemory";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message }: { message: string }) => {
      alert(`Graphql error ${message}`);
    });
  }
  if (networkError) console.log(`[Network error]: ${networkError}`);
});
const link = from([
  errorLink,
  new HttpLink({ uri: "http://localhost:8080/graphql" }),
]);

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});
