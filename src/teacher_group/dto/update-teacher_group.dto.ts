import { InputType, Field, Int, PartialType } from "@nestjs/graphql";
import { CreateTeacherGroupInput } from "./create-teacher_group.dto";

@InputType()
export class UpdateTeacherGroupInput extends PartialType(
  CreateTeacherGroupInput
) {
  @Field(() => Int)
  id: number;
}
