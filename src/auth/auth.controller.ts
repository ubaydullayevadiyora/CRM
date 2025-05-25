import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/admin-login.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("admin/login")
  async adminLogin(@Body() dto: LoginDto) {
    return this.authService.loginAdmin(dto.email, dto.password);
  }

  @Post("teacher/login")
  async teacherLogin(@Body() dto: LoginDto) {
    return this.authService.loginTeacher(dto.email, dto.password);
  }

  @Post("student/login")
  async studentLogin(@Body() dto: LoginDto) {
    return this.authService.loginStudent(dto.email, dto.password);
  }
}
