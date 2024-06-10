import { Inject, Injectable } from '@nestjs/common';
import { CreateMedicoDto } from './dto/create-medico.dto';
import { UpdateMedicoDto } from './dto/update-medico.dto';
import { Medico } from './entities/medico.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MedicoService {

  constructor(
    @Inject('MEDICO_REPOSITORY')
    private medicoRepository: Repository<Medico>,
  ) {}

  create(createMedicoDto: CreateMedicoDto) {
    return 'This action adds a new medico';
  }

  findAll() {
    return `This action returns all medico`;
  }

  findOne(id: number) {
    return `This action returns a #${id} medico`;
  }

  update(id: number, updateMedicoDto: UpdateMedicoDto) {
    return `This action updates a #${id} medico`;
  }

  remove(id: number) {
    return `This action removes a #${id} medico`;
  }
}
