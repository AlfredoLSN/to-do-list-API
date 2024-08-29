import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/SignInDTO';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: SignInDTO) {
    return this.service.signIn(signInDto.email, signInDto.password);
  }
}
