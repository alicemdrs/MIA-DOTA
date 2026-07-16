import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnimalsModule } from './modules/animals/animals.module';
import { OrganizationsModule } from './modules/organizations/organizations.module';
import { AdoptionsModule } from './modules/adoptions/adoptions.module';
import { VisitsModule } from './modules/visits/visits.module';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [AnimalsModule, OrganizationsModule, AdoptionsModule, VisitsModule, HealthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
