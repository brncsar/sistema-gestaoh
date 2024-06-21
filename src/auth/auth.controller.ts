import { LoginDTO } from '../usuario/dto/login-usuario.dto';
import { Post, Body, Controller, HttpCode, HttpStatus, HttpException, Get, Headers, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JWTAuthGuard } from './jwt-guard.auth';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../auth/constants';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RetornoLoginDTO } from './retorno.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Entra no sistema', description: 'Retorna um access_token, que ao ser enviado ao backend, funciona como credencial de login.' })
  @ApiResponse({
    status: 200,
    description: 'Retorna um objeto com o access_token. Salvar ele para enviar nas outras chamadas',
    type: RetornoLoginDTO, 
  })
  @Post('login')
  login(@Body() loginInfo: LoginDTO) {
    console.log("----")
    return this.authService.login(loginInfo);
  }

  @UseGuards(JWTAuthGuard)
  @Get('decode')
  decodeToken(@Headers('authorization') authorization: string): any {
    const token = authorization?.split(' ')[1];
    if (token) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
      } catch (error) {
        // Handle error if token is invalid or expired
        console.error(error);
        throw new HttpException('Invalid or expired token', HttpStatus.UNAUTHORIZED);
      }
    } else {
      throw new HttpException('Token not provided', HttpStatus.UNAUTHORIZED);
    }
  }
}
