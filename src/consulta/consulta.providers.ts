import { DataSource } from 'typeorm';
import { Consulta } from './entities/consulta.entity';

export const consultaProviders = [
  {
    provide: 'CONSULTA_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Consulta),
    inject: ['DATA_SOURCE'],
  },
];