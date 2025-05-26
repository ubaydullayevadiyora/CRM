import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { Attendance } from "./entities/attendance.entity";
import { AttendancesService } from "./attendance.service";
import { CreateAttendanceInput } from "./dto/create-attendance.dto";
import { UpdateAttendanceInput } from "./dto/update-attendance.dto";


@Resolver(() => Attendance)
export class AttendancesResolver {
  constructor(private readonly service: AttendancesService) {}

  @Mutation(() => Attendance)
  createAttendance(@Args("input") input: CreateAttendanceInput) {
    return this.service.create(input);
  }

  @Query(() => [Attendance])
  findAllAttendances() {
    return this.service.findAll();
  }

  @Query(() => Attendance)
  findAttendance(@Args("id", { type: () => Int }) id: number) {
    return this.service.findOne(id);
  }

  @Mutation(() => Attendance)
  updateAttendance(@Args("input") input: UpdateAttendanceInput) {
    return this.service.update(input.id, input);
  }

  @Mutation(() => Boolean)
  removeAttendance(@Args("id", { type: () => Int }) id: number) {
    return this.service.remove(id);
  }
}
