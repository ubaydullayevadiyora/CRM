import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Student } from "./entities/student.entity";
import { CreateStudentInput } from "./dto/create-student.input";
import { UpdateStudentInput } from "./dto/update-student.input";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @Inject(forwardRef(() => AuthService)) private authService: AuthService
  ) {}

  create(createStudentDto: CreateStudentInput): Promise<Student> {
    const student = this.studentRepository.create(createStudentDto);
    return this.studentRepository.save(student);
  }

  findAll(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  async findOne(id: number): Promise<Student | null> {
    return this.studentRepository.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<Student | null> {
    return this.studentRepository.findOneBy({ email });
  }

  async update(
    id: number,
    updateStudentDto: UpdateStudentInput
  ): Promise<Student | null> {
    await this.studentRepository.update(id, updateStudentDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.studentRepository.delete(id);
  }
}
