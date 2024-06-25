import { ApiProperty } from '@nestjs/swagger';

export class CreateConsultaDto {
  @ApiProperty({ example: '2023-12-08T12:00:00Z', required: false })
  data: Date;

  @ApiProperty({ example: '16:00', required: false })
  hora_consulta: number;


  @ApiProperty({ example: '1', required: false })
  pacienteId: number;

  @ApiProperty({ example: '1', required: false })
  medicoId: number;




  
}
