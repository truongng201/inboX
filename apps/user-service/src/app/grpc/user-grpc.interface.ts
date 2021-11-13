export interface findUser {
  id: string;
}

export interface findUserRes {
  found: boolean;
}

export interface createUser {
  name: string;
  email: string;
}

export interface createUserRes {
  success: boolean;
}
