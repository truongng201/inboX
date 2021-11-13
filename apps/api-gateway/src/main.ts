import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(8000, () => {
    console.log("Gateway ready at http://localhost:8000/graphql");
  });
}
bootstrap();
