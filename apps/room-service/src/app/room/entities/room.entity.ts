import { ObjectType, Field, Directive } from "@nestjs/graphql";
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user.entity";

@ObjectType()
@Directive('@key(fields:"id")')
@Entity()
export class Room {
  @PrimaryColumn({ unique: true })
  @Field(() => String)
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  @Field(() => String)
  room_name: string;

  @Field(() => User)
  room_owner: User;

  @Column()
  @Field()
  room_owner_id: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  room_avt_url?: string;

  @Column("text", { array: true, default: [] })
  @Field(() => String, { nullable: true, defaultValue: [] })
  members_id: string[];

  @BeforeInsert()
  createRandomAvatar() {
    const rand_room_avt_url = `https://avatars.dicebear.com/api/gridy/${this.room_name}.svg`;
    this.room_avt_url = rand_room_avt_url;
  }
}
