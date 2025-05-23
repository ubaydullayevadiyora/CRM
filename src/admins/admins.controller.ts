import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { AdminService } from "./admins.service";

@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  create(@Body() dto: CreateAdminDto) {
    return this.adminService.create(dto);
  }

  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.adminService.findOne(+id);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() dto: UpdateAdminDto) {
    return this.adminService.update(+id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.adminService.remove(+id);
  }
}
