import { NestFactory } from "@nestjs/core";
import { join } from "path";
import { Transport } from "@nestjs/microservices";
import { AppModule } from "./app/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      package: "user",
      protoPath: join(__dirname, "../user-service/assets/app.proto"),
      url: "localhost:50053",
    },
  });
  app.startAllMicroservices();
  await app.listen(8003, () => {
    console.log("User service ready at http://localhost:8003/graphql");
  });
}
bootstrap();
