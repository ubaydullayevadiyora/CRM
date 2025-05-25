import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Student } from "./entities/student.entity";
import { StudentsService } from "./students.service";
import { AuthService } from "../auth/auth.service";
import { CreateStudentInput } from "./dto/create-student.input";

@Resolver(() => Student)
export class StudentResolver {
  constructor(
    private readonly studentService: StudentsService,
    private readonly authService: AuthService
  ) {}

  @Mutation(() => Student)
  async register(@Args("data") data: CreateStudentInput) {
    return this.studentService.create(data);
  }

  @Mutation(() => String)
  async login(
    @Args("email") email: string,
    @Args("password") password: string
  ): Promise<string> {
    const student = await this.authService.validateStudent(email, password);
    const token = await this.authService.loginStudent(email, password);
    return token.access_token;
  }

  @Query(() => [Student])
  findAll() {
    return this.studentService.findAll();
  }
}
