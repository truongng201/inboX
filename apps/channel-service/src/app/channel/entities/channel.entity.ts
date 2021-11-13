import { customAlphabet } from "nanoid";
import { ObjectType, Field, Directive } from "@nestjs/graphql";
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { Room } from "./room.entity";

@Entity()
@Directive('@key(fields:"id")')
@ObjectType()
export class Channel {
  @PrimaryColumn({ unique: true })
  @Field(() => String)
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  @Field(() => String)
  channel_name: string;

  @Column("text")
  @Field(() => String)
  room_id: string;

  @Field(() => Room)
  room: Room;

  @Column("text", { array: true, default: [] })
  @Field(() => String, { nullable: true, defaultValue: [] })
  members_list: string[];

  @Column("boolean", { default: false })
  @Field(() => Boolean, { defaultValue: false })
  private: boolean;

  @Column("text")
  @Field(() => String)
  channel_type: ChannelType;

  @Column("text", { nullable: true })
  @Field(() => String, { nullable: true })
  channel_des?: string;

  @BeforeInsert()
  createChannelId() {
    const nanoid = customAlphabet("1234567890", 20);
    this.id = nanoid();
  }
}

export enum ChannelType {
  TEXT = "Text",
  VOICE = "Voice",
}
