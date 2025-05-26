import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Attendance } from "./entities/attendance.entity";
import { CreateAttendanceInput } from "./dto/create-attendance.dto";
import { UpdateAttendanceInput } from "./dto/update-attendance.dto";

@Injectable()
export class AttendancesService {
  constructor(
    @InjectRepository(Attendance)
    private repo: Repository<Attendance>
  ) {}

  create(input: CreateAttendanceInput): Promise<Attendance> {
    return this.repo.save({
      ...input,
      student: { id: input.studentId },
      schedule: { id: input.scheduleId },
    });
  }

  findAll(): Promise<Attendance[]> {
    return this.repo.find({ relations: ["student", "schedule"] });
  }

  async findOne(id: number): Promise<Attendance> {
    const item = await this.repo.findOne({
      where: { id },
      relations: ["student", "schedule"],
    });
    if (!item)
      throw new NotFoundException(`Attendance with id ${id} not found`);
    return item;
  }

  async update(id: number, input: UpdateAttendanceInput): Promise<Attendance> {
    await this.repo.update(id, {
      ...input,
      student: { id: input.studentId },
      schedule: { id: input.scheduleId },
    });
    return this.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.repo.delete(id);
    if (result.affected === 0)
      throw new NotFoundException(`Attendance with id ${id} not found`);
    return true;
  }
}
