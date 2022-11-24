import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('check-session')
  checkSession(@Req() request: Request) {
    return !!request.session.user;
  }

  @Post('login')
  async login(
    @Body() body: { username: string; password: string },
    @Req() request: Request,
  ) {
    if (request.session.user) {
      return { error: 'Ya hay una sesión iniciada' };
    }

    const user = await this.usersService.findByUsername(body.username);
    if (!user) {
      return { error: 'El usuario no existe' };
    }
    if (user.password !== body.password) {
      return { error: 'Contraseña incorrecta' };
    }

    request.session.user = {
      id: user.id,
      username: user.username,
    };

    return user;
  }

  @Post('register')
  async register(@Body() body: CreateUserDto) {
    const user = await this.usersService.findByUsername(body.username);
    if (user) {
      return { error: 'El usuario ya existe' };
    }

    return await this.usersService.create(body);
  }

  @Get('logout')
  logout(@Req() request: Request) {
    request.session.user = null;
  }

  @Post('signin')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
