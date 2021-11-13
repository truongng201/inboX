import { Injectable } from "@nestjs/common";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import {
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  Repository,
  UpdateResult,
} from "typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  public async create(createUserInput: CreateUserInput): Promise<User> {
    const user: User = await this.findByEmail(createUserInput.email);

    if (user) throw new Error("User already exist");

    const newUser = new User();
    newUser.email = createUserInput.email;
    newUser.name = createUserInput.name;

    try {
      await this.userRepository.save(newUser);
      return newUser;
    } catch (err) {
      throw new Error("Cannot create new user");
    }
  }

  public async findAll(options?: FindManyOptions): Promise<User[]> {
    return await this.userRepository.find(options);
  }

  public async findByEmail(
    email: string,
    options?: FindOneOptions
  ): Promise<User> {
    return await this.userRepository.findOne({ email: email }, options);
  }

  public async findById(id: string, options?: FindOneOptions): Promise<User> {
    return await this.userRepository.findOne(id, options);
  }

  public async update(
    email: string,
    updateUserInput: UpdateUserInput
  ): Promise<UpdateResult> {
    return await this.userRepository.update(
      { email: email },
      { ...updateUserInput }
    );
  }

  public async delete(email: string): Promise<DeleteResult> {
    return await this.userRepository.delete({ email: email });
  }
}
