import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Student } from "../../students/entities/student.entity";
import { Group } from "../../groups/entities/group.entity";

@ObjectType()
@Entity("student_groups")
export class StudentGroup {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Student)
  @ManyToOne(() => Student, { onDelete: "CASCADE" })
  student: Student;

  @Field(() => Group)
  @ManyToOne(() => Group, { onDelete: "CASCADE" })
  group: Group;
}
