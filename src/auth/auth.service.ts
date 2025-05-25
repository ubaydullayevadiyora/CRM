import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Admin } from "../admins/model/admin.model";
import { Teacher } from "../teacher/entities/teacher.entity";
import { Student } from "../students/entities/student.entity";
import * as bcrypt from "bcrypt";
import { StudentsService } from "../students/students.service";
import { TeacherService } from "../teacher/teacher.service";
import { AdminService } from "../admins/admins.service";

// auth.service.ts
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,

    @InjectRepository(Admin)
    private readonly adminRepo: Repository<Admin>,

    @InjectRepository(Teacher)
    private readonly teacherRepo: Repository<Teacher>,

    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,

    private readonly studentsService: StudentsService,
    private readonly teachersService: TeacherService,
    private readonly adminsService: AdminService
  ) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  async generateToken(payload: any) {
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // 🧑‍💼 Admin login
  async loginAdmin(email: string, password: string) {
    const admin = await this.adminRepo.findOneBy({ email });
    if (!admin || !(await this.comparePassword(password, admin.password))) {
      throw new UnauthorizedException("Invalid credentials for admin");
    }
    return this.generateToken({
      sub: admin.id,
      email: admin.email,
      role: "admin",
    });
  }

  // 👨‍🏫 Teacher login
  async loginTeacher(email: string, password: string) {
    const teacher = await this.teacherRepo.findOneBy({ email });
    if (!teacher || !(await this.comparePassword(password, teacher.password))) {
      throw new UnauthorizedException("Invalid credentials for teacher");
    }
    return this.generateToken({
      sub: teacher.id,
      email: teacher.email,
      role: "teacher",
    });
  }

  // 👨‍🎓 Student login
  async loginStudent(email: string, password: string) {
    const student = await this.studentRepo.findOneBy({ email });
    if (!student || !(await this.comparePassword(password, student.password))) {
      throw new UnauthorizedException("Invalid credentials for student");
    }
    return this.generateToken({
      sub: student.id,
      email: student.email,
      role: "student",
    });
  }

  async validateStudent(email: string, password: string) {
    const student = await this.studentsService.findByEmail(email);
    if (!student) {
      throw new UnauthorizedException("Student not found");
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      throw new UnauthorizedException("Invalid password");
    }

    return student;
  }

  async validateTeacher(email: string, password: string) {
    const teacher = await this.teachersService.findByEmail(email);
    if (!teacher) {
      throw new UnauthorizedException("Teacher not found");
    }

    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) {
      throw new UnauthorizedException("Invalid password");
    }

    return teacher;
  }

  async validateAdmin(email: string, password: string) {
    const admin = await this.adminsService.findByEmail(email);
    if (!admin) {
      throw new UnauthorizedException("Admin not found");
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      throw new UnauthorizedException("Invalid password");
    }

    return admin;
  }
}
