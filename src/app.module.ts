import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { MedicoModule } from './medico/medico.module';
import { PacienteModule } from './paciente/paciente.module';
import { ConsultaModule } from './consulta/consulta.module';
import { Usuario } from './usuario/entities/usuario.entity';
import { Medico } from './medico/entities/medico.entity';
import { Paciente } from './paciente/entities/paciente.entity';
import { Consulta } from './consulta/entities/consulta.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Bancoinit1411',
      database: 'gestaosaudedb',
      entities: [Usuario, Medico, Paciente, Consulta],
      synchronize: false,
      dropSchema: false,
    }),
    UsuarioModule,
    AuthModule,
    MedicoModule,
    PacienteModule,
    ConsultaModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtService],
})
export class AppModule {}
