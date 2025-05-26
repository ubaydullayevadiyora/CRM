import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SchedulesService } from "./schedules.service";
import { SchedulesResolver } from "./schedules.resolver";
import { Schedule } from "./entities/schedule.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Schedule])],
  providers: [SchedulesService, SchedulesResolver],
})
export class SchedulesModule {}
