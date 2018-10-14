import { Controller, Get, UseGuards, Param, UseFilters } from '@nestjs/common';
import { LenguajesService } from '../../services/lenguajes/lenguajes.service';
import { AuthGuard } from '@nestjs/passport';
import { ResultResponse } from '../../util/result-response';
import { HttpExceptionFilter } from 'util/http-exception.filter';

@Controller('lenguajes')
export class LenguajesController {

    constructor(private readonly lenguajesService: LenguajesService) {}

    // @UseGuards(AuthGuard())
    @Get()
    @UseFilters(new HttpExceptionFilter())
    async getAll() {
        const datos = await this.lenguajesService.getAll();
        return ResultResponse.Ok('GET', datos);
    }

    @Get(':id')
    @UseFilters(new HttpExceptionFilter())
    async getById(@Param('id') id) {
        const datos = await this.lenguajesService.getById(id);
        return ResultResponse.Ok('GET', datos);
    }

}
