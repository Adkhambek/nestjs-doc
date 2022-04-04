import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { error } from 'console';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { UserCreateDto } from './dto/userCreate.dto';
import { UserUpdateDto } from './dto/userUpdate.dto';
@Injectable()
export class UserService {
  constructor(@InjectModel() private readonly knex: Knex) {}
  async getUsers(): Promise<any> {
    return await this.knex.table('users');
  }
  async create(newUser: UserCreateDto): Promise<any> {
    try {
      await this.knex.table('users').insert(newUser);
      return {
        statusCode: 201,
        message: 'Successfully added',
      };
    } catch (err) {
      throw new HttpException(err.detail, HttpStatus.BAD_REQUEST);
    }
  }

  async getUserById(id: number): Promise<any> {
    const user = await this.knex.table('users').where('id', id);
    if (!user.length)
      throw new HttpException('not found', HttpStatus.NOT_FOUND);
    return user;
  }
  async update(id: number, userUpdateDto: UserUpdateDto): Promise<any> {
    const updatedUser = await this.knex
      .table('users')
      .where('id', id)
      .update(userUpdateDto);
    if (!updatedUser)
      throw new HttpException(`Bad request`, HttpStatus.BAD_REQUEST);
    else
      return {
        statusCode: 200,
        message: 'Updated successfully',
      };
  }
  async remove(id: number) {
    const removedUser = await this.knex.table('users').where('id', id).del();
    if (!removedUser)
      throw new HttpException(`Bad request`, HttpStatus.BAD_REQUEST);
    else
      return {
        statusCode: 200,
        message: 'Deleted successfully',
      };
  }
  private buildUsers(users: any): any {
    return {
      statusCode: 200,
      users,
      result: users.length,
    };
  }
}
