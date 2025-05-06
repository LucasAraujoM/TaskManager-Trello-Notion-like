import { Controller, Get, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
@Controller('auth')
export class AuthController {
    constructor(private AuthService: AuthService) {}

    @Post('/login')
    @UsePipes(new ValidationPipe())
    login(@Body() body: LoginDto) {
        return this.AuthService.login(body);
    }

    @Post('/register')
    @UsePipes(new ValidationPipe())
    register(@Body() body: RegisterDto) {
        return this.AuthService.register(body);
    }
    @Get('/users')
    getAllUsers() {
        return this.AuthService.getAllUsers();
    }
}
