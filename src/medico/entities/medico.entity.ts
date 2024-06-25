import { Entity, Column, OneToMany, OneToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Usuario } from 'src/usuario/entities/usuario.entity'
import { Consulta } from 'src/consulta/entities/consulta.entity';
import { Exame } from 'src/exame/entities/exame.entity';


@Entity()
export class Medico {

  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: 'Identificador único do usuário',
    example: '1',
  })
  id: number;

  @Column({ length: 100 })
  @ApiProperty({
    description: 'Nome do médico',
    example: 'Carlos',
  })
  nome: string;

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
  crm: string;

  
  @OneToMany(() => Consulta, (consulta) => consulta.medico)
  consultas: Consulta[];

  @OneToMany(() => Exame, (exame) => exame.medico)
  exames: Exame[];


  //@OneToOne(() => Consulta, (consulta) => consulta.medico)  //IMplementar metodo one to one com o USUARIO.
  //consultas: Consulta[];

  @OneToOne(() => Usuario, (usuario) => usuario.medico)
  @JoinColumn({name: 'idusuarioId'})
  idusuario: Usuario;

  @Column()
  idusuarioId: number;


}

  // Adicione outros campos e relacionamentos específicos do Médico

