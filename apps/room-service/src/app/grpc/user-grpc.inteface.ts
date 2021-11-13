export interface UserService {
  findById(req: findUser): any;
}

export interface findUser {
  id: string;
}

export interface findUserRes {
  found: boolean;
}
