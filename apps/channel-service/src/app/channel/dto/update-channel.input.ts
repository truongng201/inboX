import { CreateChannelInput } from "./create-channel.input";
import { InputType, Field, Int, PartialType } from "@nestjs/graphql";
import { ChannelType } from "../entities/channel.entity";

@InputType()
export class UpdateChannelInput {
  @Field(() => String, { nullable: true })
  channel_name?: string;

  @Field(() => String, { nullable: true })
  channel_type?: ChannelType;

  @Field(() => Boolean, { nullable: true })
  private?: boolean;
}
