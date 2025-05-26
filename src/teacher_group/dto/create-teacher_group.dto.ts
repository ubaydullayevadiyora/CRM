import { InputType, Int, Field } from "@nestjs/graphql";

@InputType()
export class CreateTeacherGroupInput {
  @Field(() => Int)
  teacherId: number;

  @Field(() => Int)
  groupId: number;
}
