import { Controller, Post, Get, Body } from '@nestjs/common';
import { StaffService } from '../../services/staff/staff.service';

@Controller('staff')
export class StaffController {

    constructor(public staffService: StaffService) {}

    @Post('validar')
    async validarJurado(@Body() body) {
        const resultado = this.staffService.validarJurado(body.usuario, body.password);
        return resultado;
    }
}
