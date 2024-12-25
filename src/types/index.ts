export interface User {
    id: string;
    username: string;
    password: string;
    role: 'admin' | 'employee';
}

export interface Room {
    id: string;
    bedType: 'single' | 'double' | 'queen' | 'king';
    numberOfBeds: number;
    status: 'available' | 'occupied' | 'maintenance';
    description: string;
    pricePerNight: number;
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