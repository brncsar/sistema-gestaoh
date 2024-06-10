import { Entity, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Usuario } from 'src/usuario/entities/usuario.entity'

@Entity()
export class Paciente extends Usuario {
  @Column({ length: 100 })
  @ApiProperty({
    description: 'Especialidade do médico',
    example: 'Cardiologia',
  })
  especialidade: string;

  @Column({length: 100})
  @ApiProperty({
    description: 'Cadastro Regional do Medico',
    example: '0000000-00',
  })
  email: string;

  // Adicione outros campos e relacionamentos específicos do Paciente
}
