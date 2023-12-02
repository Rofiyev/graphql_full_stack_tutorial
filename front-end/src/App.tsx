import { ApolloProvider } from "@apollo/client";
import { Form, Table } from "./components";
import { client } from "./graphql/client";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Form />
      <Table />
    </ApolloProvider>
  );
}
