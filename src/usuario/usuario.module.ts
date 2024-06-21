import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { Usuario } from './entities/usuario.entity';
import { Medico } from '../medico/entities/medico.entity';
import { Paciente } from '../paciente/entities/paciente.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario, Medico, Paciente])
  ],
  providers: [UsuarioService],
  controllers: [UsuarioController],
  exports: [UsuarioService],
})
export class UsuarioModule {}
