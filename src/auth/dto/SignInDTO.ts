import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
