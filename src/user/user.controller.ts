import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Redirect,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserCreateDto } from './dto/userCreate.dto';
import { UserUpdateDto } from './dto/userUpdate.dto';
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
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserById(id);
  }
  @Get('filter')
  getUsersByFilter(@Query('by') query: any): string {
    console.log(query);
    return `sorted by ${query}`;
  }
  @Post()
  @UsePipes(new ValidationPipe())
  async createUser(@Body() userCreateDto: UserCreateDto): Promise<any> {
    return await this.userService.create(userCreateDto);
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
  @Put(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() userUpdateDto: UserUpdateDto,
  ) {
    return this.userService.update(id, userUpdateDto);
  }
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
  @Get('forbidden')
  forbiddenPage() {
    new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }
}
