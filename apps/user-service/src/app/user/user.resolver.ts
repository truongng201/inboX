import { GraphQLError } from "graphql";
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveReference,
} from "@nestjs/graphql";
import { UserService } from "./user.service";
import { User } from "./entities/user.entity";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User, { name: "create_user" })
  async createUser(
    @Args("user_data") user_data: CreateUserInput
  ): Promise<User> {
    return await this.userService.create(user_data);
  }

  @Query(() => [User], { name: "users" })
  async findAll(
    @Args("limit", { nullable: true }) take: number = 10,
    @Args("offset", { nullable: true }) skip: number = 0
  ): Promise<User[]> {
    return await this.userService.findAll({ take, skip });
  }

  @Query(() => User, { name: "user_by_email" })
  async findByEmail(
    @Args("email", { type: () => String }) email: string
  ): Promise<User> {
    return await this.userService.findByEmail(email);
  }

  @Query(() => User, { name: "user_by_id" })
  async findById(
    @Args("id", { type: () => String }) id: string
  ): Promise<User> {
    return await this.userService.findById(id);
  }

  @Mutation(() => Boolean, { name: "update_user" })
  async updateUser(
    @Args("update_user_data") update_user_data: UpdateUserInput,
    @Args("email", { type: () => String }) email: string
  ): Promise<boolean> {
    try {
      await this.userService.update(email, update_user_data);
      return true;
    } catch (err) {
      return false;
    }
  }

  @Mutation(() => Boolean, { name: "delete_user" })
  async removeUser(
    @Args("email", { type: () => String }) email: string
  ): Promise<boolean> {
    try {
      await this.userService.delete(email);
      return true;
    } catch (err) {
      return false;
    }
  }

  @ResolveReference()
  async resolveReference(ref: {
    __typename: string;
    id: string;
  }): Promise<User> {
    try {
      return await this.userService.findById(ref.id);
    } catch (err) {
      throw new GraphQLError(err.message);
    }
  }
}
