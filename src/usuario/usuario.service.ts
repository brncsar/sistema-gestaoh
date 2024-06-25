import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async create(createUsuarioDto: CreateUsuarioDto) {
    const { tipo, senha, ...usuarioData } = createUsuarioDto;

    try {
      // Hashing da senha antes de criar o usuário
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(senha, salt);

      const novoUsuario = this.usuarioRepository.create({
        ...usuarioData,
        senha: hashedPassword,
      });
      await this.usuarioRepository.save(novoUsuario);

      if (tipo === 'medico') {
        const medicoData = createUsuarioDto as CreateMedicoDto;
        const medico = this.medicoRepository.create({
          nome: medicoData.nome,
          especialidade: medicoData.especialidade,
          crm: medicoData.crm,
          idusuarioId: novoUsuario.id, // Adiciona o ID do usuário recém-criado
        });
        await this.medicoRepository.save(medico);

      } else if (tipo === 'paciente') {
        const pacienteData = createUsuarioDto as CreatePacienteDto;
        const paciente = this.pacienteRepository.create({
          nome: pacienteData.nome,
          genero: pacienteData.genero,
          contato: pacienteData.contato,
          cliente: pacienteData.cliente,
        });
        const novoPaciente = await this.pacienteRepository.save(paciente);

        // Atualiza o campo idusuarioId após a criação do paciente
        await this.pacienteRepository.update(novoPaciente.id, { idusuarioId: novoUsuario.id });

      } else {
        throw new Error('Tipo de usuário inválido');
      }

      return { userId: novoUsuario.id, statusCode: HttpStatus.OK, message: 'Usuario Criado.' };
    } catch (error) {
      console.error('Erro ao criar usuário', error);
      throw new HttpException('Erro ao criar usuário', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: { id },
      relations: ['medico', 'paciente'], // Certifique-se de ajustar as relações conforme necessário
    });
    if (!usuario) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }
    return usuario;
  }

  async findByUsuario(usuario: string): Promise<Usuario> {
    return this.usuarioRepository.findOne({ where: { usuario } });
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    await this.usuarioRepository.update(id, updateUsuarioDto);
    const updatedUsuario = await this.usuarioRepository.findOne({ where: { id } });
    if (!updatedUsuario) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }
    return updatedUsuario;
  }

  async remove(id: number): Promise<void> {
    const deleteResult = await this.usuarioRepository.delete(id);
    if (!deleteResult.affected) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }
  }
}
