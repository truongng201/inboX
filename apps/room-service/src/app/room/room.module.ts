import { Module } from "@nestjs/common";
import { RoomService } from "./room.service";
import { RoomResolver } from "./room.resolver";
import { Room } from "./entities/room.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserResolver } from "./user.resolver";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { join } from "path";

@Module({
  imports: [
    TypeOrmModule.forFeature([Room]),
    ClientsModule.register([
      {
        name: "USER_PACKAGE",
        transport: Transport.GRPC,
        options: {
          package: "user",
          protoPath: join(__dirname, "../room-service/assets/user.proto"),
          url: "localhost:50053",
        },
      },
    ]),
    ClientsModule.register([
      {
        name: "CHANNEL_PACKAGE",
        transport: Transport.GRPC,
        options: {
          package: "channel",
          protoPath: join(__dirname, "../room-service/assets/channel.proto"),
          url: "localhost:50052",
        },
      },
    ]),
  ],
  providers: [RoomResolver, RoomService, UserResolver],
  exports: [RoomService],
})
export class RoomModule {}
