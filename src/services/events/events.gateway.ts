import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConcursantesService } from '../../services/concursantes/concursantes.service';
import { CorreccionesService } from 'services/correcciones/correcciones.service';

@WebSocketGateway()
export class EventsGateway {

  constructor(private readonly correccionesService: CorreccionesService,
              private readonly concursantesService: ConcursantesService) {}

  @WebSocketServer()
  server;

  @SubscribeMessage('events')
  findAll(client, data): Observable<WsResponse<number>> {
    // tslint:disable-next-line:no-console
    return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
  }

  @SubscribeMessage('entrega_concursante')
  async identity(client, data): Promise<number> {
    const resultado = await this.concursantesService.getConcursanteByDesarrollo(data.cod_aleatorio);
    // const resultado = await this.correccionesService.getAll();
    client.broadcast.emit('add_concursante', resultado);
    return resultado;
  }

  @SubscribeMessage('correccion')
  async correccion(client, data: any): Promise<number> {
      // tslint:disable-next-line:no-console
    console.log(data);
    let mensaje = '';
    if (data.estado === 'TER') {
        mensaje = 'CORRECTO';
    } else if (data.estado === 'DES') {
        mensaje = 'INCORRECTO';
    }

    client.broadcast.emit('verificado', {cod_aleatorio: data.cod_aleatorio, estado: mensaje});
    return data;
  }
}
