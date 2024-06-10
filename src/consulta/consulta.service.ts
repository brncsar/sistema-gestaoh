import { Inject, Injectable } from '@nestjs/common';
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
  create(createConsultaDto: CreateConsultaDto) {
    return 'This action adds a new consulta';
  }

  findAll() {
    return `This action returns all consulta`;
  }

  findOne(id: number) {
    return `This action returns a #${id} consulta`;
  }

  update(id: number, updateConsultaDto: UpdateConsultaDto) {
    return `This action updates a #${id} consulta`;
  }

  remove(id: number) {
    return `This action removes a #${id} consulta`;
  }
}
