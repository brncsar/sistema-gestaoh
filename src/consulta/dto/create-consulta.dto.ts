import { ApiProperty } from '@nestjs/swagger';

export class CreateConsultaDto {
  @ApiProperty({ example: '2023-12-08T12:00:00Z', required: false })
  data: Date;

  @ApiProperty({ example: '1' })
  pacienteId: number;

  @ApiProperty({ example: '1' })
  medicoId: number;

  
}
