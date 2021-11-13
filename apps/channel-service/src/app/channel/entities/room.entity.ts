import { Directive, Field, ObjectType } from "@nestjs/graphql";
import { Channel } from "./channel.entity";

@ObjectType()
@Directive("@extends")
@Directive('@key(fields:"id")')
export class Room {
  @Field(() => String)
  @Directive("@external")
  id: string;

  @Field(() => [Channel], { nullable: true })
  channels: Channel[];
}
