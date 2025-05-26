import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Student } from "../../students/entities/student.entity";
import { Schedule } from "../../schedules/entities/schedule.entity";

@ObjectType()
@Entity("attendances")
export class Attendance {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Student)
  @ManyToOne(() => Student, { onDelete: "CASCADE" })
  student: Student;

  @Field(() => Schedule)
  @ManyToOne(() => Schedule, { onDelete: "CASCADE" })
  schedule: Schedule;

  @Field()
  @Column()
  date: string; 

  @Field()
  @Column()
  status: "present" | "absent"; 
}
