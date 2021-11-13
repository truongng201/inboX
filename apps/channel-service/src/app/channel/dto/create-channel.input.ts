import { InputType, Int, Field } from "@nestjs/graphql";
import { ChannelType } from "../entities/channel.entity";

@InputType()
export class CreateChannelInput {
  @Field(() => String)
  channel_name: string;

  @Field(() => String)
  channel_type: ChannelType;

  @Field(() => Boolean)
  private: boolean;

  @Field(() => String)
  room_id: string;
}
