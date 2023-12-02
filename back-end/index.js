const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/index");

app.use(cors());
app.use(express.json());
app.use(
  "/graphql",
  graphqlHTTP((request) => {
    return {
      schema,
      graphiql: true,
    };
  })
);

app.get("/", (req, res) => {
  res.send({ message: "Hello GraphQL" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
