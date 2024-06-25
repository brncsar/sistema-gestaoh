import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Put } from '@nestjs/common';
import { ConsultaService } from './consulta.service';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { UpdateConsultaDto } from './dto/update-consulta.dto';

@Controller('consulta')
export class ConsultaController {
  constructor(private readonly consultaService: ConsultaService) {}

  @Post()
  create(@Body() createConsultaDto: CreateConsultaDto) {
    return this.consultaService.create(createConsultaDto);
  }

  @Get()
  async findAll(): Promise<any> {
    const consultas = await this.consultaService.findAll();
    return consultas.map(consulta => ({
      id: consulta.id,
      data: consulta.data,
      hora: consulta.hora_consulta,
      paciente: consulta.paciente ? consulta.paciente.nome : 'N/A',
      medico: consulta.medico ? consulta.medico.nome : 'N/A'
      
    }));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateConsultaDto: UpdateConsultaDto) {
    return this.consultaService.update(+id, updateConsultaDto);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.consultaService.findOne(+id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.consultaService.remove(+id);
      return { message: 'Consulta excluída com sucesso' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
