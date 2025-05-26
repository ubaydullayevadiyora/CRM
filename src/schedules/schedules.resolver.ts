import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { SchedulesService } from "./schedules.service";
import { Schedule } from "./entities/schedule.entity";
import { CreateScheduleInput } from "./dto/create-schedule.dto";
import { UpdateScheduleInput } from "./dto/update-schedule.dto";

@Resolver(() => Schedule)
export class SchedulesResolver {
  constructor(private readonly service: SchedulesService) {}

  @Mutation(() => Schedule)
  createSchedule(@Args("input") input: CreateScheduleInput) {
    return this.service.create(input);
  }

  @Query(() => [Schedule])
  findAllSchedules() {
    return this.service.findAll();
  }

  @Query(() => Schedule)
  findSchedule(@Args("id", { type: () => Int }) id: number) {
    return this.service.findOne(id);
  }

  @Mutation(() => Schedule)
  updateSchedule(@Args("input") input: UpdateScheduleInput) {
    return this.service.update(input.id, input);
  }

  @Mutation(() => Boolean)
  removeSchedule(@Args("id", { type: () => Int }) id: number) {
    return this.service.remove(id);
  }
}
