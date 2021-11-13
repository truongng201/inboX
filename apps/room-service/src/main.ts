import { NestFactory } from "@nestjs/core";
import { Transport } from "@nestjs/microservices";
import { join } from "path";
import { AppModule } from "./app/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      package: "room",
      protoPath: join(__dirname, "../room-service/assets/app.proto"),
      url: "localhost:50051",
    },
  });
  await app.startAllMicroservices();
  await app.listen(8001, () => {
    console.log("Room service ready at http://localhost:8001/graphql");
  });
}
bootstrap();
