import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { AnimalsModule } from './modules/animals/animals.module';
import { OrganizationsModule } from './modules/organizations/organizations.module';
import { AdoptionsModule } from './modules/adoptions/adoptions.module';
import { VisitsModule } from './modules/visits/visits.module';
import { UploadsModule } from './modules/uploads/uploads.module';
import { GeolocationModule } from './modules/geolocation/geolocation.module';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [UsersModule, AuthModule, AnimalsModule, OrganizationsModule, AdoptionsModule, VisitsModule, UploadsModule, GeolocationModule, HealthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
