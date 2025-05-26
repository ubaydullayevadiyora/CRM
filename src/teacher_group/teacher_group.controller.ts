import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TeacherGroupsService } from './teacher_group.service';
import { CreateTeacherGroupInput } from './dto/create-teacher_group.dto';
import { UpdateTeacherGroupInput } from './dto/update-teacher_group.dto';


@Controller('teacher-group')
export class TeacherGroupController {
  constructor(private readonly teacherGroupService: TeacherGroupsService) {}

  @Post()
  create(@Body() createTeacherGroupDto: CreateTeacherGroupInput) {
    return this.teacherGroupService.create(createTeacherGroupDto);
  }

  @Get()
  findAll() {
    return this.teacherGroupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teacherGroupService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeacherGroupDto: UpdateTeacherGroupInput) {
    return this.teacherGroupService.update(+id, updateTeacherGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teacherGroupService.remove(+id);
  }
}
