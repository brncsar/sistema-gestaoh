import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Paciente } from 'src/paciente/entities/paciente.entity';
import { Medico } from 'src/medico/entities/medico.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Exame {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  data: Date;

  @Column()
  hora_exame: number;
  
  @Column({length: 100})
  @ApiProperty({
    description: 'Endereço do exame',
    example: 'Avenia Dr Mariano, Gavazza 48',
  })
  endereco: string;

  @Column({length: 100})
  @ApiProperty({
    description: 'Cadastro Regional do Medico',
    example: '0000000-00',
  })
  causa: string;

  @ManyToOne(() => Paciente, (paciente) => paciente.exames)
  @JoinColumn({ name: 'pacienteId' })
  paciente: Paciente;

  @ManyToOne(() => Medico, (medico) => medico.exames)
  @JoinColumn({ name: 'medicoId' })
  medico: Medico;

  @Column()
  pacienteId: number;

  @Column()
  medicoId: number;


}
