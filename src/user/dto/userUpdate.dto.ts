import { IsString, IsInt, IsEmail } from 'class-validator';

export class UserUpdateDto {
  @IsString()
  username: string;
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  password: string;
  @IsInt()
  age: number;
}
