import { Controller, Get, UseGuards, Param, Req, Request } from '@nestjs/common';
import { LenguajesService } from '../../services/lenguajes/lenguajes.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('lenguajes')
export class LenguajesController {

    constructor(private readonly lenguajesService: LenguajesService) {}

    @Get()
    // @UseGuards(AuthGuard())
    async getAll() {

        const datos = await this.lenguajesService.getAll();
        return datos;
    }

    @Get(':id')
    async getById(@Param('id') id) {
        const datos = await this.lenguajesService.getById(id);
        return datos;
    }

}
