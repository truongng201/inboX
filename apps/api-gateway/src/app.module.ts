import { Module } from "@nestjs/common";
import { GraphQLGatewayModule } from "@nestjs/graphql";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import AppSource from "./gatway-source";

@Module({
  imports: [
    GraphQLGatewayModule.forRoot({
      server: {
        cors: true,
        plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
      },
      gateway: {
        serviceList: [
          { name: "rooms", url: "http://localhost:8001/graphql" },
          { name: "channels", url: "http://localhost:8002/graphql" },
          { name: "users", url: "http://localhost:8003/graphql" },
        ],
        serviceHealthCheck: true,
        buildService: ({ name, url }) => {
          return new AppSource({ url });
        },
      },
    }),
  ],
})
export class AppModule {}
