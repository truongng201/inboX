import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import { Transport } from "@nestjs/microservices";
import { join } from "path";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      package: "channel",
      protoPath: join(__dirname, "../channel-service/assets/app.proto"),
      url: "localhost:50052",
    },
  });
  await app.startAllMicroservices();
  await app.listen(8002, () => {
    console.log("Channel service ready at http://localhost:8002/graphql");
  });
}
bootstrap();
