import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) {}
    
   async login(body: LoginDto) {
    const user = await this.prisma.user.findUnique({
        where: {
            email: body.email,
        },
    });
    if (!user) {
        throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(body.password, user.password);
    if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user.id, email: user.email };
    const access_token = await this.jwtService.signAsync(payload);
    
    // Update user with new token
    await this.prisma.user.update({
        where: { id: user.id },
        data: { access_token }
    });

    return { ...user, access_token };
   }

   async register(body: RegisterDto) {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    try {
        const payload = { email: body.email };
        const access_token = await this.jwtService.signAsync(payload);

        const user = await this.prisma.user.create({
            data: {
                email: body.email,
                password: hashedPassword,
                name: body.name,
                access_token,
            },
        });

        return { ...user, access_token };
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                throw new UnauthorizedException('Email already exists');
            }
        }
        throw error;
    }
   }

   async getAllUsers() {
    const users = await this.prisma.user.findMany();
    return users;
   }
}
