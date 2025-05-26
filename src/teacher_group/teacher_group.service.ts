// src/teacher-groups/teacher-groups.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TeacherGroup } from "./entities/teacher_group.entity";
import { CreateTeacherGroupInput } from "./dto/create-teacher_group.dto";
import { UpdateTeacherGroupInput } from "./dto/update-teacher_group.dto";

@Injectable()
export class TeacherGroupsService {
  constructor(
    @InjectRepository(TeacherGroup)
    private repo: Repository<TeacherGroup>
  ) {}

  create(input: CreateTeacherGroupInput): Promise<TeacherGroup> {
    return this.repo.save({
      teacher: { id: input.teacherId },
      group: { id: input.groupId },
    });
  }

  findAll(): Promise<TeacherGroup[]> {
    return this.repo.find({ relations: ["teacher", "group"] });
  }

  async findOne(id: number): Promise<TeacherGroup> {
    const item = await this.repo.findOne({
      where: { id },
      relations: ["teacher", "group"],
    });
    if (!item)
      throw new NotFoundException(`TeacherGroup with id ${id} not found`);
    return item;
  }

  async update(
    id: number,
    input: UpdateTeacherGroupInput
  ): Promise<TeacherGroup> {
    await this.repo.update(id, {
      teacher: { id: input.teacherId },
      group: { id: input.groupId },
    });
    return this.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.repo.delete(id);
    if (result.affected === 0)
      throw new NotFoundException(`TeacherGroup with id ${id} not found`);
    return true;
  }
}
