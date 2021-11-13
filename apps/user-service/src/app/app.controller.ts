import {
  createUser,
  createUserRes,
  findUser,
  findUserRes,
} from "./grpc/user-grpc.interface";
import { Controller } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { User } from "./user/entities/user.entity";
import { UserService } from "./user/user.service";

@Controller()
export class AppController {
  constructor(private userSerice: UserService) {}

  @GrpcMethod("UserService", "findById")
  async findById(data: findUser): Promise<findUserRes> {
    const user: User = await this.userSerice.findById(data.id);
    if (!user) return { found: false };

    return { found: true };
  }

  @GrpcMethod("UserService", "createUser")
  async createUser(data: createUser): Promise<createUserRes> {
    try {
      await this.userSerice.create(data);
      return { success: true };
    } catch (err) {
      return { success: false };
    }
  }
}
