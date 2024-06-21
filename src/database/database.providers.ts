import { DataSource } from 'typeorm';
import { Usuario } from '../usuario/entities/usuario.entity';
import { Medico } from 'src/medico/entities/medico.entity';
import { Paciente } from 'src/paciente/entities/paciente.entity';
import { Consulta } from 'src/consulta/entities/consulta.entity';

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
        entities: [Usuario,Medico,Paciente,Consulta],
        synchronize: false, // Sincronize automaticamente as entidades com o banco de dados
        dropSchema: false,
      });

      await dataSource.initialize();
      return dataSource;
    },
  },
];
