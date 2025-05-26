import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StudentGroup } from "./entities/student_group.entity";
import { StudentGroupsService } from "./student_group.service";
import { StudentGroupsResolver } from "./student_group.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([StudentGroup])],
  providers: [StudentGroupsService, StudentGroupsResolver],
})
export class StudentGroupsModule {}
