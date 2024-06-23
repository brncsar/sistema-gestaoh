import { ApiProperty } from '@nestjs/swagger';
import { CreateUsuarioDto } from 'src/usuario/dto/create-usuario.dto';

export class CreatePacienteDto extends CreateUsuarioDto {
  @ApiProperty({ example: 'Carlos' })
  nome: string;



}
