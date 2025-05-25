import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity("students")
export class Student {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  first_name: string;

  @Field()
  @Column()
  last_name: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  phone: string;

  @Column()
  password: string;

  @Field({ defaultValue: true })
  @Column({ default: true })
  is_active: boolean;

  @Field({ nullable: true })
  @Column({ type: "enum", enum: ["male", "female"], nullable: true })
  gender: "male" | "female";

  @Field({ nullable: true })
  @Column({ type: "date", nullable: true })
  date_of_birth: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  avatar_url: string;
}
