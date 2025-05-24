import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { TeacherService } from "./teacher.service";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { UpdateTeacherDto } from "./dto/update-teacher.dto";
import { AuthGuard } from "@nestjs/passport";
import { LoginDto } from "../auth/dto/admin-login.dto";

@Controller("teachers")
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post("register")
  create(@Body() dto: CreateTeacherDto) {
    return this.teacherService.create(dto);
  }

  @Post("login")
  login(@Body() dto: LoginDto) {
    return this.teacherService.login(dto.email, dto.password);
  }

  @Get()
  @UseGuards(AuthGuard("jwt"))
  findAll() {
    return this.teacherService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.teacherService.findOne(id);
  }

  @Put(":id")
  update(@Param("id") id: number, @Body() dto: UpdateTeacherDto) {
    return this.teacherService.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.teacherService.remove(id);
  }
}
