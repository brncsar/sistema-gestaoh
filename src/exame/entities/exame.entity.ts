import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Paciente } from 'src/paciente/entities/paciente.entity';
import { Medico } from 'src/medico/entities/medico.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Exame {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({length: 100})
  @ApiProperty({
    description: 'Cadastro Regional do Medico',
    example: '0000000-00',
  })
  causa: string;

  @ManyToOne(() => Paciente, (paciente) => paciente.exames)
  paciente: Paciente;

  @ManyToOne(() => Medico, (medico) => medico.exames)
  medico: Medico;


}
