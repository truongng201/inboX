import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { GraphQLFederationModule } from "@nestjs/graphql";
import { UserModule } from "./user/user.module";
import { ApolloServerPluginInlineTraceDisabled } from "apollo-server-core";
import { join } from "path";
import { AppController } from "./app.controller";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      autoLoadEntities: true,
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "nemo",
      password: "chatauthpassword",
      database: "usersdb",
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
        "apps/user-service/src/graphql-schema.gql"
      ),
    }),
    UserModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
