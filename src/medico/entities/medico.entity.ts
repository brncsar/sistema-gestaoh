import { Entity, Column, OneToMany, OneToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Usuario } from 'src/usuario/entities/usuario.entity'
import { Consulta } from 'src/consulta/entities/consulta.entity';


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

  //@OneToOne(() => Consulta, (consulta) => consulta.medico)  //IMplementar metodo one to one com o USUARIO.
  //consultas: Consulta[];

  @OneToOne(() => Usuario, (usuario) => usuario.medico)
  @JoinColumn()
  idusuario: Usuario;
}

  // Adicione outros campos e relacionamentos específicos do Médico

