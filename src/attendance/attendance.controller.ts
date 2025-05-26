import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AttendancesService } from './attendance.service';
import { CreateAttendanceInput } from './dto/create-attendance.dto';
import { UpdateAttendanceInput } from './dto/update-attendance.dto';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendancesService) {}

  @Post()
  create(@Body() createAttendanceDto: CreateAttendanceInput) {
    return this.attendanceService.create(createAttendanceDto);
  }

  @Get()
  findAll() {
    return this.attendanceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attendanceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAttendanceDto: UpdateAttendanceInput) {
    return this.attendanceService.update(+id, updateAttendanceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attendanceService.remove(+id);
  }
}
