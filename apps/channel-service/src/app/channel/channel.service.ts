import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  Repository,
  UpdateResult,
} from "typeorm";
import { CreateChannelInput } from "./dto/create-channel.input";
import { UpdateChannelInput } from "./dto/update-channel.input";
import { Channel } from "./entities/channel.entity";

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(Channel) private channelRepository: Repository<Channel>,
  ) {}

  async create(createChannelInput: CreateChannelInput): Promise<Channel> {
    const newChannel = new Channel();
    newChannel.channel_name = createChannelInput.channel_name;
    newChannel.channel_type = createChannelInput.channel_type;
    newChannel.private = createChannelInput.private;
    newChannel.room_id = createChannelInput.room_id;

    try {
      await this.channelRepository.save(newChannel);
      return newChannel;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async findAll(options?: FindManyOptions): Promise<Channel[]> {
    try {
      return await this.channelRepository.find(options);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async findById(id: string, options?: FindOneOptions): Promise<Channel> {
    try {
      return await this.channelRepository.findOne(id, options);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async update(
    id: string,
    updateChannelInput: UpdateChannelInput,
  ): Promise<UpdateResult> {
    try {
      return await this.channelRepository.update(id, { ...updateChannelInput });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async delete(id: string): Promise<DeleteResult> {
    try {
      return await this.channelRepository.delete(id);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async forRoom(id: string) {
    return await this.channelRepository.find({ where: { room_id: id } });
  }
}
