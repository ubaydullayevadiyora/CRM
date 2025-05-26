import { InputType, Field, Int, PartialType } from "@nestjs/graphql";
import { CreateScheduleInput } from "./create-schedule.dto";

@InputType()
export class UpdateScheduleInput extends PartialType(CreateScheduleInput) {
  @Field(() => Int)
  id: number;
}
