import { Entity, Column, OneToMany, OneToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Usuario } from 'src/usuario/entities/usuario.entity'
import { Consulta } from 'src/consulta/entities/consulta.entity';

@Entity()
export class Paciente {

  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: 'Identificador único do usuário',
    example: '1',
  })
  id: number;

  @Column({ length: 100 })
  @ApiProperty({
    description: 'Nome Paciente',
    example: 'Carlos',
  })
  nome: string;

  

  @OneToMany(() => Consulta, (consulta) => consulta.paciente)
  consultas: Consulta[];

  @OneToOne(() => Usuario, (usuario) => usuario.paciente)
  @JoinColumn()
  idusuario: Usuario;
}



  // Adicione outros campos e relacionamentos específicos do Paciente

