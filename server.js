const { ApolloServer, AuthenticationError } = require("apollo-server");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const User = require("./models/User");
const Post = require("./models/Post");
const resolvers = require("./resolvers");
const jwt = require("jsonwebtoken");

dotenv.config({ path: "variables.env" });

const filePath = path.join(__dirname, "typeDefs.gql");
const typeDefs = fs.readFileSync(filePath, "utf-8");

// Verify JWT Token from client
const getUser = async (token) => {
  if (token) {
    try {
      const user = await jwt.verify(token, process.env.SECRET);
      return user;
    } catch (error) {
      throw new AuthenticationError("Not authenticated!");
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers["authorization"];
    const currentUser = await getUser(token);

    return { User, Post, currentUser };
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
