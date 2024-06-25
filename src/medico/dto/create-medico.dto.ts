import { ApiProperty } from '@nestjs/swagger';
import { CreateUsuarioDto } from 'src/usuario/dto/create-usuario.dto';
import { Usuario } from 'src/usuario/entities/usuario.entity';

export class CreateMedicoDto extends CreateUsuarioDto {
  @ApiProperty({ example: 'Nome do medico' })
  nome: string;
  
  @ApiProperty({ example: 'Especialidade' })
  especialidade: string;

  @ApiProperty({ example: 'Cadastro Regional Medico' })
  crm: string;

  @ApiProperty({ example: '1', required: false })
  idusuarioId: number;



}
