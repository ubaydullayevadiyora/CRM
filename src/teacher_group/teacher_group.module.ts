import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TeacherGroup } from "./entities/teacher_group.entity";
import { TeacherGroupsService } from "./teacher_group.service";
import { TeacherGroupsResolver } from "./teacher_group.resolver";


@Module({
  imports: [TypeOrmModule.forFeature([TeacherGroup])],
  providers: [TeacherGroupsService, TeacherGroupsResolver],
})
export class TeacherGroupsModule {}
