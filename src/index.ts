import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema/schema";
import { resolvers } from "./resolvers/resolver";
import { connectDB } from "./db/connect";
import { PORT } from "./config/server-config";
const server = new ApolloServer({
    typeDefs,
    resolvers
});

const startServer = async () => {
  await connectDB();
  const { url } = await startStandaloneServer(server, {
    listen: { port: PORT },
    
  });

  console.log(`🚀 Server ready at ${url}`);
  
};

startServer();
