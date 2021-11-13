import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLFederationModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChannelModule } from "./channel/channel.module";
import { ApolloServerPluginInlineTraceDisabled } from "apollo-server-core";
import { join } from "path";
import { Room } from "./channel/entities/room.entity";
import { AppController } from "./app.controller";
@Module({
  imports: [
    ChannelModule,
    TypeOrmModule.forRoot({
      autoLoadEntities: true,
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "nemo",
      password: "chatauthpassword",
      database: "channelsdb",
      synchronize: true,
      logging: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLFederationModule.forRoot({
      playground: true,
      plugins: [ApolloServerPluginInlineTraceDisabled],
      autoSchemaFile: join(
        process.cwd(),
        "apps/channel-service/src/graphql-schema.gql"
      ),
      buildSchemaOptions: {
        orphanedTypes: [Room],
      },
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
