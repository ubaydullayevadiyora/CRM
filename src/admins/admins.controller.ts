import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { AuthGuard } from "@nestjs/passport";
import { LoginDto } from "../auth/dto/admin-login.dto";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { AdminService } from "./admins.service";

@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post("register")
  create(@Body() dto: CreateAdminDto) {
    return this.adminService.create(dto);
  }

  @Post("login")
  login(@Body() dto: LoginDto) {
    return this.adminService.login(dto.email, dto.password);
  }

  @Get()
  @UseGuards(AuthGuard("jwt"))
  findAll() {
    return this.adminService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.adminService.findOne(id);
  }

  @Put(":id")
  update(@Param("id") id: number, @Body() dto: UpdateAdminDto) {
    return this.adminService.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.adminService.remove(id);
  }
}
