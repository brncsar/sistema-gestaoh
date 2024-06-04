import { ApiProperty } from "@nestjs/swagger";

export class LoginDTO{
    @ApiProperty({
        description: 'Usuario',
        example: 'NomeUsuario'
    })
    readonly usuario: string;
    @ApiProperty({
        description: 'Senha',
        example: 'Senh4*Bast4nte%Segur4*'
    })
    readonly senha: string;
}
