import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  getUsers(@GetUser() user: User) {
    return user;
  }

  @Patch()
  editUsers(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
    console.log('asdasdasda', this.userService.editUser(userId, dto));
    return this.userService.editUser(userId, dto);
  }
}
