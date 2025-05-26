// src/groups/dto/update-group.input.ts
import { InputType, Field, PartialType } from "@nestjs/graphql";
import { CreateGroupInput } from "./create-group.dto";

@InputType()
export class UpdateGroupInput extends PartialType(CreateGroupInput) {
  @Field()
  id: number;
}
