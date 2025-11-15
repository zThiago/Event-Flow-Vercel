import { IsEmail, IsString, Min, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({example: 'usuario@email.com', description: 'Email do usuário', required: true})
    @IsEmail()
    email: string;

    @ApiProperty({example: 'Senha123@', description: 'Senha do usuário, deve conter no minimo 6 caracteres', required: true})
    @IsString()
    @MinLength(6)
    password: string;
}

export class RegistroDto {
    @ApiProperty({example: 'usuario@email.com', description: 'Email do usuário'})
    @IsEmail()
    email: string;

    @ApiProperty({example: 'Senha123@', description: 'Senha do usuário, deve conter no minimo 6 caracteres'})
    @IsString()
    @MinLength(6)
    password: string;

    @ApiProperty({example: 'João', description: 'Nome do usuário'})
    @IsString()
    @MinLength(2)
    nome: string;

    @ApiProperty({example: '(11) 8402-8922', description: 'Telefone do usuário'})
    @IsString()
    @MinLength(10)
    telefone: string;
}