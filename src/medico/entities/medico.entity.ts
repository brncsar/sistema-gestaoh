import { Entity, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Usuario } from 'src/usuario/entities/usuario.entity'

@Entity()
export class Medico extends Usuario {
  @Column({ length: 100 })
  @ApiProperty({
    description: 'Especialidade do médico',
    example: 'Cardiologia',
  })
  especialidade: string;

  // Adicione outros campos e relacionamentos específicos do Médico
}
