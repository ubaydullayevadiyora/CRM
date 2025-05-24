import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Teacher } from "./entities/teacher.entity"
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { UpdateTeacherDto } from "./dto/update-teacher.dto";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher) private repo: Repository<Teacher>,
    private authService: AuthService
  ) {}

  async create(dto: CreateTeacherDto) {
    const hashedPassword = await this.authService.hashPassword(dto.password);
    const teacher = this.repo.create({ ...dto, password: hashedPassword });
    return this.repo.save(teacher);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  update(id: number, dto: UpdateTeacherDto) {
    return this.repo.update(id, dto);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }

  async login(email: string, password: string) {
    const teacher = await this.repo.findOne({ where: { email } });
    if (!teacher) throw new UnauthorizedException("User not found");

    const isMatch = await this.authService.comparePassword(
      password,
      teacher.password
    );
    if (!isMatch) throw new UnauthorizedException("Invalid password");

    return this.authService.generateToken({
      sub: teacher.id,
      email: teacher.email,
      role: teacher.role,
    });
  }
}
