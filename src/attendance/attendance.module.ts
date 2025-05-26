import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Attendance } from "./entities/attendance.entity";
import { AttendancesService } from "./attendance.service";
import { AttendancesResolver } from "./attendance.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([Attendance])],
  providers: [AttendancesService, AttendancesResolver],
})
export class AttendancesModule {}
