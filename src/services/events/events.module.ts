import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { ConcursantesService } from '../services/concursantes/concursantes.service';
import { EjerciciosService } from '../services/ejercicios/ejercicios.service';

@Module({
  providers: [EventsGateway, ConcursantesService, EjerciciosService],
})
export class EventsModule {}