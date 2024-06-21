import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';
import { Medico } from 'src/medico/entities/medico.entity';
import { Paciente } from 'src/paciente/entities/paciente.entity';


@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: 'Identificador único do usuário',
    example: '1',
  })
  id: number;

  @Column({length: 50, default: 'default_user'})
  @ApiProperty({
    description: 'Nome do usuário',
    example: 'john_doe',
  })
  usuario: string;

  @Column({length: 150})
  @ApiProperty({
    description: 'Email do usuário',
    example: 'bkjs@email.com',
  })
  email: string;

  @Column({length: 150})
  @ApiProperty({
    description: 'Senha do usuário',
    example: 'password123'
  })
  senha: string;

  @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  @ApiProperty({
    description: 'Data de criação do usuário',
    example: '2023-12-08T12:00:00Z',
  })
  data_criacao: Date;

  @OneToOne(() => Medico, (medico) => medico.idusuario)
  medico: Medico;


  @OneToOne(() => Paciente, (paciente) => paciente.idusuario)
  paciente: Paciente;

    


    async validatePassword(user: Usuario, senha: string): Promise<boolean> {
      return bcrypt.compare(senha, user.senha);
    }

    

}
