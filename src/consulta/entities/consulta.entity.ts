import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Paciente } from 'src/paciente/entities/paciente.entity';
import { Medico } from 'src/medico/entities/medico.entity';

@Entity()
export class Consulta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  data: Date;

  @Column()
  hora_consulta: number;

  @ManyToOne(() => Paciente, (paciente) => paciente.consultas)
  @JoinColumn({ name: 'pacienteId' })
  paciente: Paciente;

  @ManyToOne(() => Medico, (medico) => medico.consultas)
  @JoinColumn({ name: 'medicoId' })
  medico: Medico;

  @Column()
  pacienteId: number;

  @Column()
  medicoId: number;


}
