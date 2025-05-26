import { InputType, Field, Int, PartialType } from "@nestjs/graphql";
import { CreateAttendanceInput } from "./create-attendance.dto";

@InputType()
export class UpdateAttendanceInput extends PartialType(CreateAttendanceInput) {
  @Field(() => Int)
  id: number;
}
