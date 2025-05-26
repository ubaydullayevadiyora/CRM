import { InputType, Int, Field } from "@nestjs/graphql";

@InputType()
export class CreateStudentGroupInput {
  @Field(() => Int)
  studentId: number;

  @Field(() => Int)
  groupId: number;
}
