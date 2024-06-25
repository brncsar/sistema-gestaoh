import { Inject, Injectable } from '@nestjs/common';
import { CreateExameDto } from './dto/create-exame.dto';
import { UpdateExameDto } from './dto/update-exame.dto';
import { Exame } from './entities/exame.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExameService {
  constructor(
    @Inject('EXAME_REPOSITORY')
    private exameRepository: Repository<Exame>,
  ) {}
  
  create(createExameDto: CreateExameDto): Promise<Exame> {
    const exame = this.exameRepository.create(createExameDto);
    return this.exameRepository.save(exame);
  }

  async findAll(): Promise<Exame[]> {
    return this.exameRepository.find({ relations: ['paciente', 'medico'] });
  }

  findOne(id: number) {
    return `This action returns a #${id} exame`;
  }

  update(id: number, updateExameDto: UpdateExameDto) {
    return `This action updates a #${id} exame`;
  }

  async remove(id: number): Promise<void> {
    await this.exameRepository.delete(id);
  }
}
