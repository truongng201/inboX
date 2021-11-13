import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  ResolveReference,
} from "@nestjs/graphql";
import { RoomService } from "./room.service";
import { Room } from "./entities/room.entity";
import { CreateRoomInput } from "./dto/create-room.input";
import { UpdateRoomInput } from "./dto/update-room.input";
import { GraphQLError } from "graphql";

@Resolver(() => Room)
export class RoomResolver {
  constructor(private roomService: RoomService) {}

  @Mutation(() => Room, { name: "create_room" })
  async createRoom(@Args("data") data: CreateRoomInput): Promise<Room> {
    try {
      return await this.roomService.create(data);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  @Query(() => [Room], { name: "rooms" })
  async findAll(
    @Args("limit", { nullable: true }) take: number = 10,
    @Args("offset", { nullable: true }) skip: number = 0,
  ): Promise<Room[]> {
    return await this.roomService.findAll({ take, skip });
  }

  @Query(() => Room, { name: "room" })
  async findById(
    @Args("room_id", { type: () => String }) room_id: string,
  ): Promise<Room> {
    try {
      return await this.roomService.findById(room_id);
    } catch (err) {
      console.log(err.message);
      throw new GraphQLError(err.message);
    }
  }

  @Mutation(() => Boolean, { name: "update_room" })
  async updateRoom(
    @Args("room_id") room_id: string,
    @Args("data") data: UpdateRoomInput,
  ): Promise<Boolean> {
    try {
      await this.roomService.update(room_id, data);
      return true;
    } catch (err) {
      throw new GraphQLError(err.message);
    }
  }

  @Mutation(() => Boolean, { name: "delete_room" })
  async deleteRoom(
    @Args("room_id", { type: () => String }) room_id: string,
  ): Promise<Boolean> {
    try {
      await this.roomService.delete(room_id);
      return true;
    } catch (err) {
      throw new GraphQLError(err.message);
    }
  }

  @ResolveField()
  async room_owner(@Parent() room: Room) {
    return { __typename: "User", id: room.room_owner_id };
  }

  @ResolveReference()
  async resolveReference(ref: {
    __typename: string;
    id: string;
  }): Promise<Room> {
    try {
      return await this.roomService.findById(ref.id);
    } catch (err) {
      throw new GraphQLError(err.message);
    }
  }
}
