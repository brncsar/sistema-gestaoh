import { Module } from '@nestjs/common';
import { PacienteService } from './paciente.service';
import { PacienteController } from './paciente.controller';
import { DatabaseModule } from 'src/database/database.module';
import { pacienteProviders } from './paciente.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [PacienteController],
  providers: [...pacienteProviders, PacienteService],
})
export class PacienteModule {}
