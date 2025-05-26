import { InputType, Field, Int } from "@nestjs/graphql";

@InputType()
export class CreateScheduleInput {
  @Field()
  day: string;

  @Field()
  startTime: string;

  @Field()
  endTime: string;

  @Field(() => Int)
  groupId: number;

  @Field(() => Int)
  teacherId: number;

  @Field(() => Int)
  courseId: number;
}
