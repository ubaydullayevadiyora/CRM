import { Controller, Post, Body, BadRequestException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/admin-login.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  async login(@Body() loginDto: LoginDto) {
    const { email, password, role } = loginDto;

    if (!role || (role !== "admin" && role !== "teacher")) {
      throw new BadRequestException("Role must be either admin or teacher");
    }

    return this.authService.login(email, password, role);
  }
}
