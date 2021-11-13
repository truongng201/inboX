export interface ChannelService {
  createChannel(data: any): any;
}

export interface createChannel {
  channelName: string;
  channelType: ChannelType;
  private: boolean;
  roomId: string;
}

export interface createChannelRes {
  success: boolean;
}

export enum ChannelType {
  TEXT = "Text",
  VOICE = "Voice",
}
