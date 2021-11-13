import { ChannelType } from "./../channel/entities/channel.entity";
export interface createChannel {
  channelName: string;
  channelType: ChannelType;
  private: boolean;
  roomId: string;
}

export interface createChannelRes {
  success: boolean;
}
