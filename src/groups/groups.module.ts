// src/groups/groups.module.ts
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GroupsService } from "./groups.service";
import { GroupsResolver } from "./groups.resolver";
import { Group } from "./entities/group.entity";
import { Course } from "../courses/entities/course.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Group, Course])],
  providers: [GroupsService, GroupsResolver],
})
export class GroupsModule {}
