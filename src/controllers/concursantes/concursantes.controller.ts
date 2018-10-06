import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from '../../services/auth/auth.service';
import { ConcursantesService } from '../../services/concursantes/concursantes.service';

@Controller('concursantes')
export class ConcursantesController {

    constructor(public readonly authService: AuthService, public readonly concursantesService: ConcursantesService) {}

    @Post('/login')
    async login(@Body() body) {
        const resultado: any = await this.authService.login(body.usuario, body.password);
        if (resultado.token) {

            const concursante = await this.concursantesService.getConcursante(body.usuario);

            return {
                concursante: {
                    nombre: concursante[0].nombre,
                    apellido: concursante[0].apellido,
                    usuario: concursante[0].usuario,
                    cod_concursante: concursante[0].cod_concursante,
                    cod_categoria: concursante[0].cod_categoria,
                },
                token: resultado.token,
                status: resultado.status,
            };
        }
    }

    @Get('/all')
    async getAll() {
        const resultado = await this.concursantesService.getAll();
        return resultado;
    }
}
