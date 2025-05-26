import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { StudentGroup } from "./entities/student_group.entity";
import { StudentGroupsService } from "./student_group.service";
import { CreateStudentGroupInput } from "./dto/create-student_group.dto";
import { UpdateStudentGroupInput } from "./dto/update-student_group.dto";


@Resolver(() => StudentGroup)
export class StudentGroupsResolver {
  constructor(private readonly service: StudentGroupsService) {}

  @Mutation(() => StudentGroup)
  createStudentGroup(@Args("input") input: CreateStudentGroupInput) {
    return this.service.create(input);
  }

  @Query(() => [StudentGroup])
  findAllStudentGroups() {
    return this.service.findAll();
  }

  @Query(() => StudentGroup)
  findStudentGroup(@Args("id", { type: () => Int }) id: number) {
    return this.service.findOne(id);
  }

  @Mutation(() => StudentGroup)
  updateStudentGroup(@Args("input") input: UpdateStudentGroupInput) {
    return this.service.update(input.id, input);
  }

  @Mutation(() => Boolean)
  removeStudentGroup(@Args("id", { type: () => Int }) id: number) {
    return this.service.remove(id);
  }
}
