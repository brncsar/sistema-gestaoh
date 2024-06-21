import { ApiProperty } from '@nestjs/swagger';

export class CreateUsuarioDto {
  @ApiProperty({ example: 'john_doe' })
  usuario: string;

  @ApiProperty({ example: 'bkjs@email.com' })
  email: string;

  @ApiProperty({ example: 'password123' })
  senha: string;

  @ApiProperty({ example: 'tipo de usuário' })
  tipo: string;
  
  @ApiProperty({ example: '2023-12-08T12:00:00Z', required: false })
  data_criacao?: Date;
}
