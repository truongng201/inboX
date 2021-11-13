import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { InjectRepository } from "@nestjs/typeorm";
import {
  ChannelService,
  ChannelType,
  createChannelRes,
} from "../grpc/channel-grpc.interface";
import { findUserRes, UserService } from "../grpc/user-grpc.inteface";
import {
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  Repository,
  UpdateResult,
} from "typeorm";
import { CreateRoomInput } from "./dto/create-room.input";
import { UpdateRoomInput } from "./dto/update-room.input";
import { Room } from "./entities/room.entity";
import { customAlphabet } from "nanoid";

@Injectable()
export class RoomService implements OnModuleInit {
  private userService: UserService;
  private channelService: ChannelService;

  constructor(
    @InjectRepository(Room) private roomRepository: Repository<Room>,
    @Inject("USER_PACKAGE") private userClient: ClientGrpc,
    @Inject("CHANNEL_PACKAGE") private channelClient: ClientGrpc
  ) {}

  onModuleInit() {
    this.userService = this.userClient.getService<UserService>("UserService");
    this.channelService =
      this.channelClient.getService<ChannelService>("ChannelService");
  }

  async create(createRoomInput: CreateRoomInput): Promise<Room> {
    const userResponse: findUserRes = await this.userService
      .findById({
        id: createRoomInput.room_owner_id,
      })
      .toPromise();

    if (!userResponse.found) throw new Error("Room owner not found");

    const uniqueId = customAlphabet("1234567890", 20);

    const newRoom = new Room();
    newRoom.room_name = createRoomInput.room_name;
    newRoom.room_owner_id = createRoomInput.room_owner_id;
    newRoom.id = uniqueId();

    const channelTextRes: createChannelRes = await this.channelService
      .createChannel({
        channelName: "main",
        channelType: ChannelType.TEXT,
        private: false,
        roomId: newRoom.id,
      })
      .toPromise();

    const channelVoiceRes: createChannelRes = await this.channelService
      .createChannel({
        channelName: "voice",
        channelType: ChannelType.VOICE,
        private: false,
        roomId: newRoom.id,
      })
      .toPromise();

    if (!channelTextRes.success || !channelVoiceRes.success)
      throw new Error("Cannot create new channel");

    try {
      await this.roomRepository.save(newRoom);
      return newRoom;
    } catch (err) {
      throw new Error(err);
    }
  }

  async findAll(options?: FindManyOptions): Promise<Room[]> {
    return await this.roomRepository.find(options);
  }

  async findById(id: string, option?: FindOneOptions): Promise<Room> {
    return await this.roomRepository.findOne(id, option);
  }

  async update(
    id: string,
    updateRoomInput: UpdateRoomInput
  ): Promise<UpdateResult> {
    return await this.roomRepository.update(id, { ...updateRoomInput });
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.roomRepository.delete(id);
  }

  async forUser(id: string) {
    return await this.roomRepository.find({ where: { room_owner_id: id } });
  }
}
