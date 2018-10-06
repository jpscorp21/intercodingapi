import { Controller, Get, Param, Put, Body, Post } from '@nestjs/common';
import { EjerciciosService } from 'services/ejercicios/ejercicios.service';

@Controller('ejercicios')
export class EjerciciosController {

    constructor(private readonly ejerciciosService: EjerciciosService) {}

    @Get('all/:nombre/:cod_categoria/:grado_dificultad/:cantidad')
    getAll(@Param() params) {
        const resultado = this.ejerciciosService.getAll(params.nombre, params.cod_categoria, params.grado_dificultad, params.cantidad);
        return resultado;
    }

    @Get('one/:id')
    getById(@Param('id') id) {
        const resultado = this.ejerciciosService.getById(id);
        return resultado;
    }

    @Put('estado')
    updateEstado(@Body() body) {
        const resultado = this.ejerciciosService.updateEstado(body.estado, body.id);
        return resultado;
    }

    @Put('nro')
    updateNroEjercicio(@Body() body) {
        const resultado = this.ejerciciosService.updateNroEjercicio(body.nro, body.id);
        return resultado;
    }

    @Post('search/estadosterminados')
    searchEstadoTerminados(@Body() body) {
        const resultado = this.ejerciciosService.searchEstadosTerminados(body.usuario, body.grado_dificultad, body.cod_categoria, body.cantidad);
        return resultado;
    }

    @Put('validar/entregar')
    validarEntrega(@Body() body) {
        const resultado = this.ejerciciosService.validarEntrega(body.id, body.puntaje, body.usuario);
        return resultado;
    }

    @Post('search/estado')
    buscarEstado(@Body() body) {
        const resultado = this.ejerciciosService.buscarEstado(body.usuario, body.cod_categoria);
        return resultado;
    }

    @Get('reanudar/:nombre/:cod_categoria/:grado_dificultad')
    getEjerciciosReanudar(@Param() params) {
        const resultado = this.ejerciciosService.getEjercicioReanudar(params.nombre, params.cod_categoria, params.grado_dificultad);
        return resultado;
    }
}
