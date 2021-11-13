export interface RoomService {
  findById(req: findRoom): any;
}

export interface findRoom {
  id: string;
}

export interface findRoomRes {
  found: boolean;
}
