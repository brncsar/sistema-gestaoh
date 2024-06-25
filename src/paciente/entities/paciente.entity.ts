import { Entity, Column, OneToMany, OneToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Usuario } from 'src/usuario/entities/usuario.entity'
import { Consulta } from 'src/consulta/entities/consulta.entity';
import { Exame } from 'src/exame/entities/exame.entity';

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

  @Column({ default: 'não especificado' })
  @ApiProperty({
    description: 'Gênero do paciente',
    example: 'Masculino',
  })
  genero: string;

  @Column({ default: '000000' })
  @ApiProperty({
    description: 'Contato do paciente',
    example: '3199999999',
  })
  contato: number;

  @Column({ default: true })
  @ApiProperty({
    description: 'Indicador se é cliente',
    example: true,
  })
  cliente: boolean;

  

  @OneToMany(() => Consulta, (consulta) => consulta.paciente)
  consultas: Consulta[];
  
  @OneToMany(() => Exame, (exame) => exame.paciente)
  exames: Exame[];

  @OneToOne(() => Usuario, (usuario) => usuario.paciente)
  @JoinColumn({ name: 'idusuarioId' })
  idusuario: Usuario;

  @Column({nullable: true})
  idusuarioId: number;

}
