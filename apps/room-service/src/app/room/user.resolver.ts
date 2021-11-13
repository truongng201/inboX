import { ResolveField, Resolver, Parent } from "@nestjs/graphql";
import { Room } from "./entities/room.entity";
import { User } from "./entities/user.entity";
import { RoomService } from "./room.service";

@Resolver(() => User)
export class UserResolver {
  constructor(private roomService: RoomService) {}

  @ResolveField(() => [Room])
  async rooms(@Parent() user: User): Promise<Room[]> {
    return this.roomService.forUser(user.id);
  }
}
