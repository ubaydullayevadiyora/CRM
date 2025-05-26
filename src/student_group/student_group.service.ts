import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { StudentGroup } from "./entities/student_group.entity";
import { CreateStudentGroupInput } from "./dto/create-student_group.dto";
import { UpdateStudentGroupInput } from "./dto/update-student_group.dto";

@Injectable()
export class StudentGroupsService {
  constructor(
    @InjectRepository(StudentGroup)
    private repo: Repository<StudentGroup>
  ) {}

  create(input: CreateStudentGroupInput): Promise<StudentGroup> {
    return this.repo.save({
      student: { id: input.studentId },
      group: { id: input.groupId },
    });
  }

  findAll(): Promise<StudentGroup[]> {
    return this.repo.find({ relations: ["student", "group"] });
  }

  async findOne(id: number): Promise<StudentGroup> {
    const item = await this.repo.findOne({
      where: { id },
      relations: ["student", "group"],
    });
    if (!item)
      throw new NotFoundException(`StudentGroup with id ${id} not found`);
    return item;
  }

  async update(
    id: number,
    input: UpdateStudentGroupInput
  ): Promise<StudentGroup> {
    await this.repo.update(id, {
      student: { id: input.studentId },
      group: { id: input.groupId },
    });
    return this.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.repo.delete(id);
    if (result.affected === 0)
      throw new NotFoundException(`StudentGroup with id ${id} not found`);
    return true;
  }
}
