import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMedicoDto } from './dto/create-medico.dto';
import { UpdateMedicoDto } from './dto/update-medico.dto';
import { Medico } from './entities/medico.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MedicoService {

  constructor(
    @InjectRepository(Medico)
    private readonly medicoRepository: Repository<Medico>,
  ) {}

  create(createMedicoDto: CreateMedicoDto): Promise<Medico> {
    const medico = this.medicoRepository.create(createMedicoDto);
    return this.medicoRepository.save(medico);
  }

  findAll(): Promise<Medico[]> {
    return this.medicoRepository.find();
  }

  findOne(id: number): Promise<Medico> {
    return this.medicoRepository.findOne({ where: { id } });
  }

  update(id: number, updateMedicoDto: UpdateMedicoDto): Promise<Medico> {
    return this.medicoRepository.save({ ...updateMedicoDto, id });
  }


  remove(id: number) {
    return `This action removes a #${id} medico`;
  }
}
