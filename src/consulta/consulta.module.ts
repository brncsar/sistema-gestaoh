import { Module } from '@nestjs/common';
import { ConsultaService } from './consulta.service';
import { ConsultaController } from './consulta.controller';
import { DatabaseModule } from 'src/database/database.module';
import { consultaProviders } from './consulta.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ConsultaController],
  providers: [...consultaProviders, ConsultaService],
})
export class ConsultaModule {}
