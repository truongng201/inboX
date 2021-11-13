import { Controller } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { ChannelService } from "./channel/channel.service";
import { createChannel, createChannelRes } from "./grpc/channel-grpc.interface";

@Controller()
export class AppController {
  constructor(private channelService: ChannelService) {}

  @GrpcMethod("ChannelService", "createChannel")
  async createChannel(data: createChannel): Promise<createChannelRes> {
    try {
      await this.channelService.create({
        channel_name: data.channelName,
        channel_type: data.channelType,
        private: data.private,
        room_id: data.roomId,
      });
      return { success: true };
    } catch (err) {
      return { success: false };
    }
  }
}
