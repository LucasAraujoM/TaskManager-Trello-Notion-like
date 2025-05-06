import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}
    @Get()
    getAllUsers() {
        return this.userService.getAllUsers();
    }
    @Get(':email')
    getUserByEmail(@Param('email') email: string) {
        return this.userService.getUserByEmail(email);
    }
}
