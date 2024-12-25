import { PrismaClient, RoomHistory, Room } from '@prisma/client';
import { CheckInData, UpdateRoomData } from '../types';

export default class RoomService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAllRooms(): Promise<Room[]> {
    return await this.prisma.room.findMany();
  }

  async getRoom(roomId: string): Promise<Room | null> {
    return await this.prisma.room.findUnique({
      where: { id: roomId },
      include: {
        roomHistories: {
          include: {
            guest: true,
            user: true
          },
          orderBy: {
            createdAt: 'desc'
          },
          take: 1
        }
      }
    });
  }

  async updateRoom(roomId: string, data: UpdateRoomData): Promise<Room> {
    const room = await this.prisma.room.findUnique({
      where: { id: roomId }
    });

    if (!room) {
      throw new Error('Room not found');
    }

    if (data.number) {
      const existingRoom = await this.prisma.room.findUnique({
        where: { number: data.number }
      });

      if (existingRoom && existingRoom.id !== roomId) {
        throw new Error('Room number already exists');
      }
    }

    return await this.prisma.room.update({
      where: { id: roomId },
      data
    });
  }

  async deleteRoom(roomId: string): Promise<Room> {
    return await this.prisma.room.delete({
      where: { id: roomId }
    });
  }

  async checkIn({ roomId, guestId, userId, checkOutDate, totalPaid, notes }: CheckInData): Promise<RoomHistory> {
    const room = await this.prisma.room.findUnique({
      where: { id: roomId }
    });

    if (!room) {
      throw new Error('Room not found');
    }

    if (room.status !== 'FREE') {
      throw new Error('Room is not available');
    }

    // Use transaction to ensure data consistency
    return await this.prisma.$transaction(async (tx) => {
      // Update room status
      await tx.room.update({
        where: { id: roomId },
        data: { status: 'OCCUPIED' }
      });

      // Create room history entry
      return await tx.roomHistory.create({
        data: {
          roomId,
          guestId,
          userId,
          checkIn: new Date(),
          checkOut: checkOutDate || new Date(Date.now() + 24 * 60 * 60 * 1000), // Default to next day
          totalPaid,
          notes
        },
        include: {
          guest: true,
          user: true,
          room: true
        }
      });
    });
  }

  async checkOut(roomId: string, userId: string, additionalPayment?: number): Promise<RoomHistory> {
    const room = await this.prisma.room.findUnique({
      where: { id: roomId }
    });

    if (!room) {
      throw new Error('Room not found');
    }

    if (room.status !== 'OCCUPIED') {
      throw new Error('Room is not occupied');
    }

    // Find active room history entry
    const activeHistory = await this.prisma.roomHistory.findFirst({
      where: {
        roomId,
        checkOut: {
          gt: new Date() // Check-out time is in the future (active reservation)
        }
      }
    });

    if (!activeHistory) {
      throw new Error('No active check-in found for this room');
    }

    // Use transaction to ensure data consistency
    return await this.prisma.$transaction(async (tx) => {
      // Update room status
      await tx.room.update({
        where: { id: roomId },
        data: { status: 'FREE' }
      });

      // Update room history
      return await tx.roomHistory.update({
        where: { id: activeHistory.id },
        data: {
          checkOut: new Date(),
          totalPaid: additionalPayment ? activeHistory.totalPaid + additionalPayment : activeHistory.totalPaid,
          userId // Track who processed the check-out
        },
        include: {
          guest: true,
          user: true,
          room: true
        }
      });
    });
  }

  async getRoomHistory(
    roomId: string,
    options?: {
      startDate?: Date;
      endDate?: Date;
      includeGuest?: boolean;
      includeUser?: boolean;
    }
  ): Promise<RoomHistory[]> {
    const { startDate, endDate, includeGuest = true, includeUser = true } = options || {};

    const room = await this.prisma.room.findUnique({
      where: { id: roomId }
    });

    if (!room) {
      throw new Error('Room not found');
    }

    return await this.prisma.roomHistory.findMany({
      where: {
        roomId,
        ...(startDate && {
          checkIn: {
            gte: startDate
          }
        }),
        ...(endDate && {
          checkOut: {
            lte: endDate
          }
        })
      },
      include: {
        guest: includeGuest,
        user: includeUser,
        room: true
      },
      orderBy: {
        checkIn: 'desc'
      }
    });
  }

  async getRoomAvailability(startDate: Date, endDate: Date): Promise<Room[]> {
    return await this.prisma.room.findMany({
      where: {
        status: 'FREE',
        // Ensure no overlapping reservations
        NOT: {
          roomHistories: {
            some: {
              OR: [
                {
                  checkIn: {
                    lte: endDate,
                    gte: startDate
                  }
                },
                {
                  checkOut: {
                    lte: endDate,
                    gte: startDate
                  }
                }
              ]
            }
          }
        }
      }
    });
  }
}