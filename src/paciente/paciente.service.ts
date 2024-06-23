import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { Paciente } from './entities/paciente.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PacienteService {

  constructor(
    @InjectRepository(Paciente)
    private readonly pacienteRepository: Repository<Paciente>,
  ) {}

  create(createPacienteDto: CreatePacienteDto): Promise<Paciente> {
    const paciente = this.pacienteRepository.create(createPacienteDto);
    return this.pacienteRepository.save(paciente);
  }

  findAll(): Promise<Paciente[]> {
    return this.pacienteRepository.find();
  }

  findByName(nome: string): Promise<Paciente[]> {
    return this.pacienteRepository.find({
      where: {
        nome: nome,
      },
    });
  }


  findOne(id: number): Promise<Paciente> {
    return this.pacienteRepository.findOne({ where: { id } });
  }

  update(id: number, updatePacienteDto: UpdatePacienteDto): Promise<Paciente> {
    return this.pacienteRepository.save({ ...updatePacienteDto, id });
  }


  remove(id: number) {
    return `This action removes a #${id} medico`;
  }
}
