import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { TeacherGroup } from "./entities/teacher_group.entity";
import { TeacherGroupsService } from "./teacher_group.service";
import { CreateTeacherGroupInput } from "./dto/create-teacher_group.dto";
import { UpdateTeacherGroupInput } from "./dto/update-teacher_group.dto";


@Resolver(() => TeacherGroup)
export class TeacherGroupsResolver {
  constructor(private readonly service: TeacherGroupsService) {}

  @Mutation(() => TeacherGroup)
  createTeacherGroup(@Args("input") input: CreateTeacherGroupInput) {
    return this.service.create(input);
  }

  @Query(() => [TeacherGroup])
  findAllTeacherGroups() {
    return this.service.findAll();
  }

  @Query(() => TeacherGroup)
  findTeacherGroup(@Args("id", { type: () => Int }) id: number) {
    return this.service.findOne(id);
  }

  @Mutation(() => TeacherGroup)
  updateTeacherGroup(@Args("input") input: UpdateTeacherGroupInput) {
    return this.service.update(input.id, input);
  }

  @Mutation(() => Boolean)
  removeTeacherGroup(@Args("id", { type: () => Int }) id: number) {
    return this.service.remove(id);
  }
}
