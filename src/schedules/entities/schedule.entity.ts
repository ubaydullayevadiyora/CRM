import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Group } from "../../groups/entities/group.entity";
import { Course } from "../../courses/entities/course.entity";
import { Teacher } from "../../teacher/entities/teacher.entity";

@ObjectType()
@Entity("schedules")
export class Schedule {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  day: string; 

  @Field(() => String)
  @Column()
  startTime: string;

  @Field(() => String)
  @Column()
  endTime: string; 

  @Field(() => Group)
  @ManyToOne(() => Group, { onDelete: "CASCADE" })
  group: Group;

  @Field(() => Teacher)
  @ManyToOne(() => Teacher, { onDelete: "CASCADE" })
  teacher: Teacher;

  @Field(() => Course)
  @ManyToOne(() => Course, { onDelete: "CASCADE" })
  course: Course;
}
