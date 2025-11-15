import { Module } from '@nestjs/common';
import { EventsService } from '../events/events.service';
import { EventsController } from '../controllers/events.controller';

@Module({
  controllers: [EventsController],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventsModule {}