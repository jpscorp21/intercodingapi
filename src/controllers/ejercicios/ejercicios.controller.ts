import { Controller, Get, Param, Put, Body, Post, UseFilters } from '@nestjs/common';
import { EjerciciosService } from 'services/ejercicios/ejercicios.service';
import { ResultResponse } from 'util/result-response';
import { HttpExceptionFilter } from 'util/http-exception.filter';

@Controller('ejercicios')
export class EjerciciosController {

    constructor(private readonly ejerciciosService: EjerciciosService) {}

    @UseFilters(new HttpExceptionFilter())
    @Get('all/:nombre/:cod_categoria/:grado_dificultad/:cantidad')
    getAll(@Param() params) {
        const resultado = this.ejerciciosService.getAll(params.nombre, params.cod_categoria, params.grado_dificultad, params.cantidad);
        return ResultResponse.Ok('GET', resultado);
    }

    @UseFilters(new HttpExceptionFilter())
    @Get('one/:id')
    getById(@Param('id') id) {
        const resultado = this.ejerciciosService.getById(id);
        return ResultResponse.Ok('GET', resultado);
    }

    @UseFilters(new HttpExceptionFilter())
    @Put('estado')
    updateEstado(@Body() body) {
        const resultado = this.ejerciciosService.updateEstado(body.estado, body.id);
        return ResultResponse.Ok('PUT', resultado);
    }

    @UseFilters(new HttpExceptionFilter())
    @Put('nro')
    updateNroEjercicio(@Body() body) {
        const resultado = this.ejerciciosService.updateNroEjercicio(body.nro, body.id);
        return ResultResponse.Ok('PUT', resultado);
    }

    @UseFilters(new HttpExceptionFilter())
    @Post('search/estadosterminados')
    searchEstadoTerminados(@Body() body) {
        const resultado = this.ejerciciosService.searchEstadosTerminados(body.usuario, body.grado_dificultad, body.cod_categoria, body.cantidad);
        return ResultResponse.Ok('POST', resultado);
    }

    @UseFilters(new HttpExceptionFilter())
    @Put('validar/entregar')
    validarEntrega(@Body() body) {
        const resultado = this.ejerciciosService.validarEntrega(body.id, body.puntaje, body.usuario);
        return ResultResponse.Ok('PUT', resultado);
    }

    @UseFilters(new HttpExceptionFilter())
    @Post('search/estado')
    buscarEstado(@Body() body) {
        const resultado = this.ejerciciosService.buscarEstado(body.usuario, body.cod_categoria);
        return ResultResponse.Ok('POST', resultado);
    }

    @UseFilters(new HttpExceptionFilter())
    @Get('reanudar/:nombre/:cod_categoria/:grado_dificultad')
    getEjerciciosReanudar(@Param() params) {
        const resultado = this.ejerciciosService.getEjercicioReanudar(params.nombre, params.cod_categoria, params.grado_dificultad);
        return ResultResponse.Ok('GET', resultado);
    }
}
