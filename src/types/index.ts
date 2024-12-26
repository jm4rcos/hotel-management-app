export interface User {
    id: string;
    username: string;
    password: string;
    role: 'admin' | 'employee';
}

export type BedType = 'SINGLE' | 'DOUBLE' | 'QUEEN' | 'KING';

export interface Room {
  id: string;
  number: string;
  bedType: BedType;
  numberOfBeds: number;
  status: 'FREE' | 'OCCUPIED' | 'MAINTENANCE';
  description: string;
  price: number;
  roomHistories?: RoomHistory[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateRoomData {
  number?: string;
  bedType?: BedType;
  numberOfBeds?: number;
  status?: 'FREE' | 'OCCUPIED' | 'MAINTENANCE';
  description?: string;
  price?: number;
}

export interface RoomHistory {
    id: string;
    room: Room;
    roomId: string;
    guest: Guest;
    guestId: string;
    user: User;
    userId: string;
    checkIn: Date;
    checkOut: Date;
    totalPaid: number;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface Guest {
    id: string;
    name: string;
    email?: string;
    age?: number;
    phoneNumber?: string;
    roomHistories?: RoomHistory[];
    createdAt: Date;
    updatedAt: Date;
  }

export interface CheckIn {
    roomid: string;
    userid: string;
    checkInDate: Date;
    checkOutDate: Date;
}

export interface CheckOut {
    roomid: string;
    userid: string;
    checkOutDate: Date;
}

export interface CheckInData {
    roomId: string;
    guestId: string;
    userId: string;
    checkOutDate?: Date;
    totalPaid: number;
    notes?: string;
  }
  
 export interface UpdateRoomData {
    number?: string;
    bedType?: "SINGLE" | "DOUBLE" | "QUEEN" | "KING";
    numberOfBeds?: number;
    status?: "FREE" | "OCCUPIED" | "MAINTENANCE";
    description?: string;
    price?: number;
  }