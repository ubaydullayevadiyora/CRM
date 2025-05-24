import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { Teacher } from "../teacher/entities/teacher.entity";
import { Admin } from "../admins/model/admin.model";
import { Repository } from "typeorm";


@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,

    @InjectRepository(Admin)
    private readonly adminRepo: Repository<Admin>,

    @InjectRepository(Teacher)
    private readonly teacherRepo: Repository<Teacher>
  ) {}

  // ✅ Hash parol
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  // ✅ Parolni tekshirish
  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  // ✅ JWT token generatsiyasi
  async generateToken(payload: any) {
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // ✅ Login funksiyasi (admin yoki teacher uchun)
  async login(email: string, password: string, role: "admin" | "teacher") {
    let user;

    if (role === "admin") {
      user = await this.adminRepo.findOneBy({ email }); 
    } else if (role === "teacher") {
      user = await this.teacherRepo.findOneBy({ email }); 
    }
    

    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    const isMatch = await this.comparePassword(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException("Invalid credentials");
    }

    return this.generateToken({
      sub: user.id,
      email: user.email,
      role,
    });
  }
}
