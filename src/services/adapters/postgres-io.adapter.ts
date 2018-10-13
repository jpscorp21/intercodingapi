import { IoAdapter } from '@nestjs/websockets';
import * as postgres from 'socket.io-adapter-postgres';

const postgresAdapter = postgres({ host: 'localhost', port: 5432 });

export class PostgresIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: any): any {
    const server = super.createIOServer(port, options);
    server.adapter(postgresAdapter);
    return server;
  }
}