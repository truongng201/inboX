import { Module } from "@nestjs/common";
import { ChannelService } from "./channel.service";
import { ChannelResolver } from "./channel.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Channel } from "./entities/channel.entity";
import { RoomResolver } from "./room.resolver";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { join } from "path";

@Module({
  imports: [
    TypeOrmModule.forFeature([Channel]),
    ClientsModule.register([
      {
        name: "ROOM_PACKAGE",
        transport: Transport.GRPC,
        options: {
          package: "room",
          protoPath: join(__dirname, "../channel-service/assets/room.proto"),
          url: "localhost:50051",
        },
      },
    ]),
  ],
  providers: [ChannelResolver, ChannelService, RoomResolver],
  exports: [ChannelService],
})
export class ChannelModule {}
