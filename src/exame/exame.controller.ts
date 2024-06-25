import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { ExameService } from './exame.service';
import { CreateExameDto } from './dto/create-exame.dto';
import { UpdateExameDto } from './dto/update-exame.dto';

@Controller('exame')
export class ExameController {
  constructor(private readonly exameService: ExameService) {}

  @Post()
  create(@Body() createExameDto: CreateExameDto) {
    return this.exameService.create(createExameDto);
  }

  @Get()
  findAll() {
    return this.exameService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exameService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExameDto: UpdateExameDto) {
    return this.exameService.update(+id, updateExameDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.exameService.remove(+id);
      return { message: 'Consulta excluída com sucesso' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
