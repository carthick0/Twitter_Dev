import express, { Request, Response } from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { connectDB } from "./db/connect";
import { typeDefs } from "./schema/schema";
import { resolvers } from "./resolvers/resolver";
import { PORT } from "./config/server-config";
import passport from "passport";
import { passportAuth } from "./config/jwt-middleware";

interface MyContext {
  user: any | null;
}

const app = express();
app.use(express.json());
passportAuth(passport);
app.use(passport.initialize());

const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
});

const startServer = async () => {
  
  await connectDB();
  await server.start();

  app.use(
    "/graphql",
    express.json(),
    expressMiddleware<MyContext>(server, {
      context: async ({ req }: { req: Request }): Promise<MyContext> => {
        return new Promise((resolve) => {
          passport.authenticate(
            "jwt",
            { session: false },
            (err:any, user:any) => {
              resolve({ user: user || null });
            }
          )(req, {} as Response, () => {});
        });
      },
    })
  );

  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  });
};

startServer();
