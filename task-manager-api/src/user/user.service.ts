import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async getAllUsers() {       
        const users = await this.prisma.user.findMany();
        if (!users) {
            throw new NotFoundException('Users not found');
        }
        return users;
    }

    async getUserById(id: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                id,
            },
        });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }
    async getUserByEmail(email: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }
}