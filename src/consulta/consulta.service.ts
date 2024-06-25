import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { UpdateConsultaDto } from './dto/update-consulta.dto';
import { Consulta } from './entities/consulta.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ConsultaService {
  constructor(
    @Inject('CONSULTA_REPOSITORY')
    private consultaRepository: Repository<Consulta>,
  ) {}
  
  create(createConsultaDto: CreateConsultaDto): Promise<Consulta> {
    const consulta = this.consultaRepository.create(createConsultaDto);
    return this.consultaRepository.save(consulta);
  }


  async findAll(): Promise<Consulta[]> {
    return this.consultaRepository.find({ relations: ['paciente', 'medico'] });
  }

  findOne(id: number) {
    return `This action returns a #${id} consulta`;
  }


  async update(id: number, updateConsultaDto: UpdateConsultaDto): Promise<Consulta> {
    const consulta = await this.consultaRepository.findOne({ where: { id } });
    if (!consulta) {
      throw new NotFoundException(`Consulta com ID ${id} não encontrada`);
    }
    Object.assign(consulta, updateConsultaDto);
    return this.consultaRepository.save(consulta);
  }

  async remove(id: number): Promise<void> {
    await this.consultaRepository.delete(id);
  }
}