import { ApiProperty } from '@nestjs/swagger';
import { CreateUsuarioDto } from 'src/usuario/dto/create-usuario.dto';

export class CreateMedicoDto extends CreateUsuarioDto {
  @ApiProperty({ example: 'Especialidade' })
  especialidade: string;

  @ApiProperty({ example: 'Cadastro Regional Medico' })
  crm: string;

}
