import { Inject, Injectable } from '@nestjs/common';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { Paciente } from './entities/paciente.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PacienteService {

  constructor(
    @Inject('PACIENTE_REPOSITORY')
    private pacienteRepository: Repository<Paciente>,
  ) {}

  create(createPacienteDto: CreatePacienteDto) {
    return 'This action adds a new paciente';
  }

  findAll() {
    return `This action returns all paciente`;
  }

  findOne(id: number) {
    return `This action returns a #${id} paciente`;
  }

  update(id: number, updatePacienteDto: UpdatePacienteDto) {
    return `This action updates a #${id} paciente`;
  }

  remove(id: number) {
    return `This action removes a #${id} paciente`;
  }
}
