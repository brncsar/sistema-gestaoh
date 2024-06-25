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

  async create(createMedicoDto: CreateMedicoDto): Promise<Medico> {
    const medico = this.medicoRepository.create(createMedicoDto);
    return this.medicoRepository.save(medico);
  }
  

  findAll(): Promise<Medico[]> {
    return this.medicoRepository.find();
  }

  findByName(nome: string): Promise<Medico[]> {
    return this.medicoRepository.find({
      where: {
        nome: nome,
      },
    });
  }

  findOne(id: number): Promise<Medico> {
    return this.medicoRepository.findOne({ where: { id } });
  }

  update(id: number, updateMedicoDto: UpdateMedicoDto): Promise<Medico> {
    return this.medicoRepository.save({ ...updateMedicoDto, id });
  }


  async remove(id: number): Promise<void> {
    await this.medicoRepository.delete(id);
  }
}
