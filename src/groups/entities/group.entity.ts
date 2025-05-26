// src/groups/group.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Course } from "../../courses/entities/course.entity";


@Entity("groups")
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Course, (course) => course.groups)
  course: Course;

  @Column({ type: "date", nullable: true })
  start_date?: Date;

  @Column({ type: "date", nullable: true })
  end_date?: Date;

  @Column({ type: "varchar" }) 
  status: string;
}
