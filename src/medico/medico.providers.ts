import { DataSource } from 'typeorm';
import { Medico } from './entities/medico.entity';

export const medicoProviders = [
  {
    provide: 'MEDICO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Medico),
    inject: ['DATA_SOURCE'],
  },
];