import { ApiProperty } from '@nestjs/swagger';

export class CreateExameDto {
  @ApiProperty({ example: '2023-12-08T12:00:00Z', required: false })
  data: Date;

  @ApiProperty({ example: '16', required: false })
  hora_exame: number;
  
  @ApiProperty({ example: 'Rua A', required: false })
  endereco: string;
  
  @ApiProperty({ example: 'Motivo', required: false })
  causa: string;


  @ApiProperty({ example: '1', required: false })
  pacienteId: number;

  @ApiProperty({ example: '1', required: false })
  medicoId: number;




  
}
