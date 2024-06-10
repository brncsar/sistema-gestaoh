import { Module } from '@nestjs/common';
import { MedicoService } from './medico.service';
import { MedicoController } from './medico.controller';
import { DatabaseModule } from 'src/database/database.module';
import { medicoProviders } from './medico.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [MedicoController],
  providers: [...medicoProviders, MedicoService, ],
})
export class MedicoModule {}
