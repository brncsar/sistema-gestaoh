import { Entity, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Usuario } from 'src/usuario/entities/usuario.entity'
import { Consulta } from 'src/consulta/entities/consulta.entity';

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

  @OneToMany(() => Consulta, (consulta) => consulta.paciente)
  consultas: Consulta[];



  // Adicione outros campos e relacionamentos específicos do Paciente
}
