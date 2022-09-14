import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import ip from "ip";

import { typeDefs, resolvers } from "./root";
import logger from "../helpers/logger";

const context = { context: "SERVER" };

async function startApolloServer(app: any) {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.listen(app.get("port"), () =>
    logger
      .child(context)
      .info(
        `Server running on ${app.get("env")} | http://${ip.address()}:${app.get(
          "port"
        )}/graphql`
      )
  );
}

export { startApolloServer };
