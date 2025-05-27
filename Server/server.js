import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sequelize from "./db.js";
import resolvers from "./GraphQl/Resolvers/resolver.js";

// Load external schema.graphql
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const typeDefs = readFileSync(
  path.join(__dirname, "GraphQL", "Schema", "schema.graphql"),
  { encoding: "utf-8" }
);

// Sync database first
await sequelize
  .authenticate()
  .then(() => console.log("✅ Database connected successfully"))
  .catch((err) => console.error("❌ Database connection error:", err));

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start Apollo Server
const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });

console.log(`🚀 Server ready at ${url}`);
