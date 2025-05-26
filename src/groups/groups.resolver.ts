import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Group } from "./entities/group.entity";
import { GroupsService } from "./groups.service";
import { CreateGroupInput } from "./dto/create-group.dto";
import { UpdateGroupInput } from "./dto/update-group.dto";

@Resolver(() => Group)
export class GroupsResolver {
  constructor(private readonly service: GroupsService) {}

  @Mutation(() => Group)
  createGroup(@Args("input") input: CreateGroupInput) {
    return this.service.create(input);
  }

  @Query(() => [Group])
  findAllGroups() {
    return this.service.findAll();
  }

  @Query(() => Group)
  findGroup(@Args("id") id: number) {
    return this.service.findOne(id);
  }

  @Mutation(() => Group)
  updateGroup(@Args("input") input: UpdateGroupInput) {
    return this.service.update(input.id, input);
  }

  @Mutation(() => Boolean)
  removeGroup(@Args("id") id: number) {
    return this.service.remove(id);
  }
}
