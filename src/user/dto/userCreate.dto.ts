import { IsString, IsInt, IsEmail, IsNotEmpty } from 'class-validator';

export class UserCreateDto {
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsInt()
  @IsNotEmpty()
  age: number;
}
