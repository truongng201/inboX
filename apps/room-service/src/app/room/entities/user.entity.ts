import { Directive, Field, ObjectType } from "@nestjs/graphql";
import { Room } from "./room.entity";

@ObjectType()
@Directive("@extends")
@Directive('@key(fields:"id")')
export class User {
  @Field(() => String)
  @Directive("@external")
  id: string;

  @Field(() => [Room])
  rooms: Room[];
}
