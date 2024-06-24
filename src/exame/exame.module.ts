import { Module } from '@nestjs/common';
import { ExameService } from './exame.service';
import { ExameController } from './exame.controller';
import { DatabaseModule } from 'src/database/database.module';
import { exameProviders } from './exame.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ExameController],
  providers: [...exameProviders,ExameService],
})
export class ExameModule {}
