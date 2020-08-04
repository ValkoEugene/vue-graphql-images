const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const User = require("./models/User");
const Post = require("./models/Post");
const resolvers = require("./resolvers");

dotenv.config({ path: "variables.env" });

const filePath = path.join(__dirname, "typeDefs.gql");
const typeDefs = fs.readFileSync(filePath, "utf-8");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    User,
    Post,
  },
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("db connected"))
  .then(() => server.listen())
  .then(({ url }) => {
    console.log(`Server ready at ${url}`);
  })
  .catch((err) => console.error(err));
