import { ApiProperty } from '@nestjs/swagger';
import { CreateUsuarioDto } from 'src/usuario/dto/create-usuario.dto';

export class CreatePacienteDto extends CreateUsuarioDto {
  @ApiProperty({ example: 'Carlos' })
  nome: string;

  @ApiProperty({ example: 'Masculino ', required: false })
  genero: string;

  @ApiProperty({ example: true })
  cliente: boolean;

  @ApiProperty({ example: '3199999999' })
  contato: number;
}
