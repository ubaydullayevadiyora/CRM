// src/teacher-groups/entities/teacher_group.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { ObjectType, Field, Int } from "@nestjs/graphql";

import { Group } from "../../groups/entities/group.entity";
import { Teacher } from "../../teacher/entities/teacher.entity";

@ObjectType()
@Entity("teacher_groups")
export class TeacherGroup {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Teacher)
  @ManyToOne(() => Teacher, { onDelete: "CASCADE" })
  teacher: Teacher;

  @Field(() => Group)
  @ManyToOne(() => Group, { onDelete: "CASCADE" })
  group: Group;
}
