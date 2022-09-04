 import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';
import { UserAuth, UserDocument } from 'src/schemas/User.schema';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('me')
  getMe(@GetUser() user: UserDocument) {
    return user;
  }

  @Get('getUsers')
  getUsers() {
    return this.userService.getUsers();
  }

  @Get('getTasks')
  getTasks(@GetUser() user: UserDocument) {
    return this.userService.getTasks(user)
  }

  @Get('refresh')
  refresh(@GetUser() user: UserDocument) {
    return this.userService.refreshTokens(user)
  }

}
