import { ApiProperty } from '@nestjs/swagger';


export class CreateExameDto {
  @ApiProperty({ example: 'Especialidade' })
  causa: string;

}
