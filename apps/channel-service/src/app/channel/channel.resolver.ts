import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from "@nestjs/graphql";
import { ChannelService } from "./channel.service";
import { Channel } from "./entities/channel.entity";
import { CreateChannelInput } from "./dto/create-channel.input";
import { UpdateChannelInput } from "./dto/update-channel.input";
import { GraphQLError } from "graphql";
import { findRoomRes, RoomService } from "../grpc/room-grpc.interface";
import { Inject, OnModuleInit } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";

@Resolver(() => Channel)
export class ChannelResolver implements OnModuleInit {
  private roomService: RoomService;
  constructor(
    private readonly channelService: ChannelService,
    @Inject("ROOM_PACKAGE") private roomClient: ClientGrpc
  ) {}

  onModuleInit() {
    this.roomService = this.roomClient.getService<RoomService>("RoomService");
  }

  @Mutation(() => Channel, { name: "create_channel" })
  async createChannel(
    @Args("data") data: CreateChannelInput
  ): Promise<Channel> {
    const roomResponse: findRoomRes = await this.roomService
      .findById({ id: data.room_id })
      .toPromise();

    if (!roomResponse.found) throw new Error("Room id not found");
    return await this.channelService.create(data);
  }

  @Query(() => [Channel], { name: "channels" })
  async findAll(
    @Args("limit", { nullable: true }) take: number = 10,
    @Args("offset", { nullable: true }) skip: number = 0
  ): Promise<Channel[]> {
    return this.channelService.findAll({
      take,
      skip,
    });
  }

  @Query(() => Channel, { name: "channel" })
  async findOne(
    @Args("channel_id", { type: () => String }) channel_id: string
  ): Promise<Channel> {
    return await this.channelService.findById(channel_id);
  }

  @Mutation(() => Boolean, { name: "update_channel" })
  async updateChannel(
    @Args("channel_id") channel_id: string,
    @Args("data") data: UpdateChannelInput
  ): Promise<Boolean> {
    try {
      await this.channelService.update(channel_id, data);
      return true;
    } catch (err) {
      throw new GraphQLError(err.message);
    }
  }

  @Mutation(() => Boolean, { name: "delete_channel" })
  async deleteChannel(
    @Args("channel_id", { type: () => String }) channel_id: string
  ): Promise<Boolean> {
    try {
      await this.channelService.delete(channel_id);
      return true;
    } catch (err) {
      throw new GraphQLError(err.message);
    }
  }

  @ResolveField()
  async room(@Parent() channel: Channel) {
    return { __typename: "Room", id: channel.room_id };
  }
}
