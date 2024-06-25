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
        nome: medicoData.nome,
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

    return {statusCode: HttpStatus.OK, message: 'Usuario Criado.'};
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async findOne(id: number): Promise<any> {
    // Primeiro, tenta encontrar o paciente
    const paciente = await this.pacienteRepository.findOne({ where: { id } });
    if (paciente) {
      return {
        id: paciente.id,
        nome: paciente.nome,
      };
    }

    // Se não encontrou, tenta encontrar o médico
    const medico = await this.medicoRepository.findOne({ where: { id } });
    if (medico) {
      return {
        id: medico.id,
        nome: medico.nome,
      };
    }

    // Se não encontrou nenhum dos dois, retorna o usuário básico
    const usuario = await this.usuarioRepository.findOne({ where: { id } });
    if (usuario) {
      return {
        id: usuario.id,
        nome: 'Usuário', // Nome genérico se não for um paciente ou médico
        usuario: usuario.usuario,
        email: usuario.email,
      };
    }

    return null;
  }



  // async findOne(id: number): Promise<Usuario> {
  //   return this.usuarioRepository.findOne({
  //     where: { id },
  //     relations: ['paciente', 'medico'],
  //   });
  // }


  async findByUsuario(usuario: string): Promise<Usuario> {
    return this.usuarioRepository.findOne({ where: { usuario } });
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    await this.usuarioRepository.update(id, updateUsuarioDto);
    return this.usuarioRepository.findOne({ where: { id } });
  }
  async remove(id: number): Promise<void> {
    await this.usuarioRepository.delete(id);
  }
}
