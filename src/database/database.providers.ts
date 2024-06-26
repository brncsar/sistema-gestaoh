import { DataSource } from 'typeorm';
import { Usuario } from '../usuario/entities/usuario.entity';
import { Medico } from 'src/medico/entities/medico.entity';
import { Paciente } from 'src/paciente/entities/paciente.entity';
import { Consulta } from 'src/consulta/entities/consulta.entity';
import { Exame } from 'src/exame/entities/exame.entity';
import { truncate } from 'fs';

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
        entities: [Usuario,Medico,Paciente,Consulta,Exame],
        synchronize: false,
        dropSchema: false,
      });

      await dataSource.initialize();
      return dataSource;
    },
  },
];
