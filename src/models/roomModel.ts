export interface Room {
    id?: number;
    bedType: 'solteiro' | 'casal' | 'queen' | 'king';
    numberOfBeds: number;
    status: 'disponível' | 'ocupado' | 'em manutenção';
    description: string;
    price: number;
}

export default class RoomModel {
    private rooms: Room[] = [];

    public createRoom(room: Room): Room {
        room.id = this.rooms.length + 1; // Simple ID assignment
        this.rooms.push(room);
        return room;
    }

    public getRoomById(id: number): Room | undefined {
        return this.rooms.find(room => room.id === id);
    }

    public updateRoom(id: number, updatedRoom: Partial<Room>): Room | undefined {
        const roomIndex = this.rooms.findIndex(room => room.id === id);
        if (roomIndex !== -1) {
            this.rooms[roomIndex] = { ...this.rooms[roomIndex], ...updatedRoom };
            return this.rooms[roomIndex];
        }
        return undefined;
    }

    public deleteRoom(id: number): boolean {
        const roomIndex = this.rooms.findIndex(room => room.id === id);
        if (roomIndex !== -1) {
            this.rooms.splice(roomIndex, 1);
            return true;
        }
        return false;
    }

    public getAllRooms(): Room[] {
        return this.rooms;
    }
}