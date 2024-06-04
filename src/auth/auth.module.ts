import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from './constants';
import { UsuarioModule } from '../usuario/usuario.module';
import { UsuarioService } from 'src/usuario/usuario.service';
import { usuarioProviders } from '../usuario/usuario.providers';

@Module({
  controllers: [AuthController],
  providers: [...usuarioProviders, AuthService, UsuarioService],
  imports: [
    UsuarioModule, DatabaseModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '24h'},
    }),
  ],

})
export class AuthModule {}
