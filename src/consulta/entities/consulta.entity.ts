import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Paciente } from 'src/paciente/entities/paciente.entity';
import { Medico } from 'src/medico/entities/medico.entity';

@Entity()
export class Consulta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  data: Date;

  @ManyToOne(() => Paciente, (paciente) => paciente.consultas)
  paciente: Paciente;

  @ManyToOne(() => Medico, (medico) => medico.consultas)
  medico: Medico;


}
