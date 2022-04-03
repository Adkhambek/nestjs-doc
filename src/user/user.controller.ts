import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Post,
  Put,
  Query,
  Redirect,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserCreateDto } from './user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  getUsers() {
    return this.userService.getUsers();
  }
  @Get('req')
  getRequest(@Req() req: Request, @Res() res: Response): Response {
    console.log(req.headers);
    return res.send('Request & Response');
  }
  @Get('user/:id')
  getUserById(@Param('id') id: string): string {
    return id;
  }
  @Get('filter')
  getUsersByFilter(@Query('by') query: any): string {
    console.log(query);
    return `sorted by ${query}`;
  }
  @Post()
  createUser(@Body() input: UserCreateDto): UserCreateDto {
    return input;
  }
  @Get('ab*')
  getStringStartedWithab(@Req() req: Request): string {
    const arr = req.url.split('/');

    return arr[arr.length - 1].toString();
  }
  @Get('doc')
  @Redirect('https://nestjs.com', 301)
  getDoc() {}

  @Get('async')
  async findAll(): Promise<string[]> {
    return ['Adham', 'Hasan', 'Fotima'];
  }
  @Put('update')
  updateUser(): string {
    return 'update user';
  }
  @Delete('delete')
  deleteUser(): string {
    return 'Delete user';
  }
}