import { InputType, Field, Int, PartialType } from "@nestjs/graphql";
import { CreateStudentGroupInput } from "./create-student_group.dto";

@InputType()
export class UpdateStudentGroupInput extends PartialType(
  CreateStudentGroupInput
) {
  @Field(() => Int)
  id: number;
}
