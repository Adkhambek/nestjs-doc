import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { UserCreateDto } from './user.dto';
@Injectable()
export class UserService {
  constructor(@InjectModel() private readonly knex: Knex) {}
  async getUsers(): Promise<any> {
    return await this.knex.table('users');
  }
  async create(newUser: UserCreateDto): Promise<any> {
    try {
      return await this.knex.table('users').insert(newUser);
    } catch (err) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }
  private buildUsers(users: any): any {
    return {
      statusCode: 200,
      users,
      result: users.length,
    };
  }
}
