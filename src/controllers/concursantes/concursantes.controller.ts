import { Controller, Get, Post, Body, Param, HttpStatus } from '@nestjs/common';
import { AuthService } from '../../services/auth/auth.service';
import { ConcursantesService } from '../../services/concursantes/concursantes.service';
import { ResultResponse } from 'util/result-response';

@Controller('concursantes')
export class ConcursantesController {

    constructor(public readonly authService: AuthService, public readonly concursantesService: ConcursantesService) {}

    @Post('/login')
    async login(@Body() body) {
        const resultado: any = await this.authService.login(body.usuario, body.password);
        if (resultado.token) {

            const concursante = await this.concursantesService.getConcursante(body.usuario);

            return {
                statusCode: HttpStatus.OK,
                results: {
                    concursante: {
                        nombre: concursante[0].nombre,
                        apellido: concursante[0].apellido,
                        usuario: concursante[0].usuario,
                        cod_concursante: concursante[0].cod_concursante,
                        cod_categoria: concursante[0].cod_categoria,
                    },
                },
                token: resultado.token,
            };
        }
    }

    @Get('/all')
    async getAll() {
        const resultado = await this.concursantesService.getAllConcursantes();
        return ResultResponse.Ok('GET', resultado);
    }

    @Get('/desarrollo/:cod_aleatorio')
    async getByDesarrollo(@Param('cod_aleatorio') cod_aleatorio) {
        const resultado = await this.concursantesService.getConcursanteByDesarrollo(cod_aleatorio);
        return ResultResponse.Ok('GET', resultado);
    }

}
