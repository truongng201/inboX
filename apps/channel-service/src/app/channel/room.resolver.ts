import { ResolveField, Resolver, Parent } from "@nestjs/graphql";
import { ChannelService } from "./channel.service";
import { Channel } from "./entities/channel.entity";
import { Room } from "./entities/room.entity";

@Resolver(() => Room)
export class RoomResolver {
  constructor(private channelService: ChannelService) {}

  @ResolveField(() => [Channel])
  async channels(@Parent() room: Room) {
    return await this.channelService.forRoom(room.id);
  }
}
