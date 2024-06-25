import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { PacienteService } from './paciente.service';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { Paciente } from './entities/paciente.entity';

@Controller('paciente')
export class PacienteController {
  constructor(private readonly pacienteService: PacienteService) {}

  @Post()
  create(@Body() createPacienteDto: CreatePacienteDto) {
    return this.pacienteService.create(createPacienteDto);
  }

  @Get()
  findAll(@Query('nome') nome: string): Promise<Paciente[]> {
    if (nome) {
       this.pacienteService.findByName(nome);
    }
    return this.pacienteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pacienteService.findOne(+id);
  }


  @Put(':id')
  async update(@Param('id') id: number, @Body() updatePacienteDto: UpdatePacienteDto) {
    return this.pacienteService.update(id, updatePacienteDto);
  }

  @Delete(':id')
  async deletePaciente(@Param('id') id: number) {
    return this.pacienteService.delete(id);
  }
}
