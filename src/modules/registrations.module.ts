import { Module } from '@nestjs/common';
import { RegistrationsService } from '../services/registrations.service';
import { RegistrationsController } from '../controllers/registrations.controller';

@Module({
  controllers: [RegistrationsController],
  providers: [RegistrationsService],
  exports: [RegistrationsService],
})
export class RegistrationsModule {}