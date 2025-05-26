import { InputType, Int, Field } from "@nestjs/graphql";

@InputType()
export class CreateAttendanceInput {
  @Field(() => Int)
  studentId: number;

  @Field(() => Int)
  scheduleId: number;

  @Field()
  date: string;

  @Field()
  status: "present" | "absent";
}
