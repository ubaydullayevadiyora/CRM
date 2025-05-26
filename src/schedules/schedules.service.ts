import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Schedule } from "./entities/schedule.entity";
import { CreateScheduleInput } from "./dto/create-schedule.dto";
import { UpdateScheduleInput } from "./dto/update-schedule.dto";

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(Schedule)
    private repo: Repository<Schedule>
  ) {}

  create(input: CreateScheduleInput): Promise<Schedule> {
    return this.repo.save({
      ...input,
      group: { id: input.groupId },
      teacher: { id: input.teacherId },
      course: { id: input.courseId },
    });
  }

  findAll(): Promise<Schedule[]> {
    return this.repo.find({ relations: ["group", "teacher", "course"] });
  }

  async findOne(id: number): Promise<Schedule> {
    const item = await this.repo.findOne({
      where: { id },
      relations: ["group", "teacher", "course"],
    });
    if (!item) throw new NotFoundException(`Schedule with id ${id} not found`);
    return item;
  }

  async update(id: number, input: UpdateScheduleInput): Promise<Schedule> {
    await this.repo.update(id, {
      ...input,
      group: { id: input.groupId },
      teacher: { id: input.teacherId },
      course: { id: input.courseId },
    });
    return this.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.repo.delete(id);
    if (result.affected === 0)
      throw new NotFoundException(`Schedule with id ${id} not found`);
    return true;
  }
}
