import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Medico } from '../medico/entities/medico.entity';
import { Paciente } from '../paciente/entities/paciente.entity';
import * as bcrypt from 'bcrypt';
import { CreatePacienteDto } from 'src/paciente/dto/create-paciente.dto';
import { CreateMedicoDto } from 'src/medico/dto/create-medico.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    @InjectRepository(Medico)
    private medicoRepository: Repository<Medico>,
    @InjectRepository(Paciente)
    private pacienteRepository: Repository<Paciente>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto){
    const { tipo, senha, ...usuarioData } = createUsuarioDto;

    // Hashing da senha antes de criar o usuário
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(senha, salt);

   
    const novoUsuario = this.usuarioRepository.create({
      ...usuarioData,
      senha: hashedPassword
    });
    await this.usuarioRepository.save(novoUsuario);

    if (tipo === 'medico') {
      const medicoData = createUsuarioDto as CreateMedicoDto;
      

      const medico = this.medicoRepository.create({ 
        especialidade: medicoData.especialidade,
        crm: medicoData.crm
      });


      await this.medicoRepository.save(medico);
      

    } else if (tipo === 'paciente') {
      const pacienteData = createUsuarioDto as CreatePacienteDto;
      const paciente = this.pacienteRepository.create({    
        nome: pacienteData.nome, 
      });


      await this.pacienteRepository.save(paciente);
      
      
    } else {
      throw new Error('Tipo de usuário inválido');
    }

    return {statusCode: HttpStatus.OK, message: 'Arvores encontradas.'};
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async findOne(id: number): Promise<Usuario> {
    return this.usuarioRepository.findOne({ where: { id } });
  }

  async findByUsuario(usuario: string): Promise<Usuario> {
    return this.usuarioRepository.findOne({ where: { usuario } });
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    await this.usuarioRepository.update(id, updateUsuarioDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.usuarioRepository.delete(id);
  }
}
