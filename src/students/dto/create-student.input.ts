// create-student.input.ts
import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CreateStudentInput {
  @Field() first_name: string;
  @Field() last_name: string;
  @Field() email: string;
  @Field() password: string;
  @Field({ nullable: true }) phone?: string;
  @Field({ nullable: true }) gender?: "male" | "female";
  @Field({ nullable: true }) date_of_birth?: string;
  @Field({ nullable: true }) avatar_url?: string;
}
