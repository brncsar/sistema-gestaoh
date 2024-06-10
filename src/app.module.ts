import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { databaseProviders } from './database/database.providers';
import { Usuario } from './usuario/entities/usuario.entity';
import { MedicoModule } from './medico/medico.module';
import { PacienteModule } from './paciente/paciente.module';




@Module({
  imports: [UsuarioModule, AuthModule, MedicoModule, PacienteModule],
  controllers: [AppController],
  providers: [...databaseProviders,AppService,Usuario,JwtService],
  exports: [...databaseProviders],
})
export class AppModule {}
