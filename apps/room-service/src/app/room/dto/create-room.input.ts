import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CreateRoomInput {
  @Field(() => String)
  room_owner_id: string;

  @Field(() => String)
  room_name: string;
}
