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

@Entity()
@Directive('@key(fields: "id")')
@ObjectType()
export class User {
  @PrimaryColumn()
  @Field(() => String)
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  @Field(() => String)
  name: string;

  @Column({ unique: true })
  @Field(() => String)
  email: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  avatar_url?: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  phone_number?: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  about_me?: string;

  @BeforeInsert()
  createUserId() {
    const nanoid = customAlphabet("1234567890", 20);
    this.id = nanoid();
  }

  @BeforeInsert()
  createRandomAvatar() {
    const rand_avatar_url = `https://avatars.dicebear.com/api/gridy/${this.name}.svg`;
    this.avatar_url = rand_avatar_url;
  }
}
