import { Controller, Get } from '@nestjs/common';
import { CorreccionesService } from 'services/correcciones/correcciones.service';

@Controller('correcciones')
export class CorreccionesController {

    constructor(private correccionesService: CorreccionesService) {}

    @Get('/all')
    getAll() {
        const resultado = this.correccionesService.getAll();
        return resultado;
    }
}
