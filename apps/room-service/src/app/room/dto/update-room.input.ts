import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class UpdateRoomInput {
  @Field(() => String, { nullable: true })
  room_name?: string;
}
