import { ApiProperty } from '@nestjs/swagger';
import { CreateUsuarioDto } from 'src/usuario/dto/create-usuario.dto';
import { Usuario } from 'src/usuario/entities/usuario.entity';

export class CreatePacienteDto extends CreateUsuarioDto {
  @ApiProperty({ example: 'Carlos' })
  nome: string;

  @ApiProperty({ example: 'Masculino ', required: false })
  genero: string;

  @ApiProperty({ example: true })
  cliente: boolean;

  @ApiProperty({ example: '3199999999' })
  contato: number;

  @ApiProperty({ example: '1',required: false  })
  idusuarioId: number;
}
