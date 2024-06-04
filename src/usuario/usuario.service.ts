import { Inject, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { Repository, getRepository } from 'typeorm';
import { LoginDTO } from './dto/login-usuario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  
  constructor(
    @Inject('USUARIO_REPOSITORY')
    private usuarioRepository: Repository<Usuario>,
  ) {}

  
  
  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    //Hashing da senha antes de criar o usuário
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUsuarioDto.senha, salt);

    console.log('Dados recebidos: ', createUsuarioDto); // Log para verificar os dados recebidos
    const newUser = this.usuarioRepository.create({
      ...createUsuarioDto, senha: hashedPassword,
    })
    console.log('Dados a serem salvos:', newUser); // Log para verificar os dados antes de salvar
    return await this.usuarioRepository.save(newUser);
  }

  findAll() {
    return `This action returns all usuario`;
  }

  async findByEmail(usuario: string): Promise<Usuario | null> {
    return await this.usuarioRepository.findOne({ where: { usuario } });
  }


  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }

}
