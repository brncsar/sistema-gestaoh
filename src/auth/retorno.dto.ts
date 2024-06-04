import { ApiProperty } from '@nestjs/swagger';


export class RetornoLoginDTO {
  @ApiProperty({
    description: 'Token de login. Salve para enviar em todas as chamadas que ele é necessario.',
    example: "dkj3heiuheodsbo8ef9.fiodhf9hfnjksdn",
  })
  access_token: string;

  @ApiProperty({
    description: 'Identificador único do usuário',
    example: 1,
  })
  idUsuario: number;

  @ApiProperty({
    description: 'Identificador único da pessoa',
    example: 1,
  })
  idPerfil: number;

  @ApiProperty({
    description: 'Tipo de usuário',
    example: "usuario",
  })
  tipo_usuario: string;

}
