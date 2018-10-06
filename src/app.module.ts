import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// CONTROLADORES
import { EjerciciosController } from './controllers/ejercicios/ejercicios.controller';
import { ConcursantesController } from './controllers/concursantes/concursantes.controller';
import { LenguajesController } from './controllers/lenguajes/lenguajes.controller';
import { StaffController } from './controllers/staff/staff.controller';

// SERVICIOS
import { ConcursantesService } from './services/concursantes/concursantes.service';
import { EjerciciosService } from './services/ejercicios/ejercicios.service';
import { StaffService } from './services/staff/staff.service';
import { LenguajesService } from './services/lenguajes/lenguajes.service';
import { LoginController } from './login/login.controller';
import { AuthService } from './services/auth/auth.service';
import { AuthModule } from './services/auth/auth.module';
import { DatabaseService } from 'services/util/database.service';



@Module({
  imports: [AuthModule],
  controllers: [
    AppController,
    EjerciciosController,
    ConcursantesController,
    LenguajesController,
    StaffController,
    LoginController],
  providers: [
    AppService,
    EjerciciosService,
    ConcursantesService,
    LenguajesService,
    StaffService,
    AuthService,
    DatabaseService,
  ],
})
export class AppModule {}
