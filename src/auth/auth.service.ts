// auth.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuario/usuario.service';
import { LoginDTO } from 'src/usuario/dto/login-usuario.dto';


@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDTO) {
    const { usuario, senha } = loginDto;
    const user = await this.usuarioService.findByUsuario(usuario);
    console.log(user)
    if (user && await user.validatePassword(user, senha)) {
      const payload = { usuario: user.usuario, sub: user.id };
      return this.jwtService.sign(payload);
    }
    console.log("-----------")
    throw new UnauthorizedException('Credenciais Inválidas');
  }
  

}
