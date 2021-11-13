import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLFederationModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoomModule } from "./room/room.module";
import { ApolloServerPluginInlineTraceDisabled } from "apollo-server-core";
import { join } from "path";
import { User } from "./room/entities/user.entity";
import { AppController } from "./app.controller";

@Module({
  imports: [
    RoomModule,
    TypeOrmModule.forRoot({
      // entities: ["dist/**/*.entity{.ts,.js}"],
      autoLoadEntities: true,
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "nemo",
      password: "chatauthpassword",
      database: "roomsdb",
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
        "apps/room-service/src/graphql-schema.gql"
      ),
      buildSchemaOptions: { orphanedTypes: [User] },
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
