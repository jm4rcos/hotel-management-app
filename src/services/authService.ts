import { PrismaClient } from '@prisma/client';
import { hash, compare } from 'bcrypt';
import { User } from '../types';

const prisma = new PrismaClient();

export default class AuthService {
    async register(user: User): Promise<User> {
        const hashedPassword = await hash(user.password, 10);
        user.password = hashedPassword;

        const { id, ...userData } = user;
        const createdUser = await prisma.user.create({
            data: {
                ...userData,
                role: user.role.toUpperCase(), // Converte 'admin' para 'ADMIN'
            },
        });

        return {
            ...createdUser,
            role: createdUser.role.toLowerCase() as User['role'], // Converte 'ADMIN' para 'admin'
        };
    }

    async login(username: string, password: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: { username },
        });
        if (user && (await compare(password, user.password))) {
            return {
                ...user,
                role: user.role.toLowerCase() as User['role'], // Converte 'ADMIN' para 'admin'
            };
        }
        return null;
    }

    async recoverPassword(username: string, newPassword: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: { username },
        });
        if (user) {
            const hashedPassword = await hash(newPassword, 10);
            const updatedUser = await prisma.user.update({
                where: { username },
                data: { password: hashedPassword },
            });
            return {
                ...updatedUser,
                role: updatedUser.role.toLowerCase() as User['role'], // Converte 'ADMIN' para 'admin'
            };
        }
        return null;
    }
}
