import { DataSource } from 'typeorm';
import { Usuario } from '../usuario/entities/usuario.entity';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'Bancoinit1411',
        database: 'gestaosaudedb',
        entities: [Usuario],
        synchronize: false, // Sincronize automaticamente as entidades com o banco de dados
      });

      await dataSource.initialize();
      return dataSource;
    },
  },
];
