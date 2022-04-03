import { Injectable } from '@nestjs/common';
const users = [];
@Injectable()
export class UserService {
  getUsers(): any {
    return this.buildUsers(users);
  }
  private buildUsers(users: any): any {
    return {
      statusCode: 200,
      users,
      result: users.length,
    };
  }
}
