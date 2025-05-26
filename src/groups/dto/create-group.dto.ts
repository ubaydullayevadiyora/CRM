// src/groups/dto/create-group.input.ts
import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CreateGroupInput {
  @Field()
  name: string;

  @Field()
  courseId: number;

  @Field({ nullable: true })
  start_date?: string;

  @Field({ nullable: true })
  end_date?: string;

  @Field()
  status: string;
}
