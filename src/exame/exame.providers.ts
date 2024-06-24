import { DataSource } from 'typeorm';
import { Exame } from './entities/exame.entity';

export const exameProviders = [
  {
    provide: 'EXAME_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Exame),
    inject: ['DATA_SOURCE'],
  },
];