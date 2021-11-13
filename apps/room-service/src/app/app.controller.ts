import { Controller } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { findRoom, findRoomRes } from "./grpc/room-grpc.interface";
import { Room } from "./room/entities/room.entity";
import { RoomService } from "./room/room.service";

@Controller()
export class AppController {
  constructor(private roomService: RoomService) {}

  @GrpcMethod("RoomService", "findById")
  async findById(data: findRoom): Promise<findRoomRes> {
    const room: Room = await this.roomService.findById(data.id);
    if (!room) return { found: false };

    return { found: true };
  }
}
