import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity("courses")
export class Course {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field({ nullable: true })
  @Column({ type: "text", nullable: true })
  description: string;

  @Field()
  @Column({ type: "decimal" })
  price: number;

  @Field()
  @Column()
  duration: number;

  @Field()
  @Column()
  lessons_in_a_week: number;

  @Field()
  @Column()
  lesson_duration: number;
}
